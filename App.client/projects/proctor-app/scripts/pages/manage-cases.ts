import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  ngOnInit(): void {
    this.loadCases();
  }

  loadCases(): void {
    // Mock data - replace with actual API call
    const mockCases: Case[] = [
      { id: '#C0000004', subject: 'Drugs', date: 'Today', status: 'pending' },
      { id: '#C0000003', subject: 'Conflict', date: '30-04-25', status: 'progress' },
      { id: '#C0000002', subject: 'Cyber Bullying', date: '27-04-25', status: 'solved' },
      { id: '#C0000001', subject: 'Ragging', date: '02-02-25', status: 'solved' }
    ];
    this.cases.set(mockCases);
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

