import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComplaintService } from '../services/complaint.service';
import { CaseAssignmentService } from '../services/case-assignment.service';
import { Complaint } from '../models/complaint';
import { CaseAssignment } from '../models/case-assignment';
import { UserService } from '../services/user.service';
import { User, UserTypes, CaseAssignmentStatus, ComplaintStatus } from '../models/user';

interface Case {
  id: number;
  subject: string;
  date: string;
  assigned: boolean;
  complaintId: number;
}

@Component({
  selector: 'assign-cases-page',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, RouterModule, FormsModule],
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
                    [routerLink]="['/dashboard/case-details', case.complaintId]">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Assignment Modal -->
    <div class="modal-backdrop" *ngIf="showModal()">
      <div class="modal">
        <h3>Assign Case</h3>

        <div class="form-group">
          <label>Assign To</label>
          <select [(ngModel)]="assignmentForm.userId" name="userId" required>
            <option [ngValue]="null" disabled>Select a user</option>
            <option *ngFor="let user of users()" [ngValue]="user.id">
              {{ getUserDisplayName(user) }} - {{ getUserTypeDisplay(user.userType) }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Deadline</label>
          <input type="date" [(ngModel)]="assignmentForm.deadline" name="deadline" />
        </div>

        <div class="form-group">
          <label>Note</label>
          <textarea rows="3" [(ngModel)]="assignmentForm.note" name="note" placeholder="Add a note"></textarea>
        </div>

        <div class="modal-actions">
          <button class="btn-secondary" type="button" (click)="closeModal()">Cancel</button>
          <button class="btn-primary" type="button" (click)="submitAssignment()">Submit</button>
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
  users = signal<User[]>([]);
  showModal = signal(false);
  selectedCaseId = signal<number | null>(null);
  assignmentForm = {
    userId: null as number | null,
    userType: 'Proctor',
    deadline: '',
    note: ''
  };

  constructor(
    private complaintService: ComplaintService,
    private caseAssignmentService: CaseAssignmentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadCases();
    this.loadUsers();
  }

  loadCases(): void {
    this.isLoading.set(true);
    
    // Load unassigned complaints
    this.complaintService.getUnassignedComplaints().subscribe({
      next: (complaints: Complaint[]) => {
        const unassignedCases = complaints.map(c => ({
          id: c.id,
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
                    id: c!.id,
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

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        // Filter out Student users and inactive users
        const filtered = users.filter(u => 
          u.userType !== UserTypes.Student && 
          u.isActive !== false
        );
        this.users.set(filtered);
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.users.set([]);
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

  assignCase(caseId: number): void {
    const caseItem = this.cases().find(c => c.id === caseId);
    if (!caseItem || caseItem.assigned) return;
    this.selectedCaseId.set(caseId);
    const availableUsers = this.users();
    const defaultUser = availableUsers.length > 0 ? availableUsers[0] : null;
    this.assignmentForm = {
      userId: defaultUser ? defaultUser.id : null,
      userType: defaultUser ? defaultUser.userType : '',
      deadline: '',
      note: ''
    };
    this.showModal.set(true);
  }

  submitAssignment(): void {
    const caseId = this.selectedCaseId();
    if (caseId === null || !this.assignmentForm.userId) {
      alert('Please select a user to assign the case to.');
      return;
    }

    const caseItem = this.cases().find(c => c.id === caseId);
    if (!caseItem || caseItem.assigned) return;

    const currentUser = UserService.getCurrentUser();
    if (!currentUser) {
      console.error('No current user found');
      alert('You must be logged in to assign cases.');
      return;
    }

    const selectedUser = this.users().find(u => u.id === this.assignmentForm.userId);
    if (!selectedUser) {
      alert('Selected user not found.');
      return;
    }

    const assignment = new CaseAssignment();
    assignment.complaintId = caseItem.complaintId;
    assignment.assignedTo = this.assignmentForm.userId;
    assignment.assignedBy = currentUser.id;
    assignment.status = CaseAssignmentStatus.InProgress; // Using InProgress as "Assigned" status
    assignment.assignedAt = new Date().toISOString();
    assignment.deadline = this.assignmentForm.deadline ? new Date(this.assignmentForm.deadline).toISOString() : null;
    assignment.notes = this.assignmentForm.note || null;

    // First, update the complaint status to "Assigned"
    this.complaintService.getComplaintById(caseItem.complaintId).subscribe({
      next: (complaint: Complaint) => {
        // Update complaint status to Assigned
        complaint.status = ComplaintStatus.Assigned;
        
        // Update the complaint table
        this.complaintService.updateComplaint(complaint).subscribe({
          next: () => {
            // After complaint is updated, create the case assignment
            this.caseAssignmentService.createCaseAssignment(assignment).subscribe({
              next: () => {
                // Update the case to assigned in UI
                this.cases.update(cases => 
                  cases.map(c => c.id === caseId ? { ...c, assigned: true } : c)
                );
                this.closeModal();
              },
              error: (error) => {
                console.error('Error creating case assignment:', error);
                alert('Case assignment created but failed to save. Please try again.');
              }
            });
          },
          error: (error) => {
            console.error('Error updating complaint status:', error);
            alert('Failed to update complaint status. Please try again.');
          }
        });
      },
      error: (error) => {
        console.error('Error loading complaint:', error);
        alert('Failed to load complaint. Please try again.');
      }
    });
  }

  closeModal(): void {
    this.showModal.set(false);
    this.selectedCaseId.set(null);
  }

  getUserDisplayName(user: User): string {
    return user.name || user.fullName || user.userName || user.email || 'Unknown User';
  }

  getUserTypeDisplay(userType: string): string {
    // Format user type for display
    switch (userType) {
      case UserTypes.Proctor:
        return 'Proctor';
      case UserTypes.CoordinationOfficer:
        return 'Deputy Proctor';
      case UserTypes.AssistantProctor:
        return 'Assistant Proctor';
      case UserTypes.Admin:
        return 'Admin';
      default:
        return userType;
    }
  }
}

