import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../models/user';

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
            <button class="btn btn-secondary" (click)="cancel()">Cancel</button>
            <button class="btn btn-primary" (click)="signOut()">Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/sign-out.scss']
})
export class SignOutPage {
  constructor(private router: Router) {}

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }

  signOut(): void {
    UserService.clearCurrentUser();
    this.router.navigate(['/login']);
  }
}

