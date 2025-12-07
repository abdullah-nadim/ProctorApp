import { User, MeetingStatus } from './user';
import { Complaint } from './complaint';
import { MeetingParticipant } from './meeting-participant';

export class Meeting {
  id: number;
  complaintId: number;
  scheduledBy: number;
  scheduledAt: string;
  durationMinutes: number;
  location: string;
  agenda?: string | null;
  status: string;
  outcome?: string | null;
  createdOn: string;
  modifiedOn: string;
  complaint?: Complaint | null;
  scheduler?: User | null;
  participants: MeetingParticipant[];

  constructor() {
    this.id = 0;
    this.complaintId = this.scheduledBy = 0;
    this.scheduledAt = new Date().toISOString();
    this.durationMinutes = 30;
    this.location = '';
    this.agenda = this.outcome = null;
    this.status = MeetingStatus.Scheduled;
    this.createdOn = this.modifiedOn = '';
    this.participants = [];
  }
}

