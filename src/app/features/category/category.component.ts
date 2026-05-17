import { Component, inject, Input, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CategoryService } from "../../core/services/category.service";
import { NewsService } from "../../core/services/news.service";
import { EventService } from "../../core/services/event.service";

@Component({
  selector: "app-category",
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container section-margin">
      @if (category(); as cat) {
        <div class="category-header">
          <i [class]="cat.icon"></i>
          <h1>{{ cat.name }}</h1>
        </div>

        <div class="category-content">
          <p>
            Explore {{ cat.name.toLowerCase() }} related news and events at
            Benha University.
          </p>

          <div class="actions">
            <a routerLink="/news" class="btn btn-secondary">
              <i class="fas fa-newspaper"></i> Browse News
            </a>
            <a routerLink="/events" class="btn btn-secondary">
              <i class="fas fa-calendar"></i> Browse Events
            </a>
          </div>
        </div>
      } @else {
        <div class="not-found">
          <h1>Category Not Found</h1>
          <a routerLink="/" class="btn btn-primary">Back to Home</a>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .category-header {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 30px;
      }

      .category-header i {
        font-size: 3rem;
        color: var(--primary-orange);
      }

      h1 {
        font-size: 2.5rem;
        color: var(--dark-blue);
        font-weight: 700;
      }

      .category-content {
        max-width: 600px;
      }

      .category-content p {
        font-size: 1.1rem;
        color: var(--text-gray);
        line-height: 1.7;
        margin-bottom: 30px;
      }

      .actions {
        display: flex;
        gap: 15px;
      }

      .actions a {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
      }

      .not-found {
        text-align: center;
        padding: 60px 20px;
      }

      .not-found h1 {
        margin-bottom: 20px;
      }

      @media (max-width: 768px) {
        h1 {
          font-size: 1.8rem;
        }

        .actions {
          flex-direction: column;
        }
      }
    `,
  ],
})
export class CategoryComponent {
  private categoryService = inject(CategoryService);

  @Input() set slug(value: string) {
    this.category.set(this.categoryService.getCategoryBySlug(value));
  }

  category = signal<any>(undefined);
}
