import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'change-password-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="change-password-section">
      <div class="change-password-container">
        <h1 class="page-title">Change Password</h1>
        
        <div class="form-card">
          <form (ngSubmit)="onSubmit()" #passwordForm="ngForm">
            <div class="form-group">
              <label class="form-label">Current Password</label>
              <input 
                type="password" 
                class="form-control" 
                [(ngModel)]="formData.currentPassword"
                name="currentPassword"
                required>
            </div>
            
            <div class="form-group">
              <label class="form-label">New Password</label>
              <input 
                type="password" 
                class="form-control" 
                [(ngModel)]="formData.newPassword"
                name="newPassword"
                required
                minlength="8">
            </div>
            
            <div class="form-group">
              <label class="form-label">Confirm New Password</label>
              <input 
                type="password" 
                class="form-control" 
                [(ngModel)]="formData.confirmPassword"
                name="confirmPassword"
                required>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" routerLink="/dashboard/my-profile">Cancel</button>
              <button type="submit" class="btn btn-primary" [disabled]="!passwordForm.valid || isLoading() || !passwordsMatch()">
                {{ isLoading() ? 'Changing...' : 'Change Password' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/change-password.scss']
})
export class ChangePasswordPage {
  isLoading = signal(false);
  formData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  passwordsMatch(): boolean {
    return this.formData.newPassword === this.formData.confirmPassword;
  }

  onSubmit(): void {
    if (this.isLoading() || !this.passwordsMatch()) return;
    
    this.isLoading.set(true);
    // TODO: Implement API call to change password
    setTimeout(() => {
      this.isLoading.set(false);
      // Show success message and redirect
    }, 1000);
  }
}

