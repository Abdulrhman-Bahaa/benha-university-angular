import { Injectable, signal } from "@angular/core";
import { EventItem } from "../models/event.model";
import { ContentfulService } from "./contentful.service";
import { inject } from "@angular/core";
import { computed } from "@angular/core";
import { Signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class EventService {
  private contentfulService = inject(ContentfulService);
  private readonly _events = signal<EventItem[]>([]);

  constructor() {
    this.contentfulService.getEvents().subscribe((events) => {
      this._events.set(events);
    });
  }

  readonly events = this._events.asReadonly();

  getEventBySlug(slug: string): EventItem | undefined {
    return this._events().find((item) => item.slug === slug);
  }

  getEventsByCategory(category: string): Signal<EventItem[]> {
    return computed(() =>
      this._events().filter((item) => item.category === category),
    );
  }
}
