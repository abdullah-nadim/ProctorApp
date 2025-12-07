import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Case {
  id: string;
  subject: string;
  date: string;
  assigned: boolean;
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

  ngOnInit(): void {
    this.loadCases();
  }

  loadCases(): void {
    // Mock data - replace with actual API call
    const mockCases: Case[] = [
      { id: '#C0000005', subject: 'Vandalism', date: '01-05-25', assigned: false },
      { id: '#C0000004', subject: 'Drugs', date: 'Today', assigned: false },
      { id: '#C0000003', subject: 'Conflict', date: '30-04-25', assigned: true },
      { id: '#C0000002', subject: 'Cyber Bullying', date: '27-04-25', assigned: true }
    ];
    this.cases.set(mockCases);
  }

  filteredCases(): Case[] {
    return this.cases().filter(c => c.assigned === this.showAssigned());
  }

  assignCase(caseId: string): void {
    // TODO: Implement API call to assign case
    console.log('Assign case:', caseId);
    // Update the case to assigned
    this.cases.update(cases => 
      cases.map(c => c.id === caseId ? { ...c, assigned: true } : c)
    );
  }
}

