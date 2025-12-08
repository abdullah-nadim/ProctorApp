import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComplaintService } from '../services/complaint.service';
import { Complaint } from '../models/complaint';
import { ComplaintStatus } from '../models/user';

interface Case {
  id: number;
  subject: string;
  date: string;
  status: 'pending' | 'progress' | 'solved';
  complaintId: number;
  actualStatus: string; // Store the actual complaint status
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
                  <select 
                    class="status-select" 
                    [value]="case.actualStatus"
                    (change)="onStatusChange(case, $event)">
                    <option value="Pending">Pending</option>
                    <option value="Assigned">Assigned</option>
                    <option value="UnderInvestigation">Under Investigation</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Dismissed">Dismissed</option>
                  </select>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="status-btn" [routerLink]="['/dashboard/case-details', case.complaintId]">
                      Open
                    </button>
                    <button 
                      *ngIf="case.status !== 'solved'" 
                      class="close-btn" 
                      (click)="openCloseCaseModal(case)">
                      Close Case
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Close Case Modal -->
    <div class="modal-overlay" *ngIf="showCloseModal()" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Close Case</h2>
          <button class="modal-close" (click)="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <p>Select the final status for this case:</p>
          <div class="status-options">
            <label class="status-option">
              <input 
                type="radio" 
                name="closeStatus" 
                value="Resolved" 
                [(ngModel)]="closeCaseData.status"
                required>
              <span class="status-label resolved">Resolved</span>
              <span class="status-description">Case has been successfully resolved</span>
            </label>
            <label class="status-option">
              <input 
                type="radio" 
                name="closeStatus" 
                value="Dismissed" 
                [(ngModel)]="closeCaseData.status"
                required>
              <span class="status-label dismissed">Dismissed</span>
              <span class="status-description">Case has been dismissed</span>
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" (click)="closeModal()">Cancel</button>
          <button 
            class="btn btn-primary" 
            (click)="onCloseCase()" 
            [disabled]="!closeCaseData.status || isClosing()">
            {{ isClosing() ? 'Closing...' : 'Close Case' }}
          </button>
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
  isClosing = signal(false);
  showCloseModal = signal(false);
  selectedCase: Case | null = null;
  
  closeCaseData = {
    status: ''
  };

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
      id: complaint.id,
      subject: complaint.title,
      date: this.formatDate(complaint.complaintDate),
      status: this.mapStatus(complaint.status),
      complaintId: complaint.id,
      actualStatus: complaint.status // Store the actual status
    }));
  }

  mapStatus(status: string): 'pending' | 'progress' | 'solved' {
    switch (status) {
      case ComplaintStatus.Pending:
        return 'pending';
      case ComplaintStatus.UnderInvestigation:
      case ComplaintStatus.Assigned:
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

  openCloseCaseModal(caseItem: Case): void {
    this.selectedCase = caseItem;
    this.closeCaseData.status = '';
    this.showCloseModal.set(true);
  }

  closeModal(): void {
    this.showCloseModal.set(false);
    this.selectedCase = null;
    this.closeCaseData.status = '';
  }

  onCloseCase(): void {
    if (!this.selectedCase || !this.closeCaseData.status || this.isClosing()) return;

    this.isClosing.set(true);
    
    // Get the full complaint to update
    this.complaintService.getComplaintById(this.selectedCase.complaintId).subscribe({
      next: (complaint: Complaint) => {
        complaint.status = this.closeCaseData.status;
        this.complaintService.updateComplaint(complaint).subscribe({
          next: () => {
            this.isClosing.set(false);
            this.closeModal();
            this.loadCases(); // Reload cases to reflect the updated status
            alert('Case closed successfully!');
          },
          error: (error) => {
            console.error('Error closing case:', error);
            this.isClosing.set(false);
            alert('Failed to close case. Please try again.');
          }
        });
      },
      error: (error) => {
        console.error('Error loading complaint:', error);
        this.isClosing.set(false);
        alert('Failed to load case details. Please try again.');
      }
    });
  }

  onStatusChange(caseItem: Case, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newStatus = target.value;
    const previousStatus = caseItem.actualStatus;
    
    // Optimistically update the UI
    caseItem.actualStatus = newStatus;
    caseItem.status = this.mapStatus(newStatus);
    
    // Get the full complaint to update
    this.complaintService.getComplaintById(caseItem.complaintId).subscribe({
      next: (complaint: Complaint) => {
        complaint.status = newStatus;
        this.complaintService.updateComplaint(complaint).subscribe({
          next: () => {
            this.loadCases(); // Reload cases to reflect the updated status
          },
          error: (error) => {
            console.error('Error updating case status:', error);
            alert('Failed to update case status. Please try again.');
            // Reset the select to previous value
            target.value = previousStatus;
            caseItem.actualStatus = previousStatus;
            caseItem.status = this.mapStatus(previousStatus);
          }
        });
      },
      error: (error) => {
        console.error('Error loading complaint:', error);
        alert('Failed to load case details. Please try again.');
        // Reset the select to previous value
        target.value = previousStatus;
        caseItem.actualStatus = previousStatus;
        caseItem.status = this.mapStatus(previousStatus);
      }
    });
  }
}

