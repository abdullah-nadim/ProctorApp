import { Injectable } from '@angular/core';
import { MeetingAPI } from '@scripts/api/meeting-api';
import { Meeting } from '@models/index';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MeetingService {
  constructor(private api: MeetingAPI) {}

  getMeetingById(id: number): Observable<Meeting> {
    return this.api.getMeetingById(id);
  }

  getMeetingsByComplaint(complaintId: number): Observable<Meeting[]> {
    return this.api.getMeetingsByComplaint(complaintId);
  }

  createMeeting(meeting: Meeting): Observable<any> {
    return this.api.createMeeting(meeting);
  }

  updateMeeting(meeting: Meeting): Observable<any> {
    return this.api.updateMeeting(meeting);
  }

  getAllMeetings(): Observable<Meeting[]> {
    return this.api.getAllMeetings();
  }
}

