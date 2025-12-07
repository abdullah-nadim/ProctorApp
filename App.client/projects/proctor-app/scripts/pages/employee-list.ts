import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '@scripts/services/employee.service';
import { Employee } from '@models/employee';
import { EmployeeAddComponent } from './components/employee-add';

@Component({
  selector: 'employee-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeAddComponent],
  template: `
    <div class="employee-list-page d-flex flex-column px-5 py-2" style="min-height: 0;">
      <div class="card mb-4">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="mb-0">Employee List</h3>
            <div>
              <button class="btn btn-primary" (click)="openAddDialog()">Add Employee</button>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-end mb-3 mt-4">
        <form class="d-flex" style="width: auto;">
          <input class="form-control me-2" type="search" placeholder="Search Employee" aria-label="Search" [(ngModel)]="searchTerm" name="searchTerm" (keyup.enter)="onSearch()">
          <button type="button" class="btn btn-outline-primary" (click)="onSearch()">Search</button>
        </form>
      </div>

      <div class="card flex-grow-1">
        <div class="card-body">
          <div *ngIf="isLoading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2 text-muted">Loading employees...</p>
          </div>

          <div *ngIf="!isLoading">
            <div *ngIf="filteredEmployees.length > 0">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead class="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let emp of filteredEmployees" class="employee-row">
                      <td>
                        <div class="fw-bold">{{ emp.name || 'N/A' }}</div>
                      </td>
                      <td>
                        <span class="text-muted">{{ emp.phone || 'N/A' }}</span>
                      </td>
                      <td>
                        <div class="d-flex gap-2">
                          <button type="button" 
                                  class="btn btn-sm btn-outline-primary" 
                                  (click)="openEditDialog(emp)"
                                  title="Edit Employee">
                            <i class="fas fa-edit"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- No employees message -->
            <div *ngIf="filteredEmployees.length === 0 && !isLoading" class="text-center py-5">
              <i class="fas fa-users fa-3x text-muted mb-3"></i>
              <h5 class="text-muted">No employees found</h5>
              <p class="text-muted">Try adjusting your search criteria</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Modal -->
    <employee-add
      [show]="showEmployeeModal"
      [employee]="selectedEmployee"
      (closed)="onEmployeeModalClosed()"
      (saved)="onEmployeeSaved($event)">
    </employee-add>
  `,
  styleUrls: ['../../styles/pages/employee-list.scss']
})
export class EmployeeListPage implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  isLoading = false;
  searchTerm: string = '';
  showEmployeeModal = false;
  selectedEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadEmployees();
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredEmployees = this.employees;
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredEmployees = this.employees.filter(emp =>
        emp.name?.toLowerCase().includes(searchLower) ||
        emp.phone?.toLowerCase().includes(searchLower)
      );
    }
  }

  openAddDialog() {
    this.selectedEmployee = null;
    this.showEmployeeModal = true;
  }

  openEditDialog(emp: Employee) {
    this.selectedEmployee = emp;
    this.showEmployeeModal = true;
  }

  onEmployeeModalClosed(): void {
    this.showEmployeeModal = false;
    this.selectedEmployee = null;
  }

  onEmployeeSaved(result: any): void {
    if (result) {
      this.isLoading = true;
      if (this.selectedEmployee) {
        // Update existing employee
        this.employeeService.updateEmployee(this.selectedEmployee.id, result).subscribe({
          next: () => {
            this.loadEmployees();
            this.showEmployeeModal = false;
            this.selectedEmployee = null;
          },
          error: () => this.isLoading = false
        });
      } else {
        // Create new employee
        this.employeeService.createEmployee(result).subscribe({
          next: () => {
            this.loadEmployees();
            this.showEmployeeModal = false;
            this.selectedEmployee = null;
          },
          error: () => this.isLoading = false
        });
      }
    } else {
      this.showEmployeeModal = false;
      this.selectedEmployee = null;
    }
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.isLoading = false;
      }
    });
  }
} 