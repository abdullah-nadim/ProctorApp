import { Injectable } from '@angular/core';
import { NotificationAPI } from '@scripts/api/notification-api';
import { Notification } from '@models/index';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private api: NotificationAPI) {}

  getNotificationsByUser(userId: number): Observable<Notification[]> {
    return this.api.getNotificationsByUser(userId);
  }

  getUnreadNotificationsByUser(userId: number): Observable<Notification[]> {
    return this.api.getUnreadNotificationsByUser(userId);
  }

  markAsRead(notificationId: number): Observable<any> {
    return this.api.markAsRead(notificationId);
  }

  markAllAsRead(userId: number): Observable<any> {
    return this.api.markAllAsRead(userId);
  }
}

