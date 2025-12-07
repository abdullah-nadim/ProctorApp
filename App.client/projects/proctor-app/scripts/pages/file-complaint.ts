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
        <h2 class="form-title">Fill the form</h2>
        
        <form class="complaint-form" (ngSubmit)="onSubmit()" #complaintForm="ngForm">
          <!-- Row 1: Select Subject -->
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="category">Select Category <span class="required">*</span></label>
                <select class="form-control" id="category" [(ngModel)]="formData.categoryId" name="categoryId" required>
                  <option [ngValue]="null" disabled selected>Select a category</option>
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
                  [(ngModel)]="formData.description"
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
                  [(ngModel)]="formData.name"
                  name="name"
                  required>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="gender">Gender <span class="required">*</span></label>
                <select class="form-control" id="gender" [(ngModel)]="formData.gender" name="gender" required>
                  <option value="" disabled selected>Select your gender</option>
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
                  [(ngModel)]="formData.studentId"
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
                  [(ngModel)]="formData.department"
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
                  [(ngModel)]="formData.contact"
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
                  [(ngModel)]="formData.advisor"
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
                  [(ngModel)]="formData.location"
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
                  [(ngModel)]="formData.incidentDate"
                  name="incidentDate">
              </div>
            </div>
          </div>
          
          <!-- Submit Button -->
          <div class="form-submit">
            <button type="submit" class="btn-next" [disabled]="!complaintForm.valid || isLoading()">
              {{ isLoading() ? 'Submitting...' : 'Next' }}
            </button>
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
  formData = {
    categoryId: null as number | null,
    description: '',
    name: '',
    gender: '',
    studentId: '',
    department: '',
    contact: '',
    advisor: '',
    location: '',
    incidentDate: ''
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
      this.formData.name = currentUser.name || currentUser.fullName;
      this.formData.studentId = currentUser.userName || '';
      this.formData.department = currentUser.department || '';
      this.formData.contact = currentUser.phone || '';
      this.formData.advisor = currentUser.advisorName || '';
    }
  }

  onSubmit(): void {
    if (this.isLoading()) return;
    
    const currentUser = UserService.getCurrentUser();
    if (!currentUser) {
      alert('Please log in to file a complaint');
      return;
    }

    if (!this.formData.categoryId || !this.formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    this.isLoading.set(true);

    const complaint: Complaint = {
      id: 0,
      title: this.getCategoryName(this.formData.categoryId!) || 'Complaint',
      description: this.formData.description,
      complaintDate: new Date().toISOString(),
      status: 'Pending',
      priority: Priority.Medium,
      complainantId: currentUser.id,
      complainantName: this.formData.name,
      complainantDetails: `${this.formData.gender}, Student ID: ${this.formData.studentId}`,
      complainantStudentId: this.formData.studentId,
      accusedStudentId: null,
      accusedName: null,
      accusedDetails: null,
      categoryId: this.formData.categoryId,
      location: this.formData.location || '',
      incidentDate: this.formData.incidentDate || null,
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
}

