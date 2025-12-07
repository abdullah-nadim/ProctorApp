import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SETTINGS } from '@scripts/settings';
import { ComplaintCategory } from '@models/index';

@Injectable({ providedIn: 'root' })
export class ComplaintCategoryAPI {
  private readonly baseUrl = SETTINGS.API_BASE_URL + '/api/v0.1/complaint-categories';
  constructor(private http: HttpClient) {}

  getAllComplaintCategories(): Observable<ComplaintCategory[]> {
    return this.http.get<ComplaintCategory[]>(`${this.baseUrl}`, { withCredentials: true });
  }

  getComplaintCategoryById(id: number): Observable<ComplaintCategory> {
    return this.http.get<ComplaintCategory>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  createComplaintCategory(category: ComplaintCategory): Observable<any> {
    return this.http.post(`${this.baseUrl}`, category, { withCredentials: true });
  }

  updateComplaintCategory(category: ComplaintCategory): Observable<any> {
    return this.http.put(`${this.baseUrl}`, category, { withCredentials: true });
  }
}

