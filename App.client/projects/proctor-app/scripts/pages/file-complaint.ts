import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplaintService } from '../services/complaint.service';
import { ComplaintCategoryService } from '../services/complaint-category.service';
import { Complaint } from '../models/complaint';
import { ComplaintCategory } from '../models/complaint-category';
import { Priority } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'file-complaint-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Complaint Form Section -->
    <div class="complaint-form-section">
      <div class="form-container">
        <h2 class="form-title">File a Complaint</h2>

        <!-- Stepper -->
        <div class="stepper">
          <div class="step" [class.active]="currentStep() === 1">
            <div class="circle">1</div>
            <div class="label">Complaint Details</div>
          </div>
          <div class="step" [class.active]="currentStep() === 2">
            <div class="circle">2</div>
            <div class="label">Accused & Evidence</div>
          </div>
        </div>
        
        <form class="complaint-form" (ngSubmit)="onSubmit()" #complaintForm="ngForm">
          <!-- STEP 1 -->
          <div *ngIf="currentStep() === 1">
            <!-- Row 1: Select Category -->
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="category">Select Category <span class="required">*</span></label>
                  <select class="form-control" id="category" [(ngModel)]="formStep1.categoryId" name="categoryId" required>
                    <option [ngValue]="null" disabled>Select a category</option>
                    <option *ngFor="let category of categories()" [ngValue]="category.id">{{ category.name }}</option>
                  </select>
                </div>
              </div>
            </div>
            
            <!-- Row 2: Short Description -->
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="description">Short Description <span class="required">*</span></label>
                  <textarea 
                    class="form-control" 
                    id="description" 
                    rows="3" 
                    placeholder="Briefly describe your complaint" 
                    [(ngModel)]="formStep1.description"
                    name="description"
                    required></textarea>
                </div>
              </div>
            </div>
            
            <!-- Row 3: Name and Gender -->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="name">Name of the Complainant <span class="required">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="name" 
                    placeholder="Enter your full name"
                    [(ngModel)]="formStep1.name"
                    name="name"
                    required>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="gender">Gender <span class="required">*</span></label>
                  <select class="form-control" id="gender" [(ngModel)]="formStep1.gender" name="gender" required>
                    <option value="" disabled>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>
            
            <!-- Row 4: Student ID and Department -->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="student-id">Student ID <span class="required">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="student-id" 
                    placeholder="Enter your student ID"
                    [(ngModel)]="formStep1.organizationId"
                    name="studentId"
                    required>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="department">Department <span class="required">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="department" 
                    placeholder="Enter your department"
                    [(ngModel)]="formStep1.department"
                    name="department"
                    required>
                </div>
              </div>
            </div>
            
            <!-- Row 5: Contact No and Advisor's Name -->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="contact">Contact No. <span class="required">*</span></label>
                  <input 
                    type="tel" 
                    class="form-control" 
                    id="contact" 
                    placeholder="Enter your contact number"
                    [(ngModel)]="formStep1.contact"
                    name="contact"
                    required>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="advisor">Advisor's Name <span class="required">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="advisor" 
                    placeholder="Enter your advisor's name"
                    [(ngModel)]="formStep1.advisor"
                    name="advisor"
                    required>
                </div>
              </div>
            </div>
            
            <!-- Row 6: Location and Incident Date -->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="location">Location</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="location" 
                    placeholder="Enter incident location"
                    [(ngModel)]="formStep1.location"
                    name="location">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="incidentDate">Incident Date</label>
                  <input 
                    type="date" 
                    class="form-control" 
                    id="incidentDate" 
                    [(ngModel)]="formStep1.incidentDate"
                    name="incidentDate">
                </div>
              </div>
            </div>

            <div class="form-submit spaced">
              <button type="button" class="btn-next" (click)="goToStep2()" [disabled]="isLoading()">
                Next
              </button>
            </div>
          </div>

          <!-- STEP 2 -->
          <div *ngIf="currentStep() === 2">
            <!-- Row 1: Accused's Name and Student ID -->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="accused-name">Accused's Name <span class="required">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="accused-name" 
                    placeholder="Enter accused's name" 
                    [(ngModel)]="formStep2.accusedName"
                    name="accusedName"
                    required>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="accused-student-id">Accused Student ID</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="accused-student-id" 
                    placeholder="Enter accused's student ID"
                    [(ngModel)]="formStep2.accusedStudentId"
                    name="accusedStudentId">
                </div>
              </div>
            </div>

            <!-- Row 2: Department and Contact No -->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="accused-department">Accused Department</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="accused-department" 
                    placeholder="Enter accused's department"
                    [(ngModel)]="formStep2.accusedDepartment"
                    name="accusedDepartment">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="accused-contact">Accused Contact</label>
                  <input 
                    type="tel" 
                    class="form-control" 
                    id="accused-contact" 
                    placeholder="Enter accused's contact number"
                    [(ngModel)]="formStep2.accusedContact"
                    name="accusedContact">
                </div>
              </div>
            </div>

            <!-- Row 3: Evidence Link -->
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="evidence">Evidence against the accused (Drive link or description)</label>
                  <textarea 
                    class="form-control" 
                    id="evidence" 
                    rows="3" 
                    placeholder="Paste your Google Drive link or describe the evidence"
                    [(ngModel)]="formStep2.evidenceDetails"
                    name="evidenceDetails"></textarea>
                </div>
              </div>
            </div>

            <div class="form-submit spaced between">
              <button type="button" class="btn-outline" (click)="currentStep.set(1)" [disabled]="isLoading()">Back</button>
              <button type="submit" class="btn-next" [disabled]="isLoading()">
                {{ isLoading() ? 'Submitting...' : 'Submit' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/file-complaint.scss']
})
export class FileComplaintPage implements OnInit {
  isLoading = signal(false);
  categories = signal<ComplaintCategory[]>([]);
  currentStep = signal<1 | 2>(1);
  formStep1 = {
    categoryId: null as number | null,
    description: '',
    name: '',
    gender: '',
    organizationId: '',
    department: '',
    contact: '',
    advisor: '',
    location: '',
    incidentDate: ''
  };
  formStep2 = {
    accusedName: '',
    accusedStudentId: '',
    accusedDepartment: '',
    accusedContact: '',
    evidenceDetails: ''
  };

  constructor(
    private complaintService: ComplaintService,
    private complaintCategoryService: ComplaintCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadUserData();
  }

  loadCategories(): void {
    this.complaintCategoryService.getAllComplaintCategories().subscribe({
      next: (categories: ComplaintCategory[]) => {
        this.categories.set(categories);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadUserData(): void {
    const currentUser = UserService.getCurrentUser();
    if (currentUser) {
      this.formStep1.name = currentUser.name || currentUser.fullName;
      this.formStep1.organizationId = currentUser.organizationId || '';
      this.formStep1.department = currentUser.department || '';
      this.formStep1.contact = currentUser.phone || '';
      this.formStep1.advisor = currentUser.advisorName || '';
    }
  }

  goToStep2(): void {
    if (!this.formStep1.categoryId || !this.formStep1.description || !this.formStep1.name || !this.formStep1.gender || !this.formStep1.organizationId || !this.formStep1.department || !this.formStep1.contact || !this.formStep1.advisor) {
      alert('Please fill in all required fields.');
      return;
    }
    this.currentStep.set(2);
  }

  onSubmit(): void {
    if (this.isLoading()) return;
    
    const currentUser = UserService.getCurrentUser();
    if (!currentUser) {
      alert('Please log in to file a complaint');
      return;
    }

    this.isLoading.set(true);

    const complaint: Complaint = {
      id: 0,
      title: this.getCategoryName(this.formStep1.categoryId!) || 'Complaint',
      description: this.formStep1.description,
      complaintDate: new Date().toISOString(),
      status: 'Pending',
      priority: Priority.Medium,
      complainantId: currentUser.id,
      complainantName: this.formStep1.name,
      complainantDetails: `${this.formStep1.gender}, Student ID: ${this.formStep1.organizationId}`,
      complainantStudentId: this.formStep1.organizationId,
      accusedStudentId: this.parseAccusedId(this.formStep2.accusedStudentId),
      accusedName: this.formStep2.accusedName || null,
      accusedDetails: this.buildAccusedDetails(),
      categoryId: this.formStep1.categoryId,
      location: this.formStep1.location || '',
      incidentDate: this.formStep1.incidentDate || null,
      createdOn: '',
      modifiedOn: '',
      complainant: null,
      category: null,
      evidence: [],
      caseAssignments: [],
      explanations: [],
      caseFiles: [],
      meetings: []
    };

    this.complaintService.createComplaint(complaint).subscribe({
      next: () => {
        this.isLoading.set(false);
        alert('Complaint submitted successfully!');
        this.router.navigate(['/dashboard/my-complaints']);
      },
      error: (error) => {
        console.error('Error submitting complaint:', error);
        this.isLoading.set(false);
        alert('Failed to submit complaint. Please try again.');
      }
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories().find(c => c.id === categoryId);
    return category?.name || '';
  }

  private parseAccusedId(value: string): number | null {
    if (!value) return null;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? null : parsed;
  }

  private buildAccusedDetails(): string | null {
    const parts: string[] = [];
    if (this.formStep2.accusedDepartment) {
      parts.push(`Department: ${this.formStep2.accusedDepartment}`);
    }
    if (this.formStep2.accusedContact) {
      parts.push(`Contact: ${this.formStep2.accusedContact}`);
    }
    if (this.formStep2.evidenceDetails) {
      parts.push(`Evidence: ${this.formStep2.evidenceDetails}`);
    }
    return parts.length ? parts.join(' | ') : null;
  }
}

