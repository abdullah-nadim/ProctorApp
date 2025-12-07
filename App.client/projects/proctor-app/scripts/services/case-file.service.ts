import { Injectable } from '@angular/core';
import { CaseFileAPI } from '@scripts/api/case-file-api';
import { CaseFile } from '@models/index';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CaseFileService {
  constructor(private api: CaseFileAPI) {}

  getCaseFileById(id: number): Observable<CaseFile> {
    return this.api.getCaseFileById(id);
  }

  getCaseFilesByComplaint(complaintId: number): Observable<CaseFile[]> {
    return this.api.getCaseFilesByComplaint(complaintId);
  }

  createCaseFile(caseFile: CaseFile): Observable<any> {
    return this.api.createCaseFile(caseFile);
  }

  updateCaseFile(caseFile: CaseFile): Observable<any> {
    return this.api.updateCaseFile(caseFile);
  }
}

