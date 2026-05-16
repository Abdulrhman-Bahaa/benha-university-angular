import { Component, inject, Input, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NewsService } from "../../core/services/news.service";
import { NewsItem } from "../../core/models/news.model";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-news-detail",
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    @if (newsItem(); as news) {
      <article class="container section-margin">
        <a routerLink="/news" class="back-link">
          <i class="fas fa-arrow-left"></i> Back to News
        </a>

        <div class="news-header">
          <span class="category-badge">{{ news.category }}</span>
          <h1>{{ news.title }}</h1>
        </div>

        <img [src]="news.coverUrl" [alt]="news.title" class="featured-image" />

        <div class="content">
          <p class="excerpt">{{ news.date | date: "mediumDate" }}</p>
          <div class="full-content">
            <div [innerHTML]="news.content"></div>
          </div>
          <p class="source">{{ news.source }}</p>
        </div>
      </article>
    } @else {
      <div class="container section-margin not-found">
        <h1>News Not Found</h1>
        <p>The article you're looking for doesn't exist.</p>
        <a routerLink="/news" class="btn btn-primary">Browse All News</a>
      </div>
    }
  `,
  styles: [
    `
      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--dark-blue);
        text-decoration: none;
        margin-bottom: 20px;
        font-weight: 500;
        transition: color 0.2s;
      }

      .back-link:hover {
        color: var(--primary-orange);
      }

      .news-header {
        margin-bottom: 25px;
      }

      .category-badge {
        display: inline-block;
        background: var(--primary-orange);
        color: var(--white);
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 15px;
      }

      h1 {
        font-size: 2.2rem;
        color: var(--dark-blue);
        font-weight: 700;
        line-height: 1.3;
      }

      .featured-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 12px;
        margin-bottom: 30px;
      }

      .content {
        max-width: 800px;
      }

      .excerpt {
        font-size: 1.1rem;
        color: var(--text-gray);
        font-style: italic;
        margin-bottom: 20px;
        padding-left: 20px;
        border-left: 3px solid var(--primary-orange);
      }

      .source {
        font-size: 0.9rem;
        color: var(--text-gray);
        margin-top: 30px;
        font-style: italic;
      }

      .full-content p {
        font-size: 1rem;
        line-height: 1.8;
        color: #444;
        margin-bottom: 20px;
      }

      .not-found {
        text-align: center;
        padding: 60px 20px;
      }

      .not-found h1 {
        margin-bottom: 15px;
      }

      .not-found p {
        color: var(--text-gray);
        margin-bottom: 25px;
      }

      @media (max-width: 768px) {
        h1 {
          font-size: 1.6rem;
        }

        .featured-image {
          height: 250px;
        }
      }
    `,
  ],
})
export class NewsDetailComponent {
  private newsService = inject(NewsService);

  @Input() set slug(value: string) {
    this.newsItem.set(this.newsService.getNewsBySlug(value));
  }

  newsItem = signal<NewsItem | undefined>(undefined);
}
