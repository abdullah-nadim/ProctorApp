import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService, UserType } from '../models/user';

interface Case {
  id: string;
  category: string;
  date: string;
  status: 'pending' | 'progress' | 'done';
}

@Component({
  selector: 'dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <!-- Stats Cards -->
    <div class="stats-cards">
      <div class="stat-card" [ngClass]="getFirstStatCardClass()">
        <div class="stat-number">{{ getTotalCases() }}</div>
        <div class="stat-label">{{ getFirstStatLabel() }}</div>
      </div>
      
      <div class="stat-card cases-pending">
        <div class="stat-number">{{ getPendingCases() }}</div>
        <div class="stat-label">Cases in Pending</div>
      </div>
      
      <div class="stat-card cases-progress">
        <div class="stat-number">{{ getProgressCases() }}</div>
        <div class="stat-label">Cases in Progress</div>
      </div>
      
      <div class="stat-card cases-solved">
        <div class="stat-number">{{ getSolvedCases() }}</div>
        <div class="stat-label">Cases Solved</div>
      </div>
    </div>
    
    <!-- Case Updates -->
    <div class="case-updates">
      <div class="case-header">
        <h2>Case Updates</h2>
        <div class="case-controls">
          <div class="sort-dropdown">
            <select [(ngModel)]="sortBy">
              <option value="recently">Sort by Recently</option>
              <option value="date">Sort by Date</option>
              <option value="status">Sort by Status</option>
            </select>
            <i class="fas fa-chevron-down"></i>
          </div>
          
          <div class="action-buttons">
            <button class="btn-action" (click)="printCases()">
              <i class="fas fa-print"></i> Print
            </button>
            <button class="btn-action" (click)="shareCases()">
              <i class="fas fa-share"></i> Share
            </button>
          </div>
        </div>
      </div>
      
      <table class="cases-table">
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let case of cases()">
            <td>
              <div class="case-id">{{ case.id }}</div>
              <div class="case-category">{{ case.category }}</div>
            </td>
            <td>{{ case.date }}</td>
            <td>
              <div class="status" [ngClass]="case.status">
                <span class="status-dot"></span> {{ getStatusLabel(case.status) }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="show-all-cases">
        <a [routerLink]="getAllCasesRoute()">
          {{ getAllCasesText() }} <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/dashboard.scss']
})
export class DashboardPage implements OnInit {
  cases = signal<Case[]>([]);
  sortBy = 'recently';

  ngOnInit(): void {
    this.loadCases();
  }

  loadCases(): void {
    // Mock data - replace with actual API call
    const mockCases: Case[] = [
      { id: '#C0000004', category: 'Drugs', date: 'Today', status: 'pending' },
      { id: '#C0000002', category: 'Cyber Bullying', date: '27-04-25', status: 'done' },
      { id: '#C0000003', category: 'Conflict', date: '30-04-25', status: 'progress' },
      { id: '#C0000001', category: 'Ragging', date: '02-02-25', status: 'done' }
    ];
    this.cases.set(mockCases);
  }

  getTotalCases(): number {
    return this.cases().length;
  }

  getPendingCases(): number {
    return this.cases().filter(c => c.status === 'pending').length;
  }

  getProgressCases(): number {
    return this.cases().filter(c => c.status === 'progress').length;
  }

  getSolvedCases(): number {
    return this.cases().filter(c => c.status === 'done').length;
  }

  getFirstStatCardClass(): string {
    const userType = UserService.getUserType();
    if (userType === UserType.Student) {
      return 'cases-filed';
    }
    return 'total-cases';
  }

  getFirstStatLabel(): string {
    const userType = UserService.getUserType();
    if (userType === UserType.Student) {
      return 'Cases Filed';
    }
    return 'Total Cases';
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'progress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return status;
    }
  }

  getAllCasesRoute(): string {
    const userType = UserService.getUserType();
    if (userType === UserType.Student) {
      return '/dashboard/my-complaints';
    } else if (userType === UserType.Proctor) {
      return '/dashboard/assign-cases';
    } else {
      return '/dashboard/manage-cases';
    }
  }

  getAllCasesText(): string {
    const userType = UserService.getUserType();
    if (userType === UserType.Student) {
      return 'Show All My Cases';
    }
    return 'Show All Cases';
  }

  printCases(): void {
    window.print();
  }

  shareCases(): void {
    // Implement share functionality
    console.log('Share cases');
  }
}
