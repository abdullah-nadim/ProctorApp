import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <!-- Login/Signup Area -->
    <div class="main-wrapper">
      <div class="container-box" id="container" [class.signup-mode]="isSignupMode">
        <div class="form-container login-form">
          <form id="login-form" (ngSubmit)="onLogin($event)">
            <h2>Sign In</h2>
            <input type="email" placeholder="Email" required [(ngModel)]="loginForm.email" name="loginEmail" />
            <input type="password" placeholder="Password" required [(ngModel)]="loginForm.password" name="loginPassword" />
            <button type="submit">Login</button>
            <div class="signup-link">
              <p>Don't have an account? <a href="#" (click)="toggleMode()" class="signup-link-text">Sign Up</a></p>
            </div>
          </form>
        </div>

        <div class="form-container signup-form">
          <form id="signup-form" (ngSubmit)="onSignup($event)">
            <h2>Create Account</h2>
            <input type="text" placeholder="Name" required [(ngModel)]="signupForm.name" name="signupName" />
            <input type="email" placeholder="Email" required [(ngModel)]="signupForm.email" name="signupEmail" />
            <input type="password" placeholder="Password" required [(ngModel)]="signupForm.password" name="signupPassword" />
            <input type="password" placeholder="Confirm Password" required [(ngModel)]="signupForm.confirmPassword" name="signupConfirmPassword" />
            <button type="submit">Sign Up</button>
            <div class="login-link">
              <p>Already have an account? <a href="#" (click)="toggleMode()" class="login-link-text">Sign In</a></p>
            </div>
          </form>
        </div>

        <div class="overlay-container">
          <h1 id="overlay-title">{{ isSignupMode ? 'Hello!' : 'Welcome Back!' }}</h1>
          <p id="overlay-text">{{ isSignupMode ? 'Enter your personal details and start your journey with us' : 'To keep connected with us please login with your personal info' }}</p>
          <button id="toggle-btn" (click)="toggleMode()">{{ isSignupMode ? 'Sign In' : 'Sign Up' }}</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/login.scss']
})
export class LoginPage {
  isSignupMode = false;
  
  loginForm = {
    email: '',
    password: ''
  };
  
  signupForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  toggleMode() {
    this.isSignupMode = !this.isSignupMode;
  }

  onLogin(event: Event) {
    event.preventDefault();
    console.log('Login form submitted:', this.loginForm);
    // Add your login logic here
  }

  onSignup(event: Event) {
    event.preventDefault();
    console.log('Signup form submitted:', this.signupForm);
    // Add your signup logic here
  }
}
