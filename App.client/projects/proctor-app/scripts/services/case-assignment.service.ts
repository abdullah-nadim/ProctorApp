import { Injectable } from '@angular/core';
import { CaseAssignmentAPI } from '@scripts/api/case-assignment-api';
import { CaseAssignment } from '@models/index';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CaseAssignmentService {
  constructor(private api: CaseAssignmentAPI) {}

  getCaseAssignmentById(id: number): Observable<CaseAssignment> {
    return this.api.getCaseAssignmentById(id);
  }

  getCaseAssignmentsByAssignee(assigneeId: number): Observable<CaseAssignment[]> {
    return this.api.getCaseAssignmentsByAssignee(assigneeId);
  }

  getCaseAssignmentsByComplaint(complaintId: number): Observable<CaseAssignment[]> {
    return this.api.getCaseAssignmentsByComplaint(complaintId);
  }

  createCaseAssignment(assignment: CaseAssignment): Observable<any> {
    return this.api.createCaseAssignment(assignment);
  }

  updateCaseAssignment(assignment: CaseAssignment): Observable<any> {
    return this.api.updateCaseAssignment(assignment);
  }
}

