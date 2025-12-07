import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '@models/employee';

@Component({
  selector: 'employee-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" *ngIf="show" (click)="onCancel()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">{{ employeeData.id ? 'Edit Employee' : 'Add Employee' }}</h2>
          <button type="button" class="btn-close" (click)="onCancel()" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form (ngSubmit)="onSubmit()" #employeeForm="ngForm">
            <div class="form-group mb-3">
              <label for="name" class="form-label">Name</label>
              <input 
                type="text" 
                class="form-control" 
                id="name" 
                name="name" 
                [(ngModel)]="employeeData.name" 
                required 
              />
            </div>
            <div class="form-group mb-3">
              <label for="phone" class="form-label">Phone</label>
              <input 
                type="text" 
                class="form-control" 
                id="phone" 
                name="phone" 
                [(ngModel)]="employeeData.phone" 
                required 
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" (click)="onSubmit()" [disabled]="employeeForm.invalid">
            {{ employeeData.id ? 'Update' : 'Add' }} Employee
          </button>
          <div class="flex-grow-1"></div>
          <button type="button" class="btn btn-outline-secondary" (click)="onCancel()">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../../styles/components/employee-add.scss']
})
export class EmployeeAddComponent {
  @Input() show: boolean = false;
  @Input() employee: Employee | null = null;
  
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<Employee>();

  get employeeData(): Employee {
    return this.employee || new Employee();
  }

  onCancel(): void {
    this.closed.emit();
  }

  onSubmit() {
    if (this.employeeData) {
      this.saved.emit(this.employeeData);
    }
  }
} 