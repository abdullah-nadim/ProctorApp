import { User, CaseFileStatus } from './user';
import { Complaint } from './complaint';
import { CaseFileDocument } from './case-file-document';

export class CaseFile {
  id: number;
  complaintId: number;
  preparedBy: number;
  preparedAt: string;
  summary: string;
  recommendations?: string | null;
  status: string;
  createdOn: string;
  modifiedOn: string;
  complaint?: Complaint | null;
  preparer?: User | null;
  documents: CaseFileDocument[];

  constructor() {
    this.id = 0;
    this.complaintId = this.preparedBy = 0;
    this.preparedAt = new Date().toISOString();
    this.summary = '';
    this.recommendations = null;
    this.status = CaseFileStatus.Draft;
    this.createdOn = this.modifiedOn = '';
    this.documents = [];
  }
}

