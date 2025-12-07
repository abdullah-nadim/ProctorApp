import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { UserService, UserType, User } from '../models/user';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  userTypes: UserType[];
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
        <!-- Temporary User Switcher (Development Only) -->
        <div class="dev-user-switcher" style="background: #f0f0f0; padding: 15px; margin-bottom: 20px; border-radius: 8px; border: 2px solid #007bff;">
          <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
            <strong style="color: #007bff;">🔧 DEV MODE - Switch User Type:</strong>
            <button (click)="switchUser(UserType.Student)" 
                    [style.background]="getUserType() === UserType.Student ? '#28a745' : '#6c757d'"
                    style="color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
              👤 Student
            </button>
            <button (click)="switchUser(UserType.Proctor)" 
                    [style.background]="getUserType() === UserType.Proctor ? '#28a745' : '#6c757d'"
                    style="color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
              🎓 Proctor
            </button>
            <button (click)="switchUser(UserType.CoordinationOfficer)" 
                    [style.background]="getUserType() === UserType.CoordinationOfficer ? '#28a745' : '#6c757d'"
                    style="color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
              👔 Co-ordination Officer
            </button>
            <div style="margin-left: auto; display: flex; gap: 10px; flex-wrap: wrap;">
              <strong style="color: #007bff;">Quick Nav:</strong>
              <a routerLink="/dashboard" style="padding: 6px 12px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; font-size: 12px;">Dashboard</a>
              <a routerLink="/dashboard/file-complaint" style="padding: 6px 12px; background: #17a2b8; color: white; text-decoration: none; border-radius: 4px; font-size: 12px;">File Complaint</a>
              <a routerLink="/dashboard/my-complaints" style="padding: 6px 12px; background: #17a2b8; color: white; text-decoration: none; border-radius: 4px; font-size: 12px;">My Complaints</a>
              <a routerLink="/dashboard/assign-cases" style="padding: 6px 12px; background: #ffc107; color: #000; text-decoration: none; border-radius: 4px; font-size: 12px;">Assign Cases</a>
              <a routerLink="/dashboard/schedule-meeting" style="padding: 6px 12px; background: #ffc107; color: #000; text-decoration: none; border-radius: 4px; font-size: 12px;">Schedule Meeting</a>
              <a routerLink="/dashboard/manage-cases" style="padding: 6px 12px; background: #dc3545; color: white; text-decoration: none; border-radius: 4px; font-size: 12px;">Manage Cases</a>
              <a routerLink="/dashboard/notifications" style="padding: 6px 12px; background: #6c757d; color: white; text-decoration: none; border-radius: 4px; font-size: 12px;">Notifications</a>
              <a routerLink="/dashboard/my-profile" style="padding: 6px 12px; background: #6c757d; color: white; text-decoration: none; border-radius: 4px; font-size: 12px;">My Profile</a>
            </div>
          </div>
        </div>

        <!-- Dashboard Header -->
        <div class="dashboard-header d-flex justify-content-between align-items-center flex-wrap">
          <div [class]="isDashboardPage() ? 'welcome-message' : 'search-container'">
            <h1 *ngIf="isDashboardPage()">Welcome back, {{ currentUser()?.name || 'User' }}</h1>
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
              <h3>{{ currentUser()?.name || 'User' }}</h3>
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
  // Expose UserType enum to template
  UserType = UserType;
  
  sidebarOpen = signal(false);
  searchQuery = '';
  currentUser = signal<User | null>(null);

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', route: '/dashboard', userTypes: [UserType.Student, UserType.Proctor, UserType.CoordinationOfficer] },
    { label: 'File a Complaint', icon: 'fas fa-file-alt', route: '/dashboard/file-complaint', userTypes: [UserType.Student] },
    { label: 'My Complaints', icon: 'fas fa-list', route: '/dashboard/my-complaints', userTypes: [UserType.Student] },
    { label: 'Assign Cases', icon: 'fas fa-file-alt', route: '/dashboard/assign-cases', userTypes: [UserType.Proctor] },
    { label: 'Schedule Meeting', icon: 'fas fa-calendar', route: '/dashboard/schedule-meeting', userTypes: [UserType.Proctor] },
    { label: 'Manage Cases', icon: 'fas fa-file-alt', route: '/dashboard/manage-cases', userTypes: [UserType.CoordinationOfficer] },
    { label: 'Meeting Schedule', icon: 'fas fa-list', route: '/dashboard/meeting-schedule', userTypes: [UserType.CoordinationOfficer] },
    { label: 'Notifications', icon: 'fas fa-bell', route: '/dashboard/notifications', userTypes: [UserType.Student, UserType.Proctor, UserType.CoordinationOfficer] }
  ];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Initialize user immediately in constructor
    let user = UserService.getCurrentUser();
    if (!user) {
      // Initialize with mock user if none exists (for development - no backend)
      UserService.setCurrentUser({
        id: 1,
        name: 'Alex Hales',
        email: 'alex@example.com',
        userType: UserType.CoordinationOfficer
      });
      user = UserService.getCurrentUser();
    }
    this.currentUser.set(user);
  }

  ngOnInit(): void {
    // Ensure user is set (in case it wasn't set in constructor)
    if (!this.currentUser()) {
      const user = UserService.getCurrentUser();
      if (user) {
        this.currentUser.set(user);
      }
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

  getUserInitials(): string {
    const name = this.currentUser()?.name || '';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  getUserTypeLabel(): string {
    const userType = UserService.getUserType();
    switch (userType) {
      case UserType.Student:
        return 'Student';
      case UserType.Proctor:
        return 'Proctor';
      case UserType.CoordinationOfficer:
        return 'Co-ordination Officer';
      default:
        return 'User';
    }
  }

  getUserType(): UserType | null {
    return UserService.getUserType();
  }

  isDashboardPage(): boolean {
    return this.router.url === '/dashboard' || this.router.url === '/dashboard/';
  }

  switchUser(userType: UserType): void {
    const mockUsers = {
      [UserType.Student]: {
        id: 1,
        name: 'John Student',
        email: 'student@example.com',
        userType: UserType.Student
      },
      [UserType.Proctor]: {
        id: 2,
        name: 'Jane Proctor',
        email: 'proctor@example.com',
        userType: UserType.Proctor
      },
      [UserType.CoordinationOfficer]: {
        id: 3,
        name: 'Alex Hales',
        email: 'officer@example.com',
        userType: UserType.CoordinationOfficer
      }
    };

    const user = mockUsers[userType];
    UserService.setCurrentUser(user);
    this.currentUser.set(user);
    // Navigate to dashboard to refresh the view and update menu items
    this.router.navigate(['/dashboard']);
  }
}

