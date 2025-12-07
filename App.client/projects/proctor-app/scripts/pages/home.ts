import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <!-- Left Side - Hero Text -->
        <div class="hero-text-side">
          <div class="hero-content">
            <h1 class="hero-title">SAFEGUARDING STUDENTS,<br>ONE COMPLAINT AT A TIME</h1>
            <p class="hero-subtext">A secure and efficient platform for students to report harassment and other issues with confidence. It streamlines the complaint process, ensuring transparency and quick resolution through the dedicated efforts of the proctorial team. Speak up, stay safe, and let us take care of the rest.</p>
            <button class="hero-btn" routerLink="/login">Get Started</button>
          </div>
        </div>
        
        <!-- Right Side - Hero Image -->
        <div class="hero-image-side">
          <div class="hero-image-container">
            <img src="assets/images/icons.png" alt="Partner Logos" class="hero-image">
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['../../styles/pages/home.scss']
})
export class HomePage {}
