import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SETTINGS } from '@scripts/settings';
import { User } from '@models/index';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  userName: string;
  userType: string;
  phone?: string;
  department?: string;
  organizationId?: string;
  advisorName?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  userType?: string;
  user?: User;
  errors: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthAPI {
  private readonly baseUrl = SETTINGS.API_BASE_URL + '/api/v0.1/auth';
  
  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request, { withCredentials: true });
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, request, { withCredentials: true });
  }

  logout(): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`, { withCredentials: true });
  }

  forgotPassword(email: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/forgot-password`, { email }, { withCredentials: true });
  }

  resetPassword(email: string, token: string, newPassword: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/reset-password`, { email, token, newPassword }, { withCredentials: true });
  }
}

