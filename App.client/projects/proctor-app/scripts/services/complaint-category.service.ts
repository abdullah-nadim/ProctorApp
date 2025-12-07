import { Injectable } from '@angular/core';
import { ComplaintCategoryAPI } from '@scripts/api/complaint-category-api';
import { ComplaintCategory } from '@models/index';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComplaintCategoryService {
  constructor(private api: ComplaintCategoryAPI) {}

  getAllComplaintCategories(): Observable<ComplaintCategory[]> {
    return this.api.getAllComplaintCategories();
  }

  getComplaintCategoryById(id: number): Observable<ComplaintCategory> {
    return this.api.getComplaintCategoryById(id);
  }

  createComplaintCategory(category: ComplaintCategory): Observable<any> {
    return this.api.createComplaintCategory(category);
  }

  updateComplaintCategory(category: ComplaintCategory): Observable<any> {
    return this.api.updateComplaintCategory(category);
  }
}

