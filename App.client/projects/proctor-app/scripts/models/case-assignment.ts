import { User, CaseAssignmentStatus } from './user';
import { Complaint } from './complaint';

export class CaseAssignment {
  id: number;
  complaintId: number;
  assignedTo: number;
  assignedBy: number;
  assignedAt: string;
  deadline?: string | null;
  status: string;
  notes?: string | null;
  createdOn: string;
  modifiedOn: string;
  complaint?: Complaint | null;
  assignee?: User | null;
  assigner?: User | null;

  constructor() {
    this.id = 0;
    this.complaintId = this.assignedTo = this.assignedBy = 0;
    this.assignedAt = new Date().toISOString();
    this.deadline = null;
    this.status = CaseAssignmentStatus.Pending;
    this.notes = null;
    this.createdOn = this.modifiedOn = '';
  }
}

