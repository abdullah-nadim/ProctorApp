import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../models/user';

@Component({
  selector: 'account-information-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="account-information-section">
      <div class="account-information-container">
        <h1 class="page-title">Account Information</h1>
        
        <div class="form-card">
          <form (ngSubmit)="onSubmit()" #accountForm="ngForm">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input 
                type="text" 
                class="form-control" 
                [(ngModel)]="formData.name"
                name="name"
                required>
            </div>
            
            <div class="form-group">
              <label class="form-label">Email</label>
              <input 
                type="email" 
                class="form-control" 
                [(ngModel)]="formData.email"
                name="email"
                required>
            </div>
            
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input 
                type="tel" 
                class="form-control" 
                [(ngModel)]="formData.phone"
                name="phone">
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" routerLink="/dashboard/my-profile">Cancel</button>
              <button type="submit" class="btn btn-primary" [disabled]="!accountForm.valid || isLoading()">
                {{ isLoading() ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/account-information.scss']
})
export class AccountInformationPage implements OnInit {
  isLoading = signal(false);
  formData = {
    name: '',
    email: '',
    phone: ''
  };

  ngOnInit(): void {
    const user = UserService.getCurrentUser();
    if (user) {
      this.formData.name = user.name;
      this.formData.email = user.email;
    }
  }

  onSubmit(): void {
    if (this.isLoading()) return;
    
    this.isLoading.set(true);
    // TODO: Implement API call to update account information
    setTimeout(() => {
      this.isLoading.set(false);
      // Show success message
    }, 1000);
  }
}

