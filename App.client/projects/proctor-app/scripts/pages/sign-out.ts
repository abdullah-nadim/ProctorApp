import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'sign-out-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sign-out-section">
      <div class="sign-out-container">
        <div class="sign-out-card">
          <h1 class="sign-out-title">Sign Out</h1>
          <p class="sign-out-message">Are you sure you want to sign out?</p>
          <div class="sign-out-actions">
            <button class="btn btn-secondary" (click)="cancel()" [disabled]="isLoading()">Cancel</button>
            <button class="btn btn-primary" (click)="signOut()" [disabled]="isLoading()">
              {{ isLoading() ? 'Signing out...' : 'Sign Out' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/sign-out.scss']
})
export class SignOutPage {
  isLoading = signal(false);

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }

  signOut(): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.authService.logout().subscribe({
      next: () => {
        this.isLoading.set(false);
        // Navigation is handled in auth service
      },
      error: (error) => {
        console.error('Logout error:', error);
        this.isLoading.set(false);
        // Still clear local user and navigate even if API call fails
        UserService.clearCurrentUser();
        this.router.navigate(['/login']);
      }
    });
  }
}

