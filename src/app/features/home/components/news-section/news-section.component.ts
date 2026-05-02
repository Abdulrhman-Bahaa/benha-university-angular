import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../../../core/services/news.service';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-news-section',
  standalone: true,
  imports: [RouterLink, SectionHeaderComponent, TruncatePipe, RevealDirective],
  template: `
    <section class="container section-margin">
      <app-section-header 
        title="Latest News" 
        viewAllLink="/news"
      />

      <div class="news-grid">
        @for (news of newsItems().slice(0, 3); track news.id; let i = $index) {
          <article 
            class="news-card card-hover" 
            appReveal 
            [appRevealDelay]="i * 0.2"
          >
            <div class="image-wrapper">
              <img [src]="news.imageUrl" [alt]="news.title" loading="lazy">
              @if (news.category) {
                <span class="category-badge">{{ news.category }}</span>
              }
            </div>
            <div class="card-content">
              <h3>
                <a [routerLink]="['/news', news.slug]">{{ news.title }}</a>
              </h3>
              <p>{{ news.excerpt | truncate:120 }}</p>
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: [`
    .news-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .news-card {
      border: 1px solid var(--border-color);
      border-radius: 10px;
      overflow: hidden;
      background: var(--white);
    }

    .image-wrapper {
      position: relative;
      overflow: hidden;
    }

    .news-card img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .news-card:hover img {
      transform: scale(1.05);
    }

    .category-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: var(--primary-orange);
      color: var(--white);
      padding: 4px 10px;
      border-radius: 15px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .card-content {
      padding: 15px;
    }

    .card-content h3 {
      font-size: 1rem;
      margin-bottom: 10px;
      color: var(--dark-blue);
      line-height: 1.4;
    }

    .card-content h3 a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s;
    }

    .card-content h3 a:hover {
      color: var(--primary-orange);
    }

    .card-content p {
      font-size: 0.85rem;
      color: var(--text-gray);
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .news-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      .news-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class NewsSectionComponent {
  private newsService = inject(NewsService);
  newsItems = this.newsService.news;
}
