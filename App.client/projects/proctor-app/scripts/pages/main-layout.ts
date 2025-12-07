import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <!-- Fixed Top Bar -->
    <div class="fixed-top-bar"></div>
    
    <!-- Navigation Bar -->
    <nav class="navigation-bar">
      <!-- Logo on the left -->
      <a class="navbar-brand" routerLink="/home">
        <img src="assets/images/DIU Logo.png" alt="DIU Logo" class="logo">
      </a>
      
      <!-- Navigation buttons on the right -->
      <div class="navbar-nav">
        <a routerLink="/home" class="nav-link home-btn" routerLinkActive="active">Home</a>
        <a routerLink="/contact" class="nav-link contact-btn" routerLinkActive="active">Contact</a>
        <a routerLink="/about-us" class="nav-link about-btn" routerLinkActive="active">About Us</a>
        <a routerLink="/login" class="nav-link login-btn" routerLinkActive="active">Login</a>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    
  `,
  styleUrls: ['../../styles/components/main-layout.scss']
})
export class MainLayout {}
