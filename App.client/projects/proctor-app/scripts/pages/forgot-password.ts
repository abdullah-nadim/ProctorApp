import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'forgot-password-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <!-- Top shell pulled from the static pages -->
    <div class="page-shell">
      <div class="auth-container">
        <div class="auth-card">
          <div class="login-panel">
            <div class="login-content">
              <h1 class="login-title">Forgot Password</h1>
              <p class="forgot-password-text">Enter your email address and we'll send you a link to reset your password.</p>

              <form class="login-form" (ngSubmit)="onSubmit($event)" #forgotPasswordForm="ngForm">
                <div *ngIf="errorMessage()" class="error-message">
                  {{ errorMessage() }}
                </div>
                <div *ngIf="successMessage()" class="success-message">
                  {{ successMessage() }}
                </div>
                <div class="input-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Type your e-mail address"
                    required
                    [(ngModel)]="email"
                    name="email"
                    [disabled]="isLoading()" />
                </div>

                <button type="submit" class="login-button" [disabled]="!forgotPasswordForm.valid || isLoading()">
                  {{ isLoading() ? 'Sending...' : 'Send Reset Link' }}
                </button>

                <div class="back-to-login">
                  <a routerLink="/login" class="forgot-password">Back to Login</a>
                </div>
              </form>
            </div>
          </div>

          <div class="welcome-panel">
            <div class="welcome-content">
              <h2 class="welcome-title">Reset Password</h2>
              <p class="welcome-text">Don't worry! We'll help you reset your password and get back to your account.</p>
              <button class="signup-button" (click)="goToLogin()">Back to Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/login.scss']
})
export class ForgotPasswordPage {
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  email = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.successMessage.set('Password reset link has been sent to your email address. Please check your inbox.');
          this.email = '';
        } else {
          this.errorMessage.set(response.message || 'Failed to send reset link. Please try again.');
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Forgot password error:', error);
        this.errorMessage.set(error.error?.message || 'An error occurred. Please try again.');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

