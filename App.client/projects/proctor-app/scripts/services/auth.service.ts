import { Injectable } from '@angular/core';
import { AuthAPI, LoginRequest, RegisterRequest, AuthResponse } from '@scripts/api/auth-api';
import { User, UserTypes } from '@models/index';
import { Observable, tap } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private api: AuthAPI,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<AuthResponse> {
    const request: LoginRequest = { email, password };
    
    return this.api.login(request).pipe(
      tap(response => {
        if (response.success && response.user && response.token) {
          // Store user in UserService
          UserService.setCurrentUser(response.user);
          // Token is stored in httpOnly cookie by backend
        }
      })
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.api.register(request).pipe(
      tap(response => {
        if (response.success && response.user) {
          // Optionally auto-login after registration
          // UserService.setCurrentUser(response.user);
        }
      })
    );
  }

  logout(): Observable<{ success: boolean; message: string }> {
    return this.api.logout().pipe(
      tap(() => {
        UserService.clearCurrentUser();
        this.router.navigate(['/login']);
      })
    );
  }

  getCurrentUser(): Observable<User> {
    return this.api.getCurrentUser().pipe(
      tap(user => {
        UserService.setCurrentUser(user);
      })
    );
  }

  isAuthenticated(): boolean {
    return UserService.getCurrentUser() !== null;
  }

  forgotPassword(email: string): Observable<{ success: boolean; message: string }> {
    return this.api.forgotPassword(email);
  }

  resetPassword(email: string, token: string, newPassword: string): Observable<{ success: boolean; message: string }> {
    return this.api.resetPassword(email, token, newPassword);
  }
}

