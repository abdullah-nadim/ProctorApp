import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SETTINGS } from '@scripts/settings';
import { Meeting } from '@models/index';

@Injectable({ providedIn: 'root' })
export class MeetingAPI {
  private readonly baseUrl = SETTINGS.API_BASE_URL + '/api/v0.1/meetings';
  constructor(private http: HttpClient) {}

  getMeetingById(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  getMeetingsByComplaint(complaintId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.baseUrl}/complaint/${complaintId}`, { withCredentials: true });
  }

  getMeetingsByScheduledBy(scheduledBy: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.baseUrl}/scheduled-by/${scheduledBy}`, { withCredentials: true });
  }

  getMeetingsForUser(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.baseUrl}/for-user/${userId}`, { withCredentials: true });
  }

  createMeeting(meeting: Meeting): Observable<any> {
    return this.http.post(`${this.baseUrl}`, meeting, { withCredentials: true });
  }

  updateMeeting(meeting: Meeting): Observable<any> {
    return this.http.put(`${this.baseUrl}`, meeting, { withCredentials: true });
  }

  getAllMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.baseUrl}`, { withCredentials: true });
  }

  closeMeeting(id: number, outcome: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/close`, { outcome }, { withCredentials: true });
  }
}

