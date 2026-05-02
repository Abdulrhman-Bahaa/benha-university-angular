import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RevealDirective],
  template: `
    <div class="container section-margin">
      <h1 class="page-title">Contact Us</h1>

      <div class="contact-grid">
        <div class="contact-info" appReveal>
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

          <div class="info-items">
            <div class="info-item">
              <i class="fas fa-envelope"></i>
              <div>
                <strong>Email</strong>
                <span>benhaon25&#64;gmail.com</span>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-phone"></i>
              <div>
                <strong>Phone</strong>
                <span>01020939477</span>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <strong>Address</strong>
                <span>Benha, Qalyubia Governorate, Egypt</span>
              </div>
            </div>
          </div>
        </div>

        <form class="contact-form" (ngSubmit)="onSubmit()" appReveal [appRevealDelay]="0.2">
          <div class="form-group">
            <label for="name">Name</label>
            <input 
              type="text" 
              id="name" 
              [(ngModel)]="form.name" 
              name="name" 
              required
              placeholder="Your name"
            >
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              [(ngModel)]="form.email" 
              name="email" 
              required
              placeholder="your@email.com"
            >
          </div>

          <div class="form-group">
            <label for="subject">Subject</label>
            <input 
              type="text" 
              id="subject" 
              [(ngModel)]="form.subject" 
              name="subject" 
              required
              placeholder="How can we help?"
            >
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea 
              id="message" 
              [(ngModel)]="form.message" 
              name="message" 
              required
              rows="5"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .page-title {
      font-size: 2.5rem;
      color: var(--dark-blue);
      margin-bottom: 40px;
      font-weight: 700;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 50px;
      align-items: start;
    }

    .contact-info h2 {
      font-size: 1.5rem;
      color: var(--dark-blue);
      margin-bottom: 15px;
    }

    .contact-info > p {
      color: var(--text-gray);
      line-height: 1.7;
      margin-bottom: 30px;
    }

    .info-items {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .info-item i {
      font-size: 1.2rem;
      color: var(--primary-orange);
      width: 24px;
    }

    .info-item strong {
      display: block;
      color: var(--dark-blue);
      font-size: 0.95rem;
      margin-bottom: 3px;
    }

    .info-item span {
      color: var(--text-gray);
      font-size: 0.9rem;
    }

    .contact-form {
      background: var(--bg-light);
      padding: 35px;
      border-radius: 12px;
      border: 1px solid var(--border-color);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: var(--dark-blue);
      font-weight: 500;
      font-size: 0.9rem;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: border-color 0.2s, box-shadow 0.2s;
      font-family: inherit;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--primary-orange);
      box-shadow: 0 0 0 3px rgba(243, 130, 48, 0.1);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }

    button[type="submit"] {
      width: 100%;
      margin-top: 10px;
    }

    @media (max-width: 768px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      .page-title {
        font-size: 1.8rem;
      }
    }
  `]
})
export class ContactComponent {
  form: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit(): void {
    console.log('Form submitted:', this.form);
    // Implement form submission logic
    alert('Thank you for your message! We will get back to you soon.');
    this.form = { name: '', email: '', subject: '', message: '' };
  }
}
