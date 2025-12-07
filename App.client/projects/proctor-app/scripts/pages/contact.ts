import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Contact Section -->
    <section class="contact-section">
      <div class="contact-container">
        <!-- Left Side - Contact Image -->
        <div class="contact-image-side">
          <div class="contact-image-container">
            <img src="assets/images/contact.png" alt="Contact Illustration" class="contact-image">
          </div>
        </div>
        
        <!-- Right Side - Contact Form -->
        <div class="contact-content-side">
          <div class="contact-form-container">
            <h1 class="contact-title">Contact Us</h1>
            <p class="contact-subtitle">Contact us for questions, technical assistance, or collaboration opportunities via the contact information provided.</p>
            
            <!-- Contact Form -->
            <form class="contact-form" (ngSubmit)="onSubmit($event)">
              <div class="mb-3">
                <input type="text" class="form-control" placeholder="Your Name" required [(ngModel)]="contactForm.name" name="contactName">
              </div>
              <div class="mb-3">
                <input type="email" class="form-control" placeholder="Your Email" required [(ngModel)]="contactForm.email" name="contactEmail">
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" placeholder="Subject" [(ngModel)]="contactForm.subject" name="contactSubject">
              </div>
              <div class="mb-3">
                <textarea class="form-control" rows="4" placeholder="Your Message" required [(ngModel)]="contactForm.message" name="contactMessage"></textarea>
              </div>
              <button type="submit" class="btn submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['../../styles/pages/contact.scss']
})
export class ContactPage {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Contact form submitted:', this.contactForm);
    // Add your contact form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    this.contactForm = { name: '', email: '', subject: '', message: '' };
  }
}
