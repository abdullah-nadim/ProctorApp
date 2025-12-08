import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MeetingService } from '../services/meeting.service';
import { ComplaintService } from '../services/complaint.service';
import { Meeting } from '../models/meeting';
import { Complaint } from '../models/complaint';
import { MeetingStatus } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'schedule-meeting-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="schedule-meeting-section">
      <div class="schedule-meeting-container">
        <div class="page-header">
          <h1 class="page-title">Schedule Meeting</h1>
          <button class="btn btn-primary" (click)="onCreateMeetingClick()" *ngIf="!showCreateForm()">
            <i class="fas fa-plus"></i> Create Meeting
          </button>
        </div>
        
        <!-- Create Meeting Form -->
        <div class="create-meeting-form" *ngIf="showCreateForm()">
          <h2>Create New Meeting</h2>
          <form (ngSubmit)="onSubmitMeeting()" #meetingForm="ngForm">
            <div class="form-group">
              <label>Complaint <span class="required">*</span></label>
              <select 
                class="form-control" 
                [(ngModel)]="meetingFormData.complaintId"
                name="complaintId"
                required>
                <option [ngValue]="null" disabled>Select a complaint</option>
                <option *ngFor="let complaint of complaints()" [ngValue]="complaint.id">
                  {{ complaint.id }} - {{ complaint.complainantName || 'Unknown' }}
                </option>
              </select>
            </div>
            
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Date <span class="required">*</span></label>
                  <input 
                    type="date" 
                    class="form-control" 
                    [(ngModel)]="meetingFormData.scheduledDate"
                    name="scheduledDate"
                    required>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Time <span class="required">*</span></label>
                  <input 
                    type="time" 
                    class="form-control" 
                    [(ngModel)]="meetingFormData.scheduledTime"
                    name="scheduledTime"
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
                placeholder="Enter meeting location"
                required>
            </div>
            
            <div class="form-group">
              <label>Agenda</label>
              <textarea 
                class="form-control" 
                rows="3"
                [(ngModel)]="meetingFormData.agenda"
                name="agenda"
                placeholder="Enter meeting agenda"></textarea>
            </div>
            
            <div class="form-group">
              <label>Notes</label>
              <textarea 
                class="form-control" 
                rows="3"
                [(ngModel)]="meetingFormData.notes"
                name="notes"
                placeholder="Enter additional notes"></textarea>
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
                <td>{{ meeting.complaintId }}</td>
                <td>{{ formatMeetingDate(meeting.scheduledAt) }}</td>
                <td>{{ formatMeetingTime(meeting.scheduledAt) }}</td>
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
  complaints = signal<Complaint[]>([]);
  showCreateForm = signal(false);
  isLoading = signal(false);
  
  meetingFormData = {
    complaintId: null as number | null,
    scheduledDate: '',
    scheduledTime: '',
    location: '',
    agenda: '',
    notes: ''
  };

  constructor(
    private meetingService: MeetingService,
    private complaintService: ComplaintService
  ) {}

  ngOnInit(): void {
    this.loadMeetings();
  }

  loadComplaints(): void {
    this.complaintService.getAllComplaints().subscribe({
      next: (complaints: Complaint[]) => {
        this.complaints.set(complaints);
      },
      error: (error) => {
        console.error('Error loading complaints:', error);
        this.complaints.set([]);
      }
    });
  }

  loadMeetings(): void {
    this.isLoading.set(true);
    
    const currentUser = UserService.getCurrentUser();
    if (!currentUser) {
      console.error('No current user found');
      this.meetings.set([]);
      this.isLoading.set(false);
      return;
    }
    
    this.meetingService.getMeetingsForUser(currentUser.id).subscribe({
      next: (meetings: Meeting[]) => {
        this.meetings.set(meetings);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading meetings:', error);
        this.meetings.set([]);
        this.isLoading.set(false);
      }
    });
  }

  onSubmitMeeting(): void {
    if (this.isLoading()) return;
    
    if (!this.meetingFormData.complaintId || !this.meetingFormData.scheduledDate || 
        !this.meetingFormData.scheduledTime || !this.meetingFormData.location) {
      alert('Please fill in all required fields');
      return;
    }

    this.isLoading.set(true);

    // Combine date and time into ISO string
    const dateTime = new Date(`${this.meetingFormData.scheduledDate}T${this.meetingFormData.scheduledTime}`);
    const currentUser = UserService.getCurrentUser();
    
    const meeting = new Meeting();
    meeting.complaintId = this.meetingFormData.complaintId!;
    meeting.scheduledBy = currentUser?.id || 0;
    meeting.scheduledAt = dateTime.toISOString();
    meeting.location = this.meetingFormData.location;
    meeting.agenda = this.meetingFormData.agenda || null;
    meeting.notes = this.meetingFormData.notes || null;
    meeting.status = MeetingStatus.Scheduled;
    meeting.durationMinutes = 30; // Default duration

    this.meetingService.createMeeting(meeting).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.showCreateForm.set(false);
        this.resetForm();
        this.loadMeetings();
        alert('Meeting scheduled successfully!');
      },
      error: (error) => {
        console.error('Error creating meeting:', error);
        this.isLoading.set(false);
        alert('Failed to schedule meeting. Please try again.');
      }
    });
  }

  resetForm(): void {
    this.meetingFormData = {
      complaintId: null,
      scheduledDate: '',
      scheduledTime: '',
      location: '',
      agenda: '',
      notes: ''
    };
  }

  formatMeetingDate(dateString: string): string {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
  }

  formatMeetingTime(dateString: string): string {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  onCreateMeetingClick(): void {
    this.showCreateForm.set(true);
    this.loadComplaints();
  }
}

