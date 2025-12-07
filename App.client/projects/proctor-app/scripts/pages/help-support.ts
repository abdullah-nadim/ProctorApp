import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'help-support-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Help & Support Section -->
    <div class="help-support-section">
      <div class="help-support-container">
        <div class="row align-items-center">
          <!-- Left Column - Contact Information -->
          <div class="col-lg-6">
            <div class="contact-info">
              <h1 class="contact-title">Contact Us</h1>
              <p class="contact-description">
                Contact us for questions, technical assistance, or collaboration opportunities via the contact information provided.
              </p>
              
              <div class="contact-details">
                <!-- Phone -->
                <div class="contact-item">
                  <div class="contact-icon">
                    <i class="fas fa-phone"></i>
                  </div>
                  <div class="contact-text">
                    <span>+8801847334756, +8801775450257</span>
                  </div>
                </div>
                
                <!-- Email -->
                <div class="contact-item">
                  <div class="contact-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="contact-text">
                    <span>proctoroffice@daffodilvarsity.edu.bd</span>
                  </div>
                </div>
                
                <!-- Address -->
                <div class="contact-item">
                  <div class="contact-icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div class="contact-text">
                    <span>Daffodil International University, Daffodil Smart City (DSC), Birulia, Savar, Dhaka-1216</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right Column - Illustration -->
          <div class="col-lg-6">
            <div class="contact-illustration">
              <img src="assets/images/contact us.png" alt="Contact Us Illustration" class="img-fluid">
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../styles/pages/help-support.scss']
})
export class HelpSupportPage {}

