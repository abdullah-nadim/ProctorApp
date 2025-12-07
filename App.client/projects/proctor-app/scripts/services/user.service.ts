import { Injectable } from '@angular/core';
import { UserAPI } from '@scripts/api/user-api';
import { User, UserTypes } from '@models/index';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private static currentUser: User | null = null;

  constructor(private api: UserAPI) {
    // Load user from localStorage on initialization
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        UserService.currentUser = JSON.parse(storedUser);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('currentUser');
      }
    }
  }

  // Static methods for managing current user
  static getCurrentUser(): User | null {
    return UserService.currentUser;
  }

  static setCurrentUser(user: User | null): void {
    UserService.currentUser = user;
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  static getUserType(): UserTypes | null {
    if (!UserService.currentUser) return null;
    return UserService.currentUser.userType as UserTypes;
  }

  static clearCurrentUser(): void {
    UserService.setCurrentUser(null);
  }

  // Instance methods for API calls
  getAllUsers(): Observable<User[]> {
    return this.api.getAllUsers();
  }

  getUserById(id: number): Observable<User> {
    return this.api.getUserById(id);
  }

  createUser(user: User): Observable<any> {
    return this.api.createUser(user);
  }

  updateUser(user: User): Observable<any> {
    return this.api.updateUser(user);
  }
}

