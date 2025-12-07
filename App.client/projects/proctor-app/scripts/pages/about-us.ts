import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'about-us-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- About Section -->
    <section class="about-section">
      <div class="about-container">
        <!-- Left Side - About Image -->
        <div class="about-image-side">
          <div class="about-image-container">
            <img src="assets/images/aboutus.png" alt="About Us Illustration" class="about-image">
          </div>
        </div>
        
        <!-- Right Side - About Content -->
        <div class="about-content-side">
          <div class="about-content">
            <h1 class="about-title">About Us</h1>
            <p class="about-subtitle">Welcome to Proctor Repository System, a digital platform designed to empower students by providing a safe and confidential space to report incidents of harassment or any other issues within the university premises.</p>
            <p class="about-subtitle">At Daffodil International University, we believe that safety and well-being are fundamental rights of every student. This platform aims to bridge the gap between students and the proctorial team, facilitating a transparent and efficient complaint resolution process.</p>
            
            <h2 class="process-title">How We Work:</h2>
            <ul class="process-list">
              <li><strong>Easy Reporting:</strong> Students can file complaints through a simple and intuitive form.</li>
              <li><strong>Instant Notification:</strong> Once a complaint is submitted, relevant authorities are immediately notified.</li>
              <li><strong>Case Handling:</strong> Coordination officers contact the complainant and accused to collect statements and evidence.</li>
              <li><strong>Fair Resolution:</strong> Proctorial team reviews cases, holds meetings, and resolves issues with integrity and care.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['../../styles/pages/about-us.scss']
})
export class AboutUsPage {}
