import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ComplaintService } from '../services/complaint.service';
import { Complaint } from '../models/complaint';

@Component({
  selector: 'case-details-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="case-details-section">
      <div class="case-details-container">
        <div class="case-header">
          <button class="back-btn" (click)="goBack()">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <h1 class="page-title">Case Details</h1>
        </div>

        <div *ngIf="isLoading()" class="loading">Loading case information...</div>
        
        <div *ngIf="!isLoading() && complaint()" class="case-content">
          <!-- Case ID and Status -->
          <div class="case-info-header">
            <div class="case-id-display">
              Case ID: {{ complaint()!.id }}
            </div>
            <div class="status-badge" [ngClass]="getStatusClass(complaint()!.status)">
              {{ complaint()!.status }}
            </div>
          </div>

          <!-- Case Information -->
          <div class="info-section">
            <h2>Case Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>Title:</label>
                <span>{{ complaint()!.title }}</span>
              </div>
              <div class="info-item">
                <label>Date Filed:</label>
                <span>{{ formatDate(complaint()!.complaintDate) }}</span>
              </div>
              <div class="info-item">
                <label>Status:</label>
                <span>{{ complaint()!.status }}</span>
              </div>
              <div class="info-item">
                <label>Priority:</label>
                <span>{{ complaint()!.priority }}</span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="info-section">
            <h2>Description</h2>
            <p class="description">{{ complaint()!.description }}</p>
          </div>

          <!-- Complainant Information -->
          <div class="info-section">
            <h2>Complainant Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>Name:</label>
                <span>{{ complaint()!.complainantName }}</span>
              </div>
              <div class="info-item">
                <label>Student ID:</label>
                <span>{{ complaint()!.complainantStudentId }}</span>
              </div>
              <div class="info-item">
                <label>Details:</label>
                <span>{{ complaint()!.complainantDetails }}</span>
              </div>
            </div>
          </div>

          <!-- Accused Information -->
          <div class="info-section" *ngIf="complaint()!.accusedName">
            <h2>Accused Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>Name:</label>
                <span>{{ complaint()!.accusedName }}</span>
              </div>
              <div class="info-item" *ngIf="complaint()!.accusedStudentId">
                <label>Student ID:</label>
                <span>{{ complaint()!.accusedStudentId }}</span>
              </div>
              <div class="info-item" *ngIf="complaint()!.accusedDetails">
                <label>Details:</label>
                <span>{{ complaint()!.accusedDetails }}</span>
              </div>
            </div>
          </div>

          <!-- Additional Information -->
          <div class="info-section" *ngIf="complaint()!.location || complaint()!.incidentDate">
            <h2>Additional Information</h2>
            <div class="info-grid">
              <div class="info-item" *ngIf="complaint()!.location">
                <label>Location:</label>
                <span>{{ complaint()!.location }}</span>
              </div>
              <div class="info-item" *ngIf="complaint()!.incidentDate">
                <label>Incident Date:</label>
                <span>{{ formatDate(complaint()!.incidentDate) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="!isLoading() && !complaint()" class="error-message">
          Case not found.
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/case-details.scss']
})
export class CaseDetailsPage implements OnInit {
  complaint = signal<Complaint | null>(null);
  isLoading = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private complaintService: ComplaintService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCase(parseInt(id, 10));
    }
  }

  loadCase(id: number): void {
    this.isLoading.set(true);
    this.complaintService.getComplaintById(id).subscribe({
      next: (complaint: Complaint) => {
        this.complaint.set(complaint);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading case:', error);
        this.complaint.set(null);
        this.isLoading.set(false);
      }
    });
  }

  formatDate(dateString: string | null | undefined): string {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }

  getStatusClass(status: string): string {
    return status.replace(/\s+/g, '');
  }

  goBack(): void {
    this.router.navigate(['/dashboard/manage-cases']);
  }
}

