import { Component, inject } from '@angular/core';
import { ResourcesService } from '../../core/services/resources.service ';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { RouterLink } from '@angular/router';
import { HeroComponent } from "../home/components/hero/hero.component";

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [TruncatePipe, RouterLink, HeroComponent],
  template: `
    <section class="hero">
      <div class="hero-overlay">
        <div class="container hero-content">
          <h1>
            Resources
          </h1>
          <p>
            Explore useful materials and tools
            for students 
          </p>
        </div>
      </div>
    </section>
    <div class="container section-margin">

      <div class="news-grid">
        @for (resource of newsItems(); track resource.id) {
          <article class="news-card card-hover" appReveal>
            <img [src]="resource.imageUrl" [alt]="resource.title" loading="lazy">
            <div class="card-content">
              <h3>
                <a [routerLink]="['/resources', resource.slug]">{{ resource.title }}</a>
              </h3>
              <p>{{ resource.excerpt | truncate:150 }}</p>
            </div>
          </article>
        }
      </div>
    </div>
  `,
  styles: [`
    .hero {
        // background: url('/assets/images/hero-bg.jpg') center/cover;
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

            background-image: image('/assets/images/main/main.jpg');


        background-image:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/assets/images/main/main.jpeg');
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

    .page-title {
      font-size: 2.5rem;
      color: var(--dark-blue);
      margin-bottom: 30px;
      font-weight: 700;
    }

    .news-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 25px;
    }

    .news-card {
      border: 1px solid var(--border-color);
      border-radius: 10px;
      overflow: hidden;
      background: var(--white);
    }

    .news-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .card-content {
      padding: 20px;
    }

    .card-content h3 {
      font-size: 1.1rem;
      margin-bottom: 10px;
      color: var(--dark-blue);
    }

    .card-content h3 a {
      color: inherit;
      text-decoration: none;
    }

    .card-content h3 a:hover {
      color: var(--primary-orange);
    }

    .card-content p {
      font-size: 0.9rem;
      color: var(--text-gray);
      line-height: 1.5;
      margin-bottom: 10px;
    }

    .category {
      display: inline-block;
      background: var(--primary-orange);
      color: var(--white);
      padding: 4px 12px;
      border-radius: 15px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .news-grid {
        grid-template-columns: 1fr;
      }

      .page-title {
        font-size: 1.8rem;
      }
    }
  `]
})
export class ResourcesComponent {
  private resourcesService = inject(ResourcesService);
  newsItems = this.resourcesService.resources;
}
