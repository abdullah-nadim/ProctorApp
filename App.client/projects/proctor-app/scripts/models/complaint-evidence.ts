import { User } from './user';

export class ComplaintEvidence {
  id: number;
  complaintId: number;
  filePath: string;
  uploadedBy: number;
  uploadedAt: string;
  description?: string | null;
  createdOn: string;
  modifiedOn: string;
  uploader?: User | null;

  constructor() {
    this.id = 0;
    this.complaintId = 0;
    this.filePath = '';
    this.uploadedBy = 0;
    this.uploadedAt = new Date().toISOString();
    this.description = null;
    this.createdOn = this.modifiedOn = '';
    this.uploader = null;
  }
}

