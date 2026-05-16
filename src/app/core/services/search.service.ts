import { Injectable, signal, computed, inject } from "@angular/core";
import { NewsItem } from "../models/news.model";
import { EventItem } from "../models/event.model";
import { ResourceItem } from "../models/resource.model ";
import { NewsService } from "./news.service";
import { EventService } from "./event.service";
import { ResourcesService } from "./resources.service ";

export interface SearchResult {
  type: "news" | "event" | "resource";
  item: NewsItem | EventItem | ResourceItem;
  relevance: number;
}

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private newsService = inject(NewsService);
  private eventService = inject(EventService);
  private resourcesService = inject(ResourcesService);

  private readonly _query = signal("");
  private readonly _results = signal<SearchResult[]>([]);
  private readonly _isSearching = signal(false);

  readonly query = this._query.asReadonly();
  readonly results = this._results.asReadonly();
  readonly isSearching = this._isSearching.asReadonly();

  readonly hasResults = computed(() => this._results().length > 0);
  readonly hasQuery = computed(() => this._query().trim().length > 0);

  search(query: string): void {
    const trimmed = query.trim().toLowerCase();
    this._query.set(query);

    if (!trimmed) {
      this._results.set([]);
      this._isSearching.set(false);
      return;
    }

    this._isSearching.set(true);

    const allResults: SearchResult[] = [];

    // Search news
    this.newsService.news().forEach((news) => {
      const relevance = this.calculateRelevance(
        trimmed,
        news.title,
        news.excerpt,
        news.category,
      );
      if (relevance > 0) {
        allResults.push({ type: "news", item: news, relevance });
      }
    });

    // Search events
    this.eventService.events().forEach((event) => {
      const relevance = this.calculateRelevance(
        trimmed,
        event.title,
        event.content,
        event.location,
      );
      if (relevance > 0) {
        allResults.push({ type: "event", item: event, relevance });
      }
    });

    // Search resources
    this.resourcesService.resources().forEach((resource) => {
      const relevance = this.calculateRelevance(
        trimmed,
        resource.title,
        resource.excerpt,
        resource.slug,
      );
      if (relevance > 0) {
        allResults.push({ type: "resource", item: resource, relevance });
      }
    });

    // Sort by relevance (highest first)
    allResults.sort((a, b) => b.relevance - a.relevance);

    this._results.set(allResults);
    this._isSearching.set(false);
  }

  clear(): void {
    this._query.set("");
    this._results.set([]);
    this._isSearching.set(false);
  }

  private calculateRelevance(
    query: string,
    title: string,
    description?: string,
    category?: string,
  ): number {
    const titleLower = title.toLowerCase();
    const descLower = description?.toLowerCase() || "";
    const catLower = category?.toLowerCase() || "";

    let score = 0;

    // Title match (highest weight)
    if (titleLower === query) score += 100;
    else if (titleLower.startsWith(query)) score += 80;
    else if (titleLower.includes(query)) score += 60;

    // Description match
    if (descLower.includes(query)) score += 30;

    // Category match
    if (catLower && catLower.includes(query)) score += 20;

    // Word boundary matches get bonus
    const words = query.split(/\s+/);
    words.forEach((word) => {
      if (titleLower.includes(word)) score += 10;
      if (descLower.includes(word)) score += 5;
    });

    return score;
  }
}
