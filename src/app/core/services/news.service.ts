import { Injectable, signal } from "@angular/core";
import { NewsItem } from "../models/news.model";
import { ContentfulService } from "./contentful.service";
import { inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NewsService {
  private contentfulService = inject(ContentfulService);
  private readonly _news = signal<NewsItem[]>([]);

  constructor() {
    this.contentfulService.getNews().subscribe((news) => {
      this._news.set(news);
    });
  }

  readonly news = this._news.asReadonly();

  getNewsBySlug(slug: string): NewsItem | undefined {
    return this._news().find((item) => item.slug === slug);
  }
}
