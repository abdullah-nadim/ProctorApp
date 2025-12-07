import { Injectable } from '@angular/core';
import { ComplaintAPI } from '@scripts/api/complaint-api';
import { Complaint } from '@models/index';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComplaintService {
  constructor(private api: ComplaintAPI) {}

  getAllComplaints(): Observable<Complaint[]> {
    return this.api.getAllComplaints();
  }

  getComplaintById(id: number): Observable<Complaint> {
    return this.api.getComplaintById(id);
  }

  getComplaintsByComplainant(complainantId: number): Observable<Complaint[]> {
    return this.api.getComplaintsByComplainant(complainantId);
  }

  createComplaint(complaint: Complaint): Observable<any> {
    return this.api.createComplaint(complaint);
  }

  updateComplaint(complaint: Complaint): Observable<any> {
    return this.api.updateComplaint(complaint);
  }

  getUnassignedComplaints(): Observable<Complaint[]> {
    return this.api.getUnassignedComplaints();
  }
}

