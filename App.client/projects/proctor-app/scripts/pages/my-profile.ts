import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../models/user';

@Component({
  selector: 'my-profile-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Profile Section -->
    <div class="profile-section">
      <div class="profile-container">
        <h1 class="profile-title">My Profile</h1>
        
        <div class="profile-card">
          <!-- Profile Header -->
          <div class="profile-header">
            <div class="profile-avatar">
              <div class="avatar-image">
                <span>{{ getUserInitials() }}</span>
              </div>
            </div>
            <div class="profile-info">
              <h2 class="profile-name">{{ getUserName() }}</h2>
              <button class="btn-upload" (click)="uploadPhoto()">
                <i class="fas fa-camera"></i> Upload Photo
              </button>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="action-buttons">
            <!-- Account Information Button -->
            <button class="action-btn" routerLink="/dashboard/my-profile/account-information">
              <div class="action-icon">
                <i class="fas fa-user"></i>
              </div>
              <div class="action-content">
                <h3 class="action-title">Account Information</h3>
                <p class="action-subtext">Change your account information</p>
              </div>
            </button>
            
            <!-- Password Button -->
            <button class="action-btn" routerLink="/dashboard/my-profile/change-password">
              <div class="action-icon">
                <i class="fas fa-lock"></i>
              </div>
              <div class="action-content">
                <h3 class="action-title">Password</h3>
                <p class="action-subtext">Change your password</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/my-profile.scss']
})
export class MyProfilePage {
  getUserName(): string {
    return UserService.getCurrentUser()?.name || 'User';
  }

  getUserInitials(): string {
    const name = this.getUserName();
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  uploadPhoto(): void {
    // Implement photo upload
    console.log('Upload photo');
  }
}

