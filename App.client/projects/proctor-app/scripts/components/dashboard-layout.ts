import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { User, UserTypes } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  userTypes: UserTypes[];
}

@Component({
  selector: 'dashboard-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet],
  template: `
    <!-- Fixed Top Bar -->
    <div class="fixed-top-bar"></div>

    <!-- Dashboard Container -->
    <div class="dashboard-container">
      <!-- Sidebar -->
      <button class="menu-toggle" (click)="toggleSidebar()">
        <i class="fas fa-bars"></i>
      </button>
      
      <aside class="sidebar" [class.active]="sidebarOpen()" #sidebar>
        <div class="sidebar-logo">
          <img src="assets/images/DIU Logo.png" alt="DIU Logo">
        </div>
        
        <ul class="sidebar-menu">
          <li *ngFor="let menuItem of visibleMenuItems()">
            <a [routerLink]="menuItem.route" routerLinkActive="active" [routerLinkActiveOptions]="{exact: false}">
              <i [class]="menuItem.icon"></i> 
              <span>{{ menuItem.label }}</span>
            </a>
          </li>
          
          <li class="sidebar-divider"></li>
          
          <li>
            <a routerLink="/dashboard/my-profile" routerLinkActive="active">
              <i class="fas fa-user"></i> 
              <span>My Profile</span>
            </a>
          </li>
          <li>
            <a routerLink="/dashboard/help-support" routerLinkActive="active">
              <i class="fas fa-question-circle"></i> 
              <span>Help & Support</span>
            </a>
          </li>
          <li>
            <a routerLink="/dashboard/sign-out" routerLinkActive="active">
              <i class="fas fa-sign-out-alt"></i> 
              <span>Sign Out</span>
            </a>
          </li>
        </ul>
      </aside>
      
      <!-- Main Content -->
      <main class="main-content">
        <!-- Dashboard Header -->
        <div class="dashboard-header d-flex justify-content-between align-items-center flex-wrap">
          <div [class]="isDashboardPage() ? 'welcome-message' : 'search-container'">
            <h1 *ngIf="isDashboardPage()">Welcome back, {{ getUserDisplayName() }}</h1>
            <div class="search-bar">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Search here" [(ngModel)]="searchQuery">
            </div>
          </div>
          
          <div class="user-profile">
            <div class="user-avatar">
              <span>{{ getUserInitials() }}</span>
            </div>
            <div class="user-info">
              <h3>{{ getUserDisplayName() }}</h3>
              <p>{{ getUserTypeLabel() }}</p>
            </div>
          </div>
        </div>
        
        <!-- Page Content -->
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['../../styles/components/dashboard-layout.scss']
})
export class DashboardLayout implements OnInit {
  sidebarOpen = signal(false);
  searchQuery = '';
  currentUser = signal<User | null>(null);

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', route: '/dashboard', userTypes: [UserTypes.Student, UserTypes.Proctor, UserTypes.CoordinationOfficer] },
    { label: 'File a Complaint', icon: 'fas fa-file-alt', route: '/dashboard/file-complaint', userTypes: [UserTypes.Student] },
    { label: 'My Complaints', icon: 'fas fa-list', route: '/dashboard/my-complaints', userTypes: [UserTypes.Student] },
    { label: 'Assign Cases', icon: 'fas fa-file-alt', route: '/dashboard/assign-cases', userTypes: [UserTypes.Proctor] },
    { label: 'Schedule Meeting', icon: 'fas fa-calendar', route: '/dashboard/schedule-meeting', userTypes: [UserTypes.Proctor] },
    { label: 'Manage Cases', icon: 'fas fa-file-alt', route: '/dashboard/manage-cases', userTypes: [UserTypes.CoordinationOfficer] },
    { label: 'Meeting Schedule', icon: 'fas fa-list', route: '/dashboard/meeting-schedule', userTypes: [UserTypes.CoordinationOfficer] },
    { label: 'Notifications', icon: 'fas fa-bell', route: '/dashboard/notifications', userTypes: [UserTypes.Student, UserTypes.Proctor, UserTypes.CoordinationOfficer] }
  ];

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    // Initialize user from UserService
    const user = UserService.getCurrentUser();
    if (user) {
      this.currentUser.set(user);
    }
  }

  ngOnInit(): void {
    // Load current user from API if not already loaded
    const user = UserService.getCurrentUser();
    if (user) {
      this.currentUser.set(user);
    } else {
      // Try to fetch user from API
      this.authService.getCurrentUser().subscribe({
        next: (user) => {
          this.currentUser.set(user);
        },
        error: (error) => {
          console.error('Error loading current user:', error);
          // If not authenticated, redirect to login
          this.router.navigate(['/login']);
        }
      });
    }
  }

  visibleMenuItems(): MenuItem[] {
    const userType = UserService.getUserType();
    if (!userType) return [];
    return this.menuItems.filter(item => item.userTypes.includes(userType));
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(value => !value);
  }

  getUserDisplayName(): string {
    const user = this.currentUser();
    if (!user) return 'User';
    return user.name || user.fullName || user.userName || user.email || 'User';
  }

  getUserInitials(): string {
    const name = this.getUserDisplayName();
    if (!name || name === 'User') return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  getUserTypeLabel(): string {
    const userType = UserService.getUserType();
    switch (userType) {
      case UserTypes.Student:
        return 'Student';
      case UserTypes.Proctor:
        return 'Proctor';
      case UserTypes.CoordinationOfficer:
        return 'Co-ordination Officer';
      default:
        return 'User';
    }
  }

  getUserType(): UserTypes | null {
    return UserService.getUserType();
  }

  isDashboardPage(): boolean {
    return this.router.url === '/dashboard' || this.router.url === '/dashboard/';
  }
}

