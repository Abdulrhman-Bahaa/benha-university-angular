import { Component, Input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="section-header" appAnimateOnScroll animation="animate__backInLeft">
      <h2>{{ title }}</h2>
      @if (viewAllLink) {
        <a [routerLink]="viewAllLink" class="view-all">{{ viewAllText }}</a>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin-bottom: 20px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    h2 {
      font-size: 1.8rem;
      color: var(--dark-blue);
      font-weight: 700;
    }

    .view-all {
      color: var(--text-gray);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s;
    }

    .view-all:hover {
      color: var(--primary-orange);
    }
  `]
})
export class SectionHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() viewAllLink?: string;
  @Input() viewAllText = 'view all';
}
