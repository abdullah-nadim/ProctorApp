import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserTypes } from '../models/user';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <!-- Login/Signup Area -->
    <div class="main-wrapper">
      <div class="container-box" id="container" [class.signup-mode]="isSignupMode()">
        <div class="form-container login-form">
          <form id="login-form" (ngSubmit)="onLogin($event)" #loginForm="ngForm">
            <h2>Sign In</h2>
            <div *ngIf="loginError()" class="error-message">
              {{ loginError() }}
            </div>
            <input 
              type="email" 
              placeholder="Email" 
              required 
              [(ngModel)]="loginFormData.email" 
              name="loginEmail"
              [disabled]="isLoading()" />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              [(ngModel)]="loginFormData.password" 
              name="loginPassword"
              [disabled]="isLoading()" />
            <button type="submit" [disabled]="!loginForm.valid || isLoading()">
              {{ isLoading() ? 'Logging in...' : 'Login' }}
            </button>
            <div class="signup-link">
              <p>Don't have an account? <a href="#" (click)="toggleMode($event)" class="signup-link-text">Sign Up</a></p>
            </div>
          </form>
        </div>

        <div class="form-container signup-form">
          <form id="signup-form" (ngSubmit)="onSignup($event)" #signupForm="ngForm">
            <h2>Create Account</h2>
            <div *ngIf="signupError()" class="error-message">
              <div *ngFor="let error of signupErrors()">{{ error }}</div>
            </div>
            <input 
              type="text" 
              placeholder="Full Name" 
              required 
              [(ngModel)]="signupFormData.fullName" 
              name="signupName"
              [disabled]="isLoading()" />
            <input 
              type="email" 
              placeholder="Email" 
              required 
              [(ngModel)]="signupFormData.email" 
              name="signupEmail"
              [disabled]="isLoading()" />
            <input 
              type="text" 
              placeholder="Username (optional)" 
              [(ngModel)]="signupFormData.userName" 
              name="signupUserName"
              [disabled]="isLoading()" />
            <select 
              [(ngModel)]="signupFormData.userType" 
              name="signupUserType"
              [disabled]="isLoading()">
              <option [value]="UserTypes.Student">Student</option>
              <option [value]="UserTypes.Proctor">Proctor</option>
              <option [value]="UserTypes.CoordinationOfficer">Coordination Officer</option>
              <option [value]="UserTypes.AssistantProctor">Assistant Proctor</option>
            </select>
            <input 
              type="password" 
              placeholder="Password" 
              required 
              [(ngModel)]="signupFormData.password" 
              name="signupPassword"
              minlength="6"
              [disabled]="isLoading()" />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              required 
              [(ngModel)]="signupFormData.confirmPassword" 
              name="signupConfirmPassword"
              [disabled]="isLoading()" />
            <button type="submit" [disabled]="!signupForm.valid || isLoading() || signupFormData.password !== signupFormData.confirmPassword">
              {{ isLoading() ? 'Signing up...' : 'Sign Up' }}
            </button>
            <div class="login-link">
              <p>Already have an account? <a href="#" (click)="toggleMode($event)" class="login-link-text">Sign In</a></p>
            </div>
          </form>
        </div>

        <div class="overlay-container">
          <h1 id="overlay-title">{{ isSignupMode() ? 'Hello!' : 'Welcome Back!' }}</h1>
          <p id="overlay-text">{{ isSignupMode() ? 'Enter your personal details and start your journey with us' : 'To keep connected with us please login with your personal info' }}</p>
          <button id="toggle-btn" (click)="toggleMode($event)">{{ isSignupMode() ? 'Sign In' : 'Sign Up' }}</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/login.scss']
})
export class LoginPage {
  isSignupMode = signal(false);
  isLoading = signal(false);
  loginError = signal('');
  signupError = signal('');
  signupErrors = signal<string[]>([]);
  UserTypes = UserTypes;
  
  loginFormData = {
    email: '',
    password: ''
  };
  
  signupFormData = {
    fullName: '',
    email: '',
    userName: '',
    userType: UserTypes.Student,
    password: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMode(event: Event) {
    event.preventDefault();
    this.isSignupMode.update(value => !value);
    this.loginError.set('');
    this.signupError.set('');
    this.signupErrors.set([]);
  }

  onLogin(event: Event) {
    event.preventDefault();
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.loginError.set('');

    this.authService.login(this.loginFormData.email, this.loginFormData.password).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.loginError.set(response.errors.join(', ') || 'Login failed. Please try again.');
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Login error:', error);
        this.loginError.set(error.error?.errors?.join(', ') || 'An error occurred during login. Please try again.');
      }
    });
  }

  onSignup(event: Event) {
    event.preventDefault();
    if (this.isLoading()) return;

    if (this.signupFormData.password !== this.signupFormData.confirmPassword) {
      this.signupError.set('Passwords do not match');
      return;
    }

    if (this.signupFormData.password.length < 6) {
      this.signupError.set('Password must be at least 6 characters long');
      return;
    }

    this.isLoading.set(true);
    this.signupError.set('');
    this.signupErrors.set([]);

    this.authService.register({
      email: this.signupFormData.email,
      password: this.signupFormData.password,
      fullName: this.signupFormData.fullName,
      userName: this.signupFormData.userName || this.signupFormData.email,
      userType: this.signupFormData.userType
    }).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          // Switch to login mode after successful registration
          this.isSignupMode.set(false);
          this.signupError.set('');
          alert('Registration successful! Please login with your credentials.');
        } else {
          this.signupErrors.set(response.errors);
          this.signupError.set(response.errors.join(', '));
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Signup error:', error);
        const errors = error.error?.errors || ['An error occurred during registration. Please try again.'];
        this.signupErrors.set(errors);
        this.signupError.set(errors.join(', '));
      }
    });
  }
}
