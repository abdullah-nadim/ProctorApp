import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SETTINGS } from '@scripts/settings';
import { CaseAssignment } from '@models/index';

@Injectable({ providedIn: 'root' })
export class CaseAssignmentAPI {
  private readonly baseUrl = SETTINGS.API_BASE_URL + '/api/v0.1/case-assignments';
  constructor(private http: HttpClient) {}

  getCaseAssignmentById(id: number): Observable<CaseAssignment> {
    return this.http.get<CaseAssignment>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  getCaseAssignmentsByAssignee(assigneeId: number): Observable<CaseAssignment[]> {
    return this.http.get<CaseAssignment[]>(`${this.baseUrl}/assignee/${assigneeId}`, { withCredentials: true });
  }

  getCaseAssignmentsByComplaint(complaintId: number): Observable<CaseAssignment[]> {
    return this.http.get<CaseAssignment[]>(`${this.baseUrl}/complaint/${complaintId}`, { withCredentials: true });
  }

  createCaseAssignment(assignment: CaseAssignment): Observable<any> {
    return this.http.post(`${this.baseUrl}`, assignment, { withCredentials: true });
  }

  updateCaseAssignment(assignment: CaseAssignment): Observable<any> {
    return this.http.put(`${this.baseUrl}`, assignment, { withCredentials: true });
  }
}

