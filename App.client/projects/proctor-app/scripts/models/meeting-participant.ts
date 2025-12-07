import { User, MeetingParticipantRole } from './user';
import { Meeting } from './meeting';

export class MeetingParticipant {
  meetingId: number;
  userId: number;
  role: string;
  attended: boolean;
  createdOn: string;
  modifiedOn: string;
  meeting?: Meeting | null;
  user?: User | null;

  constructor() {
    this.meetingId = this.userId = 0;
    this.role = MeetingParticipantRole.Other;
    this.attended = false;
    this.createdOn = this.modifiedOn = '';
  }
}

