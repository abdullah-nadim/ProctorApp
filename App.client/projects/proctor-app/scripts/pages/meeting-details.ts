import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MeetingService } from '../services/meeting.service';
import { Meeting } from '../models/meeting';
import { MeetingStatus } from '../models/user';

@Component({
  selector: 'meeting-details-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="meeting-details-section">
      <div class="meeting-details-container">
        <div class="meeting-header">
          <button class="back-btn" (click)="goBack()">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <h1 class="page-title">Meeting Details</h1>
        </div>

        <div *ngIf="isLoading()" class="loading">Loading meeting information...</div>
        
        <div *ngIf="!isLoading() && meeting()" class="meeting-content">
          <!-- Meeting ID and Status -->
          <div class="meeting-info-header">
            <div class="meeting-id-display">
              Meeting ID: {{ meeting()!.id }}
            </div>
            <div class="status-badge" [ngClass]="getStatusClass(meeting()!.status)">
              {{ meeting()!.status }}
            </div>
          </div>

          <!-- Meeting Information -->
          <div class="info-section">
            <h2>Meeting Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>Complaint ID:</label>
                <span>{{ meeting()!.complaintId }}</span>
              </div>
              <div class="info-item">
                <label>Scheduled Date:</label>
                <span>{{ formatDate(meeting()!.scheduledAt) }}</span>
              </div>
              <div class="info-item">
                <label>Scheduled Time:</label>
                <span>{{ formatTime(meeting()!.scheduledAt) }}</span>
              </div>
              <div class="info-item">
                <label>Duration:</label>
                <span>{{ meeting()!.durationMinutes }} minutes</span>
              </div>
              <div class="info-item">
                <label>Location:</label>
                <span>{{ meeting()!.location }}</span>
              </div>
              <div class="info-item">
                <label>Status:</label>
                <span>{{ meeting()!.status }}</span>
              </div>
            </div>
          </div>

          <!-- Agenda -->
          <div class="info-section" *ngIf="meeting()!.agenda">
            <h2>Agenda</h2>
            <p class="description">{{ meeting()!.agenda }}</p>
          </div>

          <!-- Notes -->
          <div class="info-section" *ngIf="meeting()!.notes">
            <h2>Notes</h2>
            <p class="description">{{ meeting()!.notes }}</p>
          </div>

          <!-- Outcome -->
          <div class="info-section" *ngIf="meeting()!.outcome">
            <h2>Outcome</h2>
            <p class="description">{{ meeting()!.outcome }}</p>
          </div>

          <!-- Participants -->
          <div class="info-section" *ngIf="meeting()!.participants && meeting()!.participants.length > 0">
            <h2>Participants</h2>
            <div class="participants-list">
              <div *ngFor="let participant of meeting()!.participants" class="participant-item">
                <div class="participant-info">
                  <span class="participant-name">{{ participant.user?.fullName || 'Unknown' }}</span>
                  <span class="participant-role">{{ participant.role }}</span>
                  <span class="participant-status" [ngClass]="participant.attended ? 'attended' : 'not-attended'">
                    {{ participant.attended ? 'Attended' : 'Not Attended' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Close Meeting Form -->
          <div class="info-section" *ngIf="meeting()!.status === 'Scheduled' && !showCloseForm()">
            <div class="close-meeting-section">
              <button class="btn btn-primary" (click)="showCloseForm.set(true)">
                <i class="fas fa-check-circle"></i> Close Meeting
              </button>
            </div>
          </div>

          <div class="info-section" *ngIf="showCloseForm()">
            <h2>Close Meeting</h2>
            <form (ngSubmit)="onCloseMeeting()" #closeForm="ngForm">
              <div class="form-group">
                <label>Outcome <span class="required">*</span></label>
                <textarea 
                  class="form-control" 
                  rows="5"
                  [(ngModel)]="closeFormData.outcome"
                  name="outcome"
                  placeholder="Enter meeting outcome..."
                  required></textarea>
              </div>
              <div class="form-actions">
                <button type="button" class="btn btn-secondary" (click)="cancelCloseForm()">Cancel</button>
                <button type="submit" class="btn btn-primary" [disabled]="!closeForm.valid || isClosing()">
                  {{ isClosing() ? 'Closing...' : 'Close Meeting' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div *ngIf="!isLoading() && !meeting()" class="error-message">
          Meeting not found.
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/meeting-details.scss']
})
export class MeetingDetailsPage implements OnInit {
  meeting = signal<Meeting | null>(null);
  isLoading = signal(false);
  isClosing = signal(false);
  showCloseForm = signal(false);
  
  closeFormData = {
    outcome: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meetingService: MeetingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMeeting(parseInt(id, 10));
    }
  }

  loadMeeting(id: number): void {
    this.isLoading.set(true);
    this.meetingService.getMeetingById(id).subscribe({
      next: (meeting: Meeting) => {
        this.meeting.set(meeting);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading meeting:', error);
        this.meeting.set(null);
        this.isLoading.set(false);
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }

  formatTime(dateString: string): string {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  getStatusClass(status: string): string {
    return status.replace(/\s+/g, '').toLowerCase();
  }

  goBack(): void {
    this.router.navigate(['/dashboard/schedule-meeting']);
  }

  onCloseMeeting(): void {
    if (this.isClosing() || !this.meeting()) return;
    
    if (!this.closeFormData.outcome || this.closeFormData.outcome.trim() === '') {
      alert('Please enter the meeting outcome');
      return;
    }

    this.isClosing.set(true);
    this.meetingService.closeMeeting(this.meeting()!.id, this.closeFormData.outcome).subscribe({
      next: () => {
        this.isClosing.set(false);
        this.showCloseForm.set(false);
        this.closeFormData.outcome = '';
        // Reload the meeting to get updated status and outcome
        this.loadMeeting(this.meeting()!.id);
        alert('Meeting closed successfully!');
      },
      error: (error) => {
        console.error('Error closing meeting:', error);
        this.isClosing.set(false);
        alert('Failed to close meeting. Please try again.');
      }
    });
  }

  cancelCloseForm(): void {
    this.showCloseForm.set(false);
    this.closeFormData.outcome = '';
  }
}

