import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SETTINGS } from '@scripts/settings';
import { Notification } from '@models/index';

@Injectable({ providedIn: 'root' })
export class NotificationAPI {
  private readonly baseUrl = SETTINGS.API_BASE_URL + '/api/v0.1/notifications';
  constructor(private http: HttpClient) {}

  getNotificationsByUser(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/user/${userId}`, { withCredentials: true });
  }

  getUnreadNotificationsByUser(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/user/${userId}/unread`, { withCredentials: true });
  }

  markAsRead(notificationId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${notificationId}/read`, {}, { withCredentials: true });
  }

  markAllAsRead(userId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${userId}/read-all`, {}, { withCredentials: true });
  }
}

