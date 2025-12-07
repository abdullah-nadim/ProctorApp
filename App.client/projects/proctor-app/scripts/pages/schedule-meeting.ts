import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Meeting {
  id: string;
  caseId: string;
  date: string;
  time: string;
  location: string;
  participants: string[];
}

@Component({
  selector: 'schedule-meeting-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="schedule-meeting-section">
      <div class="schedule-meeting-container">
        <div class="page-header">
          <h1 class="page-title">Schedule Meeting</h1>
          <button class="btn btn-primary" (click)="showCreateForm.set(true)" *ngIf="!showCreateForm()">
            <i class="fas fa-plus"></i> Create Meeting
          </button>
        </div>
        
        <!-- Create Meeting Form -->
        <div class="create-meeting-form" *ngIf="showCreateForm()">
          <h2>Create New Meeting</h2>
          <form (ngSubmit)="onSubmitMeeting()" #meetingForm="ngForm">
            <div class="form-group">
              <label>Case ID <span class="required">*</span></label>
              <input 
                type="text" 
                class="form-control" 
                [(ngModel)]="meetingFormData.caseId"
                name="caseId"
                required>
            </div>
            
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Date <span class="required">*</span></label>
                  <input 
                    type="date" 
                    class="form-control" 
                    [(ngModel)]="meetingFormData.date"
                    name="date"
                    required>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Time <span class="required">*</span></label>
                  <input 
                    type="time" 
                    class="form-control" 
                    [(ngModel)]="meetingFormData.time"
                    name="time"
                    required>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label>Location <span class="required">*</span></label>
              <input 
                type="text" 
                class="form-control" 
                [(ngModel)]="meetingFormData.location"
                name="location"
                required>
            </div>
            
            <div class="form-group">
              <label>Participants</label>
              <textarea 
                class="form-control" 
                rows="3"
                [(ngModel)]="meetingFormData.participants"
                name="participants"
                placeholder="Enter participant names"></textarea>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="showCreateForm.set(false)">Cancel</button>
              <button type="submit" class="btn btn-primary" [disabled]="!meetingForm.valid || isLoading()">
                {{ isLoading() ? 'Creating...' : 'Create Meeting' }}
              </button>
            </div>
          </form>
        </div>
        
        <!-- Meetings List -->
        <div class="meetings-list" *ngIf="!showCreateForm()">
          <table class="meetings-table">
            <thead>
              <tr>
                <th>Meeting ID</th>
                <th>Case ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let meeting of meetings()">
                <td>{{ meeting.id }}</td>
                <td>{{ meeting.caseId }}</td>
                <td>{{ meeting.date }}</td>
                <td>{{ meeting.time }}</td>
                <td>{{ meeting.location }}</td>
                <td>
                  <button class="view-btn" [routerLink]="['/dashboard/meeting-details', meeting.id]">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/schedule-meeting.scss']
})
export class ScheduleMeetingPage implements OnInit {
  meetings = signal<Meeting[]>([]);
  showCreateForm = signal(false);
  isLoading = signal(false);
  
  meetingFormData = {
    caseId: '',
    date: '',
    time: '',
    location: '',
    participants: ''
  };

  ngOnInit(): void {
    this.loadMeetings();
  }

  loadMeetings(): void {
    // Mock data - replace with actual API call
    const mockMeetings: Meeting[] = [
      { id: 'M001', caseId: '#C0000003', date: '05-05-25', time: '10:00 AM', location: 'Room 101', participants: ['Student', 'Proctor'] },
      { id: 'M002', caseId: '#C0000002', date: '06-05-25', time: '2:00 PM', location: 'Room 202', participants: ['Student', 'Proctor', 'Officer'] }
    ];
    this.meetings.set(mockMeetings);
  }

  onSubmitMeeting(): void {
    if (this.isLoading()) return;
    
    this.isLoading.set(true);
    // TODO: Implement API call to create meeting
    setTimeout(() => {
      this.isLoading.set(false);
      this.showCreateForm.set(false);
      this.loadMeetings();
    }, 1000);
  }
}

