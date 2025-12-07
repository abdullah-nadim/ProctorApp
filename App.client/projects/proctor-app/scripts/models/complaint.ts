import { User, ComplaintStatus, Priority } from './user';
import { ComplaintCategory } from './complaint-category';
import { ComplaintEvidence } from './complaint-evidence';
import { CaseAssignment } from './case-assignment';
import { Explanation } from './explanation';
import { CaseFile } from './case-file';
import { Meeting } from './meeting';

export class Complaint {
  id: number;
  title: string;
  description: string;
  complaintDate: string;
  status: string;
  priority: string;
  complainantId: number;
  complainantName?: string | null;
  complainantDetails?: string | null;
  complainantStudentId?: string | null;
  accusedStudentId?: number | null;
  accusedName?: string | null;
  accusedDetails?: string | null;
  categoryId?: number | null;
  location: string;
  incidentDate?: string | null;
  createdOn: string;
  modifiedOn: string;
  complainant?: User | null;
  category?: ComplaintCategory | null;
  evidence: ComplaintEvidence[];
  caseAssignments: CaseAssignment[];
  explanations: Explanation[];
  caseFiles: CaseFile[];
  meetings: Meeting[];

  constructor() {
    this.id = 0;
    this.title = this.description = this.location = '';
    this.complainantId = 0;
    this.complainantName = this.complainantDetails = this.complainantStudentId = null;
    this.accusedName = this.accusedDetails = null;
    this.status = ComplaintStatus.Pending;
    this.priority = Priority.Medium;
    this.complaintDate = new Date().toISOString();
    this.evidence = [];
    this.caseAssignments = [];
    this.explanations = [];
    this.caseFiles = [];
    this.meetings = [];
    this.createdOn = this.modifiedOn = '';
  }
}

