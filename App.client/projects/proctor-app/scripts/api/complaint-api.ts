import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SETTINGS } from '@scripts/settings';
import { Complaint } from '@models/index';

@Injectable({ providedIn: 'root' })
export class ComplaintAPI {
  private readonly baseUrl = SETTINGS.API_BASE_URL + '/api/v0.1/complaints';
  constructor(private http: HttpClient) {}

  getAllComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}`, { withCredentials: true });
  }

  getComplaintById(id: number): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  getComplaintsByComplainant(complainantId: number): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/complainant/${complainantId}`, { withCredentials: true });
  }

  createComplaint(complaint: Complaint): Observable<any> {
    return this.http.post(`${this.baseUrl}`, complaint, { withCredentials: true });
  }

  updateComplaint(complaint: Complaint): Observable<any> {
    return this.http.put(`${this.baseUrl}`, complaint, { withCredentials: true });
  }

  getUnassignedComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/unassigned`, { withCredentials: true });
  }
}

