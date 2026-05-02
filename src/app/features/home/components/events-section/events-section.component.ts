import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventService } from '../../../../core/services/event.service';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-events-section',
  standalone: true,
  imports: [RouterLink, SectionHeaderComponent, TruncatePipe],
  template: `
    <section class="container section-margin">
      <app-section-header 
        title="Upcoming Events" 
        viewAllLink="/events"
      />

      <div class="event-slider">
        <div class="event-wrapper">
          @for (event of events().slice(0, 5); track event.id; let i = $index) {
            <div 
              class="event-slide" 
              [class.active]="i === currentSlide()"
              [style.animation]="i === currentSlide() ? 'fadeEffect 0.8s ease-in-out' : 'none'"
            >
              <div class="event-item">
                <div class="event-image">
                  <img [src]="event.imageUrl" [alt]="event.title" loading="lazy">
                </div>
                <div class="event-info">
                  <h4>{{ event.title }}</h4>
                  <p>{{ event.description | truncate:100 }}</p>
                  @if (event.location) {
                    <span class="location">
                      <i class="fas fa-map-marker-alt"></i>
                      {{ event.location }}
                    </span>
                  }
                </div>
                <button 
                  class="btn btn-secondary" 
                  [routerLink]="['/events', event.slug]"
                >
                  View Details
                </button>
              </div>
            </div>
          }
        </div>

        <div class="slider-dots">
          @for (event of events().slice(0, 5); track event.id; let i = $index) {
            <span 
              class="dot" 
              [class.active]="i === currentSlide()"
              (click)="goToSlide(i)"
              [attr.aria-label]="'Go to slide ' + (i + 1)"
              role="button"
              tabindex="0"
              (keydown.enter)="goToSlide(i)"
            ></span>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .event-slider {
      position: relative;
      overflow: hidden;
      min-height: 150px;
    }

    .event-wrapper {
      position: relative;
    }

    .event-slide {
      display: none;
    }

    .event-slide.active {
      display: block;
    }

    @keyframes fadeEffect {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .event-item {
      display: flex;
      align-items: center;
      padding: 20px;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      gap: 20px;
      background: var(--white);
    }

    .event-image {
      flex-shrink: 0;
    }

    .event-item img {
      width: 100px;
      height: 100px;
      border-radius: 8px;
      object-fit: cover;
    }

    .event-info {
      flex-grow: 1;
    }

    .event-info h4 {
      font-size: 1.1rem;
      color: var(--dark-blue);
      margin-bottom: 8px;
      font-weight: 600;
    }

    .event-info p {
      font-size: 0.9rem;
      color: var(--text-gray);
      line-height: 1.5;
      margin-bottom: 8px;
    }

    .location {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      color: var(--primary-orange);
      font-weight: 500;
    }

    .location i {
      font-size: 0.8rem;
    }

    .slider-dots {
      text-align: center;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      gap: 8px;
    }

    .dot {
      height: 10px;
      width: 10px;
      background-color: #bbb;
      border-radius: 50%;
      display: inline-block;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
    }

    .dot:hover {
      background-color: #999;
    }

    .dot.active {
      background-color: var(--primary-orange);
      width: 25px;
      border-radius: 10px;
    }

    @media (max-width: 768px) {
      .event-item {
        flex-direction: column;
        text-align: center;
      }

      .event-item img {
        width: 100%;
        height: 150px;
      }

      .event-info {
        width: 100%;
      }
    }
  `]
})
export class EventsSectionComponent implements OnInit, OnDestroy {
  private eventService = inject(EventService);

  events = this.eventService.events;
  currentSlide = signal(0);

  private autoPlayInterval?: ReturnType<typeof setInterval>;
  private readonly slideDuration = 5000;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    this.resetAutoPlay();
  }

  nextSlide(): void {
    const next = (this.currentSlide() + 1) % Math.min(this.events().length, 5);
    this.currentSlide.set(next);
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.slideDuration);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  private resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
