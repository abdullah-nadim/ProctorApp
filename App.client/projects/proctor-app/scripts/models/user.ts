export enum UserTypes {
  Admin = 'Admin',
  Student = 'Student',
  Proctor = 'Proctor',
  CoordinationOfficer = 'CoordinationOfficer',
  AssistantProctor = 'AssistantProctor',
  User = 'User'
}

export enum ComplaintStatus {
  Pending = 'Pending',
  UnderInvestigation = 'UnderInvestigation',
  Resolved = 'Resolved',
  Dismissed = 'Dismissed',
  Assigned = 'Assigned'
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical'
}

export enum CaseAssignmentStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed'
}

export enum CaseFileStatus {
  Draft = 'Draft',
  Submitted = 'Submitted',
  Reviewed = 'Reviewed'
}

export enum MeetingStatus {
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Canceled = 'Canceled'
}

export enum MeetingParticipantRole {
  Complainant = 'Complainant',
  Accused = 'Accused',
  Proctor = 'Proctor',
  Witness = 'Witness',
  Other = 'Other'
}

export enum RelatedEntityType {
  Complaint = 'Complaint',
  Meeting = 'Meeting',
  CaseFile = 'CaseFile'
}

export class User {
  id: number;
  email: string;
  userName: string;
  fullName: string;
  get name(): string {
    return this.fullName;
  }
  set name(value: string) {
    this.fullName = value;
  }
  organizationId?: string | null;
  phone?: string | null;
  department?: string | null;
  advisorName?: string | null;
  roleId?: number | null;
  userType: string;
  isActive: boolean;
  createdOn: string;
  modifiedOn: string;
  role?: Role | null;

  constructor() {
    this.id = 0;
    this.email = this.userName = this.fullName = '';
    this.organizationId = this.phone = this.department = this.advisorName = null;
    this.userType = UserTypes.Student;
    this.isActive = true;
    this.createdOn = this.modifiedOn = '';
    this.role = null;
  }
}

export class UserSession {
  sessionKey: string;
  userId: number;
  isActive: boolean;
  createdOn: string;
  modifiedOn: string;

  constructor() {
    this.sessionKey = '';
    this.userId = 0;
    this.isActive = true;
    this.createdOn = this.modifiedOn = '';
  }
}

export class Role {
  id: number;
  name: string;
  createdOn: string;
  modifiedOn: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.createdOn = this.modifiedOn = '';
  }
}
