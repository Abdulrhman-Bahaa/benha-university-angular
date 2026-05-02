import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

@Component({
  selector: 'app-about-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <div class="hero-overlay">
        <div class="container hero-content">
          <h1>
            About Benha On
          </h1>
          <p>
             Learn more about our mission,
            vision and the team behind the platform.
          </p>
        </div>
      </div>
    </section>

    <div class="content-wrapper">
      <!-- Who We Are -->
      <section class="container section-margin who-we-are">
        <div class="text-content">
          <h2 class="underline-title">Who We Are?</h2>
          <p>
            Benha On is a student-centered platform designed to support Benha University students 
            throughout their academic journey with ease. It provides quick access to university 
            news, upcoming events, and useful academic resources in one place.
          </p>
        </div>
      </section>

      <!-- Mission & Vision Cards -->
      <section class="container mv-grid">
        <div class="info-card">
          <div class="icon-circle"><i class="fas fa-bullseye"></i></div>
          <h3>Our Mission</h3>
          <p>
            Our mission is to simplify student life by providing clear, well-organized, 
            and easily accessible information for all students. We aim to help them stay 
            informed, improve their academic performance, and make the most of their 
            university experience.
          </p>
        </div>
        <div class="info-card">
          <div class="icon-circle"><i class="fas fa-eye"></i></div>
          <h3>Our Vision</h3>
          <p>
            Our vision is to become the go-to digital platform for university students, 
            offering a seamless and reliable experience that supports learning, growth, 
            and connection within the university community.
          </p>
        </div>
      </section>

      <!-- Why Benha On? -->
      <section class="container section-margin">
        <h2 class="underline-title">Why Benha On?</h2>
        <div class="features-grid">
          <div class="feature-box">
            <h4>All-in-One Platform</h4>
            <p>All your news, events, and resources gathered in one place.</p>
          </div>
          <div class="feature-box">
            <h4>Simple & User-Friendly</h4>
            <p>A user-friendly experience designed with students in mind.</p>
          </div>
          <div class="feature-box">
            <h4>Made for Benha Students</h4>
            <p>A simple guide to staying organized and informed at Benha University.</p>
          </div>
        </div>
      </section>

      <!-- Our Team -->
      <section class="container section-margin">
        <h2 class="team-header">Our Team</h2>
        <div class="team-grid">
          @for (member of teamMembers; track member.name) {
            <div class="team-card">
              <div class="member-img">
                <img [src]="member.photo" [alt]="member.name">
              </div>
              <h5>{{ member.name }}</h5>
              <p>{{ member.role }}</p>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      --primary-orange: #f38230;
      --dark-blue: #15294b;
      --text-gray: #666;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .hero {
        // background: url('assets/images/hero-bg.jpg') center/cover;
        height: 80vh;
        position: relative;
        overflow: hidden;
      }

    .hero h1 {
        font-size: 3rem;
        color: var(--white);
        max-width: 500px;
        margin-bottom: 20px;
    }

    .hero h2 {
        font-size: 1.5rem;
        color: var(--white);
        max-width:650px;
        margin-bottom: 20px;
    }

    .hero-content p {
      font-size: 1.7rem;         /* Slightly larger than body text */
      font-weight: 500;           /* Light font weight for elegance */
      line-height: 1.6;           /* Comfortable breathing room between lines */
      color: white; /* White text to match the image */ 
      max-width: 600px;           /* Prevents the text from stretching too wide */
      margin-top: 10px;           /* Space between H1 and this paragraph */
      letter-spacing: 0.5px;      /* Subtle spacing for professional clarity */
    } 

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-image:
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
     url('/benha-university-angular/assets/images/main/main.jpg');

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    z-index: 0;
  }

    .hero-overlay .container {
      position: absolute;
      top: 30%;
      left: 14%;
      width: 100%;
      height: 70%;
      text-align: left;
    }

    .hero-overlay h1 {
      font-size: 4rem;
      max-width: 700px;
      margin-bottom: 20px;
    }

    @media (max-width: 768px) {
      .hero {
        height: 300px;
      }

      h1 {
        font-size: 2rem;
      }
    }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .section-margin { margin: 80px auto; }

    /* Titles with Orange Underline */
    .underline-title {
      font-size: 2rem;
      color: var(--dark-blue);
      margin-bottom: 30px;
      position: relative;
    }
    .underline-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 45px;
      height: 3px;
      background: var(--primary-orange);
    }

    /* Who We Are */
    .who-we-are {
      display: flex;
      align-items: center;
      gap: 50px;
    }
    .who-we-are .text-content { flex: 1; }
    .who-we-are p { color: var(--text-gray); line-height: 1.8; }
    .who-we-are .image-content { flex: 1; }
    .who-we-are img { width: 100%; border-radius: 12px; }

    /* Mission & Vision Cards */
    .mv-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    .info-card {
      padding: 40px;
      border: 1px solid #f0f0f0;
      border-radius: 20px;
      text-align: left;
    }
    .icon-circle {
      width: 50px;
      height: 50px;
      background: var(--dark-blue);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      font-size: 1.2rem;
    }
    .info-card h3 { color: var(--dark-blue); margin-bottom: 15px; }
    .info-card p { color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; }

    /* Why Benha On (Dashed Borders) */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .feature-box {
      padding: 30px;
      border: 1.5px dashed #ccc;
      border-radius: 12px;
      text-align: center;
    }
    .feature-box h4 { color: var(--dark-blue); margin-bottom: 10px; }
    .feature-box p { color: var(--text-gray); font-size: 0.9rem; }

    /* Team Section */
    .team-header { font-size: 2rem; color: var(--dark-blue); margin-bottom: 40px; }
    .team-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 25px;
    }
    .team-card { text-align: center; }
    .member-img {
      width: 110px;
      height: 110px;
      margin: 0 auto 15px;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid #f8f8f8;
    }
    .member-img img { width: 100%; height: 100%; object-fit: cover; }
    .team-card h5 { color: var(--dark-blue); font-size: 0.95rem; margin-bottom: 4px; }
    .team-card p { color: var(--text-gray); font-size: 0.8rem; }

    /* Mobile Responsiveness */
    @media (max-width: 992px) {
      .team-grid { grid-template-columns: repeat(3, 1fr); }
      .who-we-are { flex-direction: column; }
    }
    @media (max-width: 600px) {
      .mv-grid, .features-grid { grid-template-columns: 1fr; }
      .team-grid { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class AboutComponent {
  teamMembers: TeamMember[] = [
    { name: 'Yara Eid', role: 'UI/UX Designer', photo: 'assets/yara.jpg' },
    { name: 'Sohaila Ashraf', role: 'Graphic Designer', photo: 'assets/sohaila.jpg' },
    { name: 'Toqa Ehab', role: 'Graphic Designer', photo: 'assets/toqa.jpg' },
    { name: 'Aya Khaled', role: 'Graphic Designer', photo: 'assets/aya.jpg' },
    { name: 'Rawan Hamdy', role: 'Graphic Designer', photo: 'assets/rawan.jpg' },
    { name: 'Nora Yehia', role: 'Graphic Designer', photo: 'assets/nora.jpg' },
    { name: 'Hager Geber', role: 'Graphic Designer', photo: 'assets/hager.jpg' },
    { name: 'Mayan Ayman', role: 'Graphic Designer', photo: 'assets/mayan.jpg' },
    { name: 'Samia Samir', role: 'Graphic Designer', photo: 'assets/samia.jpg' },
    { name: 'Menna Ahmed', role: 'Graphic Designer', photo: 'assets/menna.jpg' },
    { name: 'Alaa El-Sayed', role: 'Graphic Designer', photo: 'assets/alaa.jpg' },
    { name: 'Malak El Gendy', role: 'Graphic Designer', photo: 'assets/malak.jpg' },
  ];
}