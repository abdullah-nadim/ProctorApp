import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Complaint {
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
  complaints = signal<Complaint[]>([]);
  filterStatus: 'all' | 'pending' | 'progress' | 'solved' = 'all';

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    // Mock data - replace with actual API call
    const mockComplaints: Complaint[] = [
      { id: '#C0000004', subject: 'Drugs', date: 'Today', status: 'pending', description: 'Drug related complaint' },
      { id: '#C0000003', subject: 'Conflict', date: '30-04-25', status: 'progress', description: 'Conflict complaint' },
      { id: '#C0000002', subject: 'Cyber Bullying', date: '27-04-25', status: 'solved', description: 'Cyber bullying complaint' },
      { id: '#C0000001', subject: 'Ragging', date: '02-02-25', status: 'solved', description: 'Ragging complaint' }
    ];
    this.complaints.set(mockComplaints);
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

