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
    <!-- Top shell pulled from the static pages -->
    <div class="page-shell" [class.signup-mode]="isSignupMode()">
      <div class="auth-container">
        <div class="auth-card" *ngIf="!isSignupMode(); else signupView">
          <div class="login-panel">
            <div class="login-content">
              <h1 class="login-title">Log in</h1>

              <form class="login-form" (ngSubmit)="onLogin($event)" #loginForm="ngForm">
                <div *ngIf="loginError()" class="error-message">
                  {{ loginError() }}
                </div>
                <div class="input-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Type your e-mail address"
                    required
                    [(ngModel)]="loginFormData.email"
                    name="loginEmail"
                    [disabled]="isLoading()" />
                </div>

                <div class="input-group password-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    required
                    [(ngModel)]="loginFormData.password"
                    name="loginPassword"
                    [disabled]="isLoading()" />
                </div>

                <div class="form-options">
                  <div class="remember-me">
                    <input type="checkbox" id="remember" disabled />
                    <label for="remember">Remember Me</label>
                  </div>
                  <a routerLink="/forgot-password" class="forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" class="login-button" [disabled]="!loginForm.valid || isLoading()">
                  {{ isLoading() ? 'Logging in...' : 'Log in' }}
                </button>
              </form>
            </div>
          </div>

          <div class="welcome-panel">
            <div class="welcome-content">
              <h2 class="welcome-title">Welcome Back!</h2>
              <p class="welcome-text">To keep connected with us please login with your personal info.</p>
              <button class="signup-button" (click)="switchToSignup($event)">Sign up</button>
            </div>
          </div>
        </div>

        <ng-template #signupView>
          <div class="signup-card">
            <div class="welcome-panel">
              <div class="welcome-content">
                <h2 class="welcome-title">Hello!</h2>
                <p class="welcome-text">Enter your personal details and start your journey with us</p>
                <button class="login-button" (click)="switchToLogin($event)">Login</button>
              </div>
            </div>

            <div class="signup-panel">
              <div class="signup-content">
                <h1 class="signup-title">Create Account</h1>

                <form class="signup-form" (ngSubmit)="onSignup($event)" #signupForm="ngForm">
                  <div *ngIf="signupError()" class="error-message">
                    <div *ngFor="let error of signupErrors()">{{ error }}</div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Choose your role:</label>
                    <div class="select-container">
                      <select
                        class="role-select"
                        [(ngModel)]="signupFormData.userType"
                        name="signupUserType"
                        [disabled]="isLoading()">
                        <option [value]="UserTypes.Student">Student</option>
                        <option [value]="UserTypes.CoordinationOfficer">Co-ordination Officer</option>
                        <option [value]="UserTypes.Proctor">Proctor</option>
                        <option [value]="UserTypes.AssistantProctor">Assistant Proctor</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter your full name"
                      required
                      [(ngModel)]="signupFormData.fullName"
                      name="signupName"
                      [disabled]="isLoading()" />
                  </div>

                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Enter your e-mail address"
                      required
                      [(ngModel)]="signupFormData.email"
                      name="signupEmail"
                      [disabled]="isLoading()" />
                  </div>

                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username (optional)"
                      [(ngModel)]="signupFormData.userName"
                      name="signupUserName"
                      [disabled]="isLoading()" />
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <div class="password-group">
                          <input
                            type="password"
                            class="form-control"
                            placeholder="Password"
                            required
                            minlength="6"
                            [(ngModel)]="signupFormData.password"
                            name="signupPassword"
                            [disabled]="isLoading()" />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <div class="password-group">
                          <input
                            type="password"
                            class="form-control"
                            placeholder="Confirm Password"
                            required
                            [(ngModel)]="signupFormData.confirmPassword"
                            name="signupConfirmPassword"
                            [disabled]="isLoading()" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="signup-button"
                    [disabled]="!signupForm.valid || isLoading() || signupFormData.password !== signupFormData.confirmPassword">
                    {{ isLoading() ? 'Signing up...' : 'Sign Up' }}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </ng-template>
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

  switchToSignup(event: Event) {
    event.preventDefault();
    this.isSignupMode.set(true);
    this.loginError.set('');
  }

  switchToLogin(event: Event) {
    event.preventDefault();
    this.isSignupMode.set(false);
    this.signupError.set('');
    this.signupErrors.set([]);
  }

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
