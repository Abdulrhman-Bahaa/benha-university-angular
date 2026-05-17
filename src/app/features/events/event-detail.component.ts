import { Component, inject, Input, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { EventService } from "../../core/services/event.service";
import { EventItem } from "../../core/models/event.model";
import { DatePipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-event-detail",
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    @if (eventItem(); as event) {
      <article class="container section-margin">
        <a routerLink="/events" class="back-link">
          <i class="fas fa-arrow-left"></i> Back to Events
        </a>

        <div class="event-header">
          <h1>{{ event.title }}</h1>
          @if (event.location) {
            <div class="location">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ event.location }}</span>
            </div>
          }
        </div>

        <img
          [src]="event.coverUrl"
          [alt]="event.title"
          class="featured-image"
        />

        <div class="content">
          <div class="full-content">
            <div class="event-content" [innerHTML]="event.content"></div>
            <div class="details-grid">
              <div class="detail-item">
                <i class="fas fa-calendar"></i>
                <div>
                  <strong>Date</strong>
                  <span>{{ event.date | date: "mediumDate" }}</span>
                </div>
              </div>
              <div class="detail-item">
                <i class="fas fa-clock"></i>
                <div>
                  <strong>Time</strong>
                  <span>{{ event.date | date: "shortTime" }}</span>
                </div>
              </div>
              <div class="detail-item">
                <i class="fas fa-users"></i>
                <div>
                  <strong>Audience</strong>
                  <span>Open to All</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    } @else {
      <div class="container section-margin not-found">
        <h1>Event Not Found</h1>
        <p>The event you're looking for doesn't exist.</p>
        <a routerLink="/events" class="btn btn-primary">Browse All Events</a>
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

      .event-header {
        margin-bottom: 25px;
      }

      h1 {
        font-size: 2.2rem;
        color: var(--dark-blue);
        font-weight: 700;
        line-height: 1.3;
        margin-bottom: 10px;
      }

      .location {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--primary-orange);
        font-size: 1rem;
        font-weight: 500;
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

      .description {
        font-size: 1.1rem;
        color: var(--text-gray);
        font-style: italic;
        margin-bottom: 20px;
        padding-left: 20px;
        border-left: 3px solid var(--primary-orange);
      }

      .full-content p {
        font-size: 1rem;
        line-height: 1.8;
        color: #444;
        margin-bottom: 20px;
      }

      .details-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-top: 30px;
      }

      .detail-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 20px;
        background: var(--bg-light);
        border-radius: 10px;
      }

      .detail-item i {
        font-size: 1.5rem;
        color: var(--primary-orange);
      }

      .detail-item strong {
        display: block;
        color: var(--dark-blue);
        margin-bottom: 4px;
      }

      .detail-item span {
        color: var(--text-gray);
        font-size: 0.9rem;
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

        .details-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class EventDetailComponent {
  private eventService = inject(EventService);
  eventItem = signal<EventItem | undefined>(undefined);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get("slug") || "";
      this.eventItem.set(this.eventService.getEventBySlug(slug));
    });
  }
}
