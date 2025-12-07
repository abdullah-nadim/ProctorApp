import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notification {
  message: string;
  time: string;
  caseId: string;
  read: boolean;
}

@Component({
  selector: 'notifications-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Notifications Section -->
    <div class="notifications-section">
      <div class="notifications-container">
        <h1 class="notifications-title">Notifications</h1>
        
        <div class="notifications-list">
          <div class="notification-card" *ngFor="let notification of notifications()" [class.read]="notification.read">
            <div class="notification-dot" *ngIf="!notification.read"></div>
            <div class="notification-content">
              <div class="notification-header">
                <p class="notification-message">{{ notification.message }}</p>
                <span class="notification-time">{{ notification.time }}</span>
              </div>
              <p class="notification-case">Case Id: {{ notification.caseId }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/notifications.scss']
})
export class NotificationsPage implements OnInit {
  notifications = signal<Notification[]>([]);

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    // TODO: Implement API call to load notifications
    // For now, set empty array
    this.notifications.set([]);
  }
}

