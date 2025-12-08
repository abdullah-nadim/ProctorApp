import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { SETTINGS } from '@scripts/settings';
import { Notification } from '@models/index';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection: signalR.HubConnection | null = null;
  public notifications = signal<Notification[]>([]);
  public isConnected = signal(false);

  constructor() {}

  async startConnection(): Promise<void> {
    const currentUser = UserService.getCurrentUser();
    if (!currentUser) {
      console.warn('No user found, cannot start SignalR connection');
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${SETTINGS.API_BASE_URL}/notificationHub`, {
        withCredentials: true,
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling
      })
      .withAutomaticReconnect()
      .build();

    try {
      await this.hubConnection.start();
      this.isConnected.set(true);
      console.log('SignalR Connected');

      // Join user group
      await this.hubConnection.invoke('JoinUserGroup', currentUser.id);

      // Listen for notifications
      this.hubConnection.on('ReceiveNotification', (notification: Notification) => {
        this.handleNotification(notification);
      });

      // Handle reconnection
      this.hubConnection.onreconnecting(() => {
        this.isConnected.set(false);
        console.log('SignalR Reconnecting...');
      });

      this.hubConnection.onreconnected(() => {
        this.isConnected.set(true);
        console.log('SignalR Reconnected');
        if (currentUser) {
          this.hubConnection?.invoke('JoinUserGroup', currentUser.id);
        }
      });

      this.hubConnection.onclose(() => {
        this.isConnected.set(false);
        console.log('SignalR Disconnected');
      });
    } catch (error) {
      console.error('Error starting SignalR connection:', error);
      this.isConnected.set(false);
    }
  }

  async stopConnection(): Promise<void> {
    if (this.hubConnection) {
      const currentUser = UserService.getCurrentUser();
      if (currentUser) {
        await this.hubConnection.invoke('LeaveUserGroup', currentUser.id);
      }
      await this.hubConnection.stop();
      this.hubConnection = null;
      this.isConnected.set(false);
      console.log('SignalR Disconnected');
    }
  }

  private handleNotification(notification: Notification): void {
    // Add notification to the list (avoid duplicates)
    this.notifications.update(notifications => {
      const exists = notifications.some(n => n.id === notification.id);
      if (exists) return notifications;
      return [notification, ...notifications];
    });
    
    // Show browser notification if permission granted
    if ('Notification' in window && (window as any).Notification.permission === 'granted') {
      new (window as any).Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
  }

  async requestNotificationPermission(): Promise<void> {
    if ('Notification' in window && (window as any).Notification.permission === 'default') {
      await (window as any).Notification.requestPermission();
    }
  }
}

