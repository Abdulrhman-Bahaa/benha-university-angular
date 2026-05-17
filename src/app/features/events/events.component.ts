import { Component, inject } from "@angular/core";
import { EventService } from "../../core/services/event.service";
import { RevealDirective } from "../../shared/directives/reveal.directive";
import { TruncatePipe } from "../../shared/pipes/truncate.pipe";
import { RouterLink } from "@angular/router";
import { CategoriesSectionComponent } from "../home/components/categories-section/categories-section.component";

@Component({
  selector: "app-events",
  standalone: true,
  imports: [
    TruncatePipe,
    RouterLink,
    RevealDirective,
    CategoriesSectionComponent,
  ],
  template: `
    <div class="container section-margin">
      <h1 class="page-title">Upcoming Events</h1>

      <app-categories-section
        (categorySelected)="onCategorySelected($event)"
      ></app-categories-section>

      <div class="events-list">
        @for (event of events(); track event.id; let i = $index) {
          <article
            class="event-card card-hover"
            appReveal
            [appRevealDelay]="i * 0.15"
          >
            <div class="event-image">
              <img [src]="event.coverUrl" [alt]="event.title" loading="lazy" />
            </div>
            <div class="event-details">
              <h3>{{ event.title }}</h3>
              <p>{{ event.excerpt | truncate: 200 }}</p>
              @if (event.location) {
                <div class="meta">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ event.location }}</span>
                </div>
              }
              <button
                class="btn btn-secondary"
                [routerLink]="['/events', event.slug]"
              >
                View Details
              </button>
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

      .events-list {
        display: flex;
        flex-direction: column;
        gap: 25px;
      }

      .event-card {
        display: flex;
        border: 1px solid var(--border-color);
        border-radius: 12px;
        overflow: hidden;
        background: var(--white);
      }

      .event-image {
        flex-shrink: 0;
        width: 300px;
      }

      .event-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        min-height: 200px;
      }

      .event-details {
        padding: 25px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }

      .event-details h3 {
        font-size: 1.3rem;
        color: var(--dark-blue);
        margin-bottom: 12px;
        font-weight: 600;
      }

      .event-details p {
        font-size: 0.95rem;
        color: var(--text-gray);
        line-height: 1.6;
        margin-bottom: 15px;
        flex-grow: 1;
      }

      .meta {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--primary-orange);
        font-size: 0.9rem;
        margin-bottom: 15px;
        font-weight: 500;
      }

      .meta i {
        font-size: 0.85rem;
      }

      @media (max-width: 768px) {
        .event-card {
          flex-direction: column;
        }

        .event-image {
          width: 100%;
          height: 200px;
        }

        .page-title {
          font-size: 1.8rem;
        }
      }
    `,
  ],
})
export class EventsComponent {
  private eventService = inject(EventService);
  events = this.eventService.events;
  private category = history.state.category;
  constructor() {
    if (this.category) {
      this.onCategorySelected(this.category);
    }
  }

  onCategorySelected(category: string): void {
    this.events = this.eventService.getEventsByCategory(category);
  }
}
