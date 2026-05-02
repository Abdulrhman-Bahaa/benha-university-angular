import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-categories-section',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="container section-margin">
      <h2 appAnimateOnScroll animation="animate__fadeInLeft">Categories</h2>

      <div class="category-grid">
        @for (category of categories(); track category.id; let i = $index) {
          <a 
            [routerLink]="['/category', category.slug]"
            class="cat-card card-hover"
            appReveal
            [appRevealDelay]="i * 0.1"
          >
            <i [class]="category.icon"></i>
            <span>{{ category.name }}</span>
          </a>
        }
      </div>
    </section>
  `,
  styles: [`
    h2 {
      font-size: 1.8rem;
      color: var(--dark-blue);
      margin-bottom: 20px;
      font-weight: 700;
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
    }

    .cat-card {
      border: 1px solid var(--border-color);
      padding: 40px 20px;
      text-align: center;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 15px;
      font-weight: bold;
      color: var(--dark-blue);
      text-decoration: none;
      background: var(--white);
      transition: all 0.3s ease;
    }

    .cat-card i {
      font-size: 2.5rem;
      color: var(--dark-blue);
      transition: color 0.3s ease;
    }

    .cat-card:hover i {
      color: var(--primary-orange);
    }

    .cat-card span {
      font-size: 0.95rem;
      letter-spacing: 1px;
    }

    @media (max-width: 768px) {
      .category-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .category-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CategoriesSectionComponent {
  private categoryService = inject(CategoryService);
  categories = this.categoryService.categories;
}
