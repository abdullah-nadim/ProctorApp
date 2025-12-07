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
    // Mock data - replace with actual API call
    const mockNotifications: Notification[] = [
      {
        message: 'Your complaint has been submitted.',
        time: '5 minutes ago',
        caseId: '#C0000004',
        read: false
      },
      {
        message: 'Your case status has been updated to "In Progress".',
        time: '2 hours ago',
        caseId: '#C0000003',
        read: false
      },
      {
        message: 'New evidence has been requested for your case.',
        time: '1 day ago',
        caseId: '#C0000002',
        read: false
      },
      {
        message: 'Your case has been resolved successfully.',
        time: '3 days ago',
        caseId: '#C0000001',
        read: true
      },
      {
        message: 'A meeting has been scheduled to discuss your complaint.',
        time: '1 week ago',
        caseId: '#C0000005',
        read: true
      }
    ];
    this.notifications.set(mockNotifications);
  }
}

