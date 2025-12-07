import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
                <label for="subject">Select Subject <span class="required">*</span></label>
                <select class="form-control" id="subject" [(ngModel)]="formData.subject" name="subject" required>
                  <option value="" disabled selected>Select a subject</option>
                  <option value="conflict">Conflict</option>
                  <option value="ragging">Ragging</option>
                  <option value="bullying">Bullying</option>
                  <option value="drugs">Drugs</option>
                  <option value="cyberbullying">Cyberbullying</option>
                  <option value="sexual-harassment">Sexual harassment</option>
                  <option value="others">Others</option>
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
export class FileComplaintPage {
  isLoading = signal(false);
  formData = {
    subject: '',
    description: '',
    name: '',
    gender: '',
    studentId: '',
    department: '',
    contact: '',
    advisor: ''
  };

  onSubmit(): void {
    if (this.isLoading()) return;
    
    this.isLoading.set(true);
    // TODO: Implement API call to submit complaint
    // For now, navigate to next step or my-complaints
    setTimeout(() => {
      this.isLoading.set(false);
      // Navigate to next form step or my-complaints page
      // this.router.navigate(['/dashboard/my-complaints']);
    }, 1000);
  }
}

