import { Component, inject } from "@angular/core";
import { NewsService } from "../../core/services/news.service";
import { ContentfulService } from "../../core/services/contentful.service";
import { TruncatePipe } from "../../shared/pipes/truncate.pipe";
import { RouterLink } from "@angular/router";
import { NewsItem } from "../../core/models/news.model";

@Component({
  selector: "app-news",
  standalone: true,
  imports: [TruncatePipe, RouterLink],
  template: `
    <div class="container section-margin">
      <h1 class="page-title">Latest News</h1>

      <div class="news-grid">
        @for (news of newsItems; track news.id) {
          <article class="news-card card-hover" appReveal>
            <img [src]="news.coverUrl" [alt]="news.title" loading="lazy" />
            <div class="card-content">
              <h3>
                <a [routerLink]="['/news', news.slug]">{{ news.title }}</a>
              </h3>
              <p>{{ news.excerpt | truncate: 150 }}</p>
              @if (news.category) {
                <span class="category">{{ news.category }}</span>
              }
            </div>
          </article>
        }
      </div>
    </div>
  `,
  styles: [
    `
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
    `,
  ],
})
export class NewsComponent {
  contentful = inject(ContentfulService);

  newsItems: NewsItem[] = [];
  ngOnInit(): void {
    this.contentful.getNews().subscribe((data) => {
      this.newsItems = data;
    });
  }
}
