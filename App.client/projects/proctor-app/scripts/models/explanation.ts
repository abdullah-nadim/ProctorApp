import { User } from './user';
import { Complaint } from './complaint';

export class Explanation {
  id: number;
  complaintId: number;
  submittedBy: number;
  explanationText: string;
  submittedAt: string;
  isComplainant: boolean;
  createdOn: string;
  modifiedOn: string;
  complaint?: Complaint | null;
  submitter?: User | null;

  constructor() {
    this.id = 0;
    this.complaintId = this.submittedBy = 0;
    this.explanationText = '';
    this.submittedAt = new Date().toISOString();
    this.isComplainant = false;
    this.createdOn = this.modifiedOn = '';
  }
}

