import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComplaintService } from '../services/complaint.service';
import { CaseAssignmentService } from '../services/case-assignment.service';
import { Complaint } from '../models/complaint';
import { CaseAssignment } from '../models/case-assignment';
import { UserService } from '../services/user.service';

interface Case {
  id: string;
  subject: string;
  date: string;
  assigned: boolean;
  complaintId: number;
}

@Component({
  selector: 'assign-cases-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="assign-cases-section">
      <div class="assign-cases-container">
        <h1 class="page-title">Assign Cases</h1>
        
        <!-- Tab Buttons -->
        <div class="tab-buttons">
          <button 
            class="tab-btn" 
            [class.active]="showAssigned()"
            (click)="showAssigned.set(true)">
            Assigned
          </button>
          <button 
            class="tab-btn" 
            [class.active]="!showAssigned()"
            (click)="showAssigned.set(false)">
            Unassigned
          </button>
        </div>
        
        <!-- Cases Table -->
        <div class="cases-table-container">
          <table class="cases-table">
            <thead>
              <tr>
                <th class="col-case-id">Case ID</th>
                <th class="col-subject">Subject</th>
                <th class="col-date">Date</th>
                <th class="col-action">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let case of filteredCases()">
                <td class="col-case-id">
                  <div class="case-id">{{ case.id }}</div>
                </td>
                <td class="col-subject">
                  <div class="case-subject">{{ case.subject }}</div>
                </td>
                <td class="col-date">
                  <div class="case-date">{{ case.date }}</div>
                </td>
                <td class="col-action">
                  <button 
                    *ngIf="!case.assigned" 
                    class="view-btn" 
                    (click)="assignCase(case.id)">
                    Assign
                  </button>
                  <button 
                    *ngIf="case.assigned" 
                    class="view-btn" 
                    [routerLink]="['/dashboard/case-details', case.id]">
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
  styleUrls: ['../../styles/pages/assign-cases.scss']
})
export class AssignCasesPage implements OnInit {
  cases = signal<Case[]>([]);
  showAssigned = signal(false);
  isLoading = signal(false);

  constructor(
    private complaintService: ComplaintService,
    private caseAssignmentService: CaseAssignmentService
  ) {}

  ngOnInit(): void {
    this.loadCases();
  }

  loadCases(): void {
    this.isLoading.set(true);
    
    // Load unassigned complaints
    this.complaintService.getUnassignedComplaints().subscribe({
      next: (complaints: Complaint[]) => {
        const unassignedCases = complaints.map(c => ({
          id: `#C${String(c.id).padStart(8, '0')}`,
          subject: c.title,
          date: this.formatDate(c.complaintDate),
          assigned: false,
          complaintId: c.id
        }));

        // Load assigned cases for current user
        const currentUser = UserService.getCurrentUser();
        if (currentUser) {
          this.caseAssignmentService.getCaseAssignmentsByAssignee(currentUser.id).subscribe({
            next: (assignments: CaseAssignment[]) => {
              // Get complaint IDs from assignments
              const assignedComplaintIds = new Set(assignments.map(a => a.complaintId));
              
              // Load full complaint details for assigned cases
              const assignedComplaintPromises = Array.from(assignedComplaintIds).map(id =>
                this.complaintService.getComplaintById(id).toPromise()
              );

              Promise.all(assignedComplaintPromises).then(assignedComplaints => {
                const assignedCases = assignedComplaints
                  .filter(c => c !== undefined)
                  .map(c => ({
                    id: `#C${String(c!.id).padStart(8, '0')}`,
                    subject: c!.title,
                    date: this.formatDate(c!.complaintDate),
                    assigned: true,
                    complaintId: c!.id
                  }));

                this.cases.set([...unassignedCases, ...assignedCases]);
                this.isLoading.set(false);
              }).catch(error => {
                console.error('Error loading assigned complaints:', error);
                this.cases.set(unassignedCases);
                this.isLoading.set(false);
              });
            },
            error: (error) => {
              console.error('Error loading assignments:', error);
              this.cases.set(unassignedCases);
              this.isLoading.set(false);
            }
          });
        } else {
          this.cases.set(unassignedCases);
          this.isLoading.set(false);
        }
      },
      error: (error) => {
        console.error('Error loading complaints:', error);
        this.cases.set([]);
        this.isLoading.set(false);
      }
    });
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
    return this.cases().filter(c => c.assigned === this.showAssigned());
  }

  assignCase(caseId: string): void {
    const caseItem = this.cases().find(c => c.id === caseId);
    if (!caseItem || caseItem.assigned) return;

    const currentUser = UserService.getCurrentUser();
    if (!currentUser) {
      console.error('No current user found');
      return;
    }

    const assignment = new CaseAssignment();
    assignment.complaintId = caseItem.complaintId;
    assignment.assignedTo = currentUser.id;
    assignment.assignedBy = currentUser.id; // Assuming self-assignment for now
    assignment.status = 'Pending';
    assignment.assignedAt = new Date().toISOString();

    this.caseAssignmentService.createCaseAssignment(assignment).subscribe({
      next: () => {
        // Update the case to assigned
        this.cases.update(cases => 
          cases.map(c => c.id === caseId ? { ...c, assigned: true } : c)
        );
      },
      error: (error) => {
        console.error('Error assigning case:', error);
        alert('Failed to assign case. Please try again.');
      }
    });
  }
}

