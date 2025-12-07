import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SETTINGS } from '@scripts/settings';
import { CaseFile } from '@models/index';

@Injectable({ providedIn: 'root' })
export class CaseFileAPI {
  private readonly baseUrl = SETTINGS.API_BASE_URL + '/api/v0.1/case-files';
  constructor(private http: HttpClient) {}

  getCaseFileById(id: number): Observable<CaseFile> {
    return this.http.get<CaseFile>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  getCaseFilesByComplaint(complaintId: number): Observable<CaseFile[]> {
    return this.http.get<CaseFile[]>(`${this.baseUrl}/complaint/${complaintId}`, { withCredentials: true });
  }

  createCaseFile(caseFile: CaseFile): Observable<any> {
    return this.http.post(`${this.baseUrl}`, caseFile, { withCredentials: true });
  }

  updateCaseFile(caseFile: CaseFile): Observable<any> {
    return this.http.put(`${this.baseUrl}`, caseFile, { withCredentials: true });
  }
}

