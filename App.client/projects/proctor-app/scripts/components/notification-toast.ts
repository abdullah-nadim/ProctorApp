import { Component, OnInit, OnDestroy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignalRService } from '../services/signalr.service';
import { Notification } from '../models/notification';

interface ToastNotification extends Notification {
  show: boolean;
}

@Component({
  selector: 'notification-toast',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="notification-toast-container">
      <div 
        *ngFor="let notification of visibleNotifications()" 
        class="notification-toast"
        [class]="getNotificationClass(notification)"
        (click)="onNotificationClick(notification)">
        <div class="toast-icon">
          <i [class]="getNotificationIcon(notification)"></i>
        </div>
        <div class="toast-content">
          <div class="toast-title">{{ notification.title }}</div>
          <div class="toast-message">{{ notification.message }}</div>
        </div>
        <button class="toast-close" (click)="dismissNotification(notification); $event.stopPropagation()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .notification-toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    }

    .notification-toast {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 15px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      border-left: 4px solid #0b509e;
      animation: slideIn 0.3s ease-out;

      &:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        transform: translateX(-5px);
      }

      &.info {
        border-left-color: #0b509e;
      }

      &.success {
        border-left-color: #28a745;
      }

      &.warning {
        border-left-color: #ffc107;
      }

      &.error {
        border-left-color: #dc3545;
      }
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast-icon {
      font-size: 20px;
      color: #0b509e;
      flex-shrink: 0;
    }

    .toast-content {
      flex: 1;
      min-width: 0;
    }

    .toast-title {
      font-weight: 600;
      font-size: 14px;
      color: #333;
      margin-bottom: 4px;
    }

    .toast-message {
      font-size: 13px;
      color: #666;
      line-height: 1.4;
    }

    .toast-close {
      background: none;
      border: none;
      color: #999;
      cursor: pointer;
      padding: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border-radius: 50%;
      transition: all 0.2s;

      &:hover {
        background: #f0f0f0;
        color: #333;
      }
    }
  `]
})
export class NotificationToastComponent implements OnInit, OnDestroy {
  visibleNotifications = signal<ToastNotification[]>([]);
  private notificationTimeouts = new Map<number, any>();

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    // Watch for new notifications from SignalR
    effect(() => {
      const notifications = this.signalRService.notifications();
      if (notifications && notifications.length > 0) {
        const latest = notifications[0]; // Get the latest notification
        // Check if we already showed this notification
        const alreadyShown = this.visibleNotifications().some(n => 
          n.id === latest.id || 
          (n.userId === latest.userId && 
           n.title === latest.title && 
           n.message === latest.message &&
           Math.abs(new Date(n.createdAt).getTime() - new Date(latest.createdAt).getTime()) < 2000)
        );
        if (!alreadyShown && latest.id) {
          console.log('Showing notification toast:', latest);
          this.showNotification(latest);
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Clear all timeouts
    this.notificationTimeouts.forEach(timeout => clearTimeout(timeout));
    this.notificationTimeouts.clear();
  }

  showNotification(notification: Notification): void {
    // Generate a temporary ID if notification doesn't have one
    const notificationId = notification.id || Date.now();
    
    const toastNotification: ToastNotification = {
      ...notification,
      id: notificationId,
      show: true
    };

    this.visibleNotifications.update(notifications => [toastNotification, ...notifications]);

    // Auto-dismiss after 5 seconds
    const timeout = setTimeout(() => {
      this.dismissNotification(toastNotification);
    }, 5000);

    this.notificationTimeouts.set(notificationId, timeout);
  }

  dismissNotification(notification: ToastNotification): void {
    // Clear timeout if exists
    const timeout = this.notificationTimeouts.get(notification.id);
    if (timeout) {
      clearTimeout(timeout);
      this.notificationTimeouts.delete(notification.id);
    }

    // Remove from visible notifications
    this.visibleNotifications.update(notifications =>
      notifications.filter(n => n.id !== notification.id)
    );
  }

  onNotificationClick(notification: ToastNotification): void {
    this.dismissNotification(notification);
    // Navigation will be handled by router if actionUrl is set
  }

  getNotificationClass(notification: Notification): string {
    // Determine class based on notification type
    if (notification.title.toLowerCase().includes('assigned')) return 'info';
    if (notification.title.toLowerCase().includes('completed') || notification.title.toLowerCase().includes('resolved')) return 'success';
    if (notification.title.toLowerCase().includes('dismissed')) return 'warning';
    return 'info';
  }

  getNotificationIcon(notification: Notification): string {
    if (notification.title.toLowerCase().includes('assigned')) return 'fas fa-user-check';
    if (notification.title.toLowerCase().includes('completed') || notification.title.toLowerCase().includes('resolved')) return 'fas fa-check-circle';
    if (notification.title.toLowerCase().includes('dismissed')) return 'fas fa-times-circle';
    if (notification.title.toLowerCase().includes('meeting')) return 'fas fa-calendar';
    return 'fas fa-bell';
  }
}

