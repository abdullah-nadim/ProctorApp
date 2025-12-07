import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComplaintService } from '../services/complaint.service';
import { Complaint } from '../models/complaint';
import { ComplaintStatus } from '../models/user';
import { UserService } from '../services/user.service';

interface ComplaintDisplay {
  id: string;
  subject: string;
  date: string;
  status: 'pending' | 'progress' | 'solved';
  description: string;
}

@Component({
  selector: 'my-complaints-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="my-complaints-section">
      <div class="my-complaints-container">
        <h1 class="page-title">My Complaints</h1>
        
        <!-- Filter Buttons -->
        <div class="filter-buttons">
          <button 
            class="filter-btn" 
            [class.active]="filterStatus === 'all'"
            (click)="filterStatus = 'all'">
            All
          </button>
          <button 
            class="filter-btn" 
            [class.active]="filterStatus === 'pending'"
            (click)="filterStatus = 'pending'">
            Pending
          </button>
          <button 
            class="filter-btn" 
            [class.active]="filterStatus === 'progress'"
            (click)="filterStatus = 'progress'">
            In Progress
          </button>
          <button 
            class="filter-btn" 
            [class.active]="filterStatus === 'solved'"
            (click)="filterStatus = 'solved'">
            Solved
          </button>
        </div>
        
        <!-- Complaints Table -->
        <div class="complaints-table-container">
          <table class="complaints-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let complaint of filteredComplaints()">
                <td>
                  <div class="case-id">{{ complaint.id }}</div>
                </td>
                <td class="case-subject">{{ complaint.subject }}</td>
                <td class="case-date">{{ complaint.date }}</td>
                <td>
                  <div class="status" [ngClass]="complaint.status">
                    <span class="status-dot"></span> {{ getStatusLabel(complaint.status) }}
                  </div>
                </td>
                <td>
                  <button class="view-btn" [routerLink]="['/dashboard/complaint-details', complaint.id]">
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
  styleUrls: ['../../styles/pages/my-complaints.scss']
})
export class MyComplaintsPage implements OnInit {
  complaints = signal<ComplaintDisplay[]>([]);
  filterStatus: 'all' | 'pending' | 'progress' | 'solved' = 'all';
  isLoading = signal(false);

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.isLoading.set(true);
    const currentUser = UserService.getCurrentUser();
    
    if (!currentUser) {
      console.error('No current user found');
      this.complaints.set([]);
      this.isLoading.set(false);
      return;
    }

    this.complaintService.getComplaintsByComplainant(currentUser.id).subscribe({
      next: (complaints: Complaint[]) => {
        this.complaints.set(this.mapComplaintsToDisplay(complaints));
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading complaints:', error);
        this.complaints.set([]);
        this.isLoading.set(false);
      }
    });
  }

  mapComplaintsToDisplay(complaints: Complaint[]): ComplaintDisplay[] {
    return complaints.map(complaint => ({
      id: `#C${String(complaint.id).padStart(8, '0')}`,
      subject: complaint.title,
      date: this.formatDate(complaint.complaintDate),
      status: this.mapStatus(complaint.status),
      description: complaint.description
    }));
  }

  mapStatus(status: string): 'pending' | 'progress' | 'solved' {
    switch (status) {
      case ComplaintStatus.Pending:
        return 'pending';
      case ComplaintStatus.UnderInvestigation:
        return 'progress';
      case ComplaintStatus.Resolved:
      case ComplaintStatus.Dismissed:
        return 'solved';
      default:
        return 'pending';
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else {
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }
  }

  filteredComplaints() {
    if (this.filterStatus === 'all') {
      return this.complaints();
    }
    return this.complaints().filter(c => c.status === this.filterStatus);
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'progress':
        return 'In Progress';
      case 'solved':
        return 'Solved';
      default:
        return status;
    }
  }
}

