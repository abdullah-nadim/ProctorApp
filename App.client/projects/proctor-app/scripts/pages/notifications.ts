import { Component, OnInit, OnDestroy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { SignalRService } from '../services/signalr.service';
import { Notification } from '../models/notification';
import { UserService } from '../services/user.service';

@Component({
  selector: 'notifications-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Notifications Section -->
    <div class="notifications-section">
      <div class="notifications-container">
        <h1 class="notifications-title">Notifications</h1>
        
        <div class="notifications-actions" *ngIf="notifications().length > 0">
          <button class="btn btn-secondary" (click)="markAllAsRead()" *ngIf="hasUnreadNotifications()">
            Mark All as Read
          </button>
        </div>
        
        <div class="loading-indicator" *ngIf="isLoading()">
          <p>Loading notifications...</p>
        </div>
        
        <div class="notifications-list" *ngIf="!isLoading()">
          <div 
            class="notification-card" 
            *ngFor="let notification of notifications()" 
            [class.read]="notification.isRead"
            [class.unread]="!notification.isRead"
            (click)="onNotificationClick(notification)">
            <div class="notification-dot" *ngIf="!notification.isRead"></div>
            <div class="notification-content">
              <div class="notification-header">
                <h3 class="notification-title">{{ notification.title }}</h3>
                <span class="notification-time">{{ formatTime(notification.createdAt) }}</span>
              </div>
              <p class="notification-message">{{ notification.message }}</p>
              <div class="notification-footer" *ngIf="notification.actionUrl">
                <a [routerLink]="notification.actionUrl" class="notification-link">View Details</a>
              </div>
            </div>
          </div>
          <div class="no-notifications" *ngIf="notifications().length === 0 && !isLoading()">
            <p>No notifications yet</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/notifications.scss']
})
export class NotificationsPage implements OnInit, OnDestroy {
  notifications = signal<Notification[]>([]);
  isLoading = signal(false);

  constructor(
    private notificationService: NotificationService,
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
    
    // Watch for new notifications from SignalR
    effect(() => {
      const signalRNotifications = this.signalRService.notifications();
      if (signalRNotifications && signalRNotifications.length > 0) {
        // Get the latest notification (first in array)
        const latest = signalRNotifications[0];
        // Merge with existing notifications, avoiding duplicates
        this.notifications.update(current => {
          const exists = current.some(n => 
            n.id === latest.id || 
            (n.id && latest.id && n.id === latest.id) ||
            (n.userId === latest.userId && 
             n.title === latest.title && 
             n.message === latest.message &&
             Math.abs(new Date(n.createdAt).getTime() - new Date(latest.createdAt).getTime()) < 5000)
          );
          if (exists) return current;
          console.log('Adding new notification to list:', latest);
          const updated = [latest, ...current];
          // Sort by created date, newest first
          updated.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          return updated;
        });
        
        // Also reload from API to ensure we have the latest state
        setTimeout(() => {
          this.loadNotifications();
        }, 1000);
      }
    });
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  loadNotifications(): void {
    this.isLoading.set(true);
    const currentUser = UserService.getCurrentUser();
    
    if (!currentUser) {
      console.warn('No current user found, cannot load notifications');
      this.isLoading.set(false);
      return;
    }

    console.log('Loading notifications for user:', currentUser.id);
    this.notificationService.getNotificationsByUser(currentUser.id).subscribe({
      next: (notifications: Notification[]) => {
        console.log('Loaded notifications from API:', notifications.length);
        // Sort by created date, newest first
        notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.notifications.set(notifications);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
        this.notifications.set([]);
        this.isLoading.set(false);
      }
    });
  }

  onNotificationClick(notification: Notification): void {
    if (!notification.isRead) {
      this.notificationService.markAsRead(notification.id).subscribe({
        next: () => {
          // Update local state
          this.notifications.update(notifications =>
            notifications.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
          );
        },
        error: (error) => {
          console.error('Error marking notification as read:', error);
        }
      });
    }
  }

  markAllAsRead(): void {
    const currentUser = UserService.getCurrentUser();
    if (!currentUser) return;

    this.notificationService.markAllAsRead(currentUser.id).subscribe({
      next: () => {
        // Update local state
        this.notifications.update(notifications =>
          notifications.map(n => ({ ...n, isRead: true }))
        );
      },
      error: (error) => {
        console.error('Error marking all notifications as read:', error);
      }
    });
  }

  hasUnreadNotifications(): boolean {
    return this.notifications().some(n => !n.isRead);
  }

  formatTime(dateString: string): string {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
}

