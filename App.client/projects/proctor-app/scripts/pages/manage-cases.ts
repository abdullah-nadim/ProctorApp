import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComplaintService } from '../services/complaint.service';
import { Complaint } from '../models/complaint';
import { ComplaintStatus } from '../models/user';

interface Case {
  id: string;
  subject: string;
  date: string;
  status: 'pending' | 'progress' | 'solved';
}

@Component({
  selector: 'manage-cases-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="manage-cases-section">
      <div class="manage-cases-container">
        <h1 class="page-title">Manage Cases</h1>
        
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
        
        <!-- Cases Table -->
        <div class="cases-table-container">
          <table class="cases-table">
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
              <tr *ngFor="let case of filteredCases()">
                <td>
                  <div class="case-id">{{ case.id }}</div>
                </td>
                <td class="case-subject">{{ case.subject }}</td>
                <td class="case-date">{{ case.date }}</td>
                <td>
                  <div class="status" [ngClass]="case.status">
                    <span class="status-dot"></span> {{ getStatusLabel(case.status) }}
                  </div>
                </td>
                <td>
                  <button class="status-btn" [routerLink]="['/dashboard/case-details', case.id]">
                    Open
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/manage-cases.scss']
})
export class ManageCasesPage implements OnInit {
  cases = signal<Case[]>([]);
  filterStatus: 'all' | 'pending' | 'progress' | 'solved' = 'all';
  isLoading = signal(false);

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.loadCases();
  }

  loadCases(): void {
    this.isLoading.set(true);
    
    this.complaintService.getAllComplaints().subscribe({
      next: (complaints: Complaint[]) => {
        this.cases.set(this.mapComplaintsToCases(complaints));
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading complaints:', error);
        this.cases.set([]);
        this.isLoading.set(false);
      }
    });
  }

  mapComplaintsToCases(complaints: Complaint[]): Case[] {
    return complaints.map(complaint => ({
      id: `#C${String(complaint.id).padStart(8, '0')}`,
      subject: complaint.title,
      date: this.formatDate(complaint.complaintDate),
      status: this.mapStatus(complaint.status)
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

  filteredCases(): Case[] {
    if (this.filterStatus === 'all') {
      return this.cases();
    }
    return this.cases().filter(c => c.status === this.filterStatus);
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

