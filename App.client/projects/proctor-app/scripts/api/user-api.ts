import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SETTINGS } from '@scripts/settings';
import { User } from '@models/index';

@Injectable({ providedIn: 'root' })
export class UserAPI {
  private readonly baseUrl = SETTINGS.API_BASE_URL + '/api/v0.1/users';
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`, { withCredentials: true });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user, { withCredentials: true });
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}`, user, { withCredentials: true });
  }
}

