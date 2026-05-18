import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { NewsItem } from "../models/news.model";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { EventItem } from "../models/event.model";
import { ResourceItem } from "../models/resource.model ";

@Injectable({
  providedIn: "root",
})
export class ContentfulService {
  private baseUrl =
    "https://cdn.contentful.com/spaces/y8fhg5wrxobw/environments/master";
  private token = "sM5agB11Wf1XoH_ZCxlRPZa8IkfAnPb-QaE8Cs80RG4";

  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsItem[]> {
    const url = `${this.baseUrl}/entries?access_token=${this.token}&content_type=news`;

    return this.http.get<any>(url).pipe(map((res) => this.transformNews(res)));
  }

  getEvents(): Observable<EventItem[]> {
    const url = `${this.baseUrl}/entries?access_token=${this.token}&content_type=event`;

    return this.http
      .get<any>(url)
      .pipe(map((res) => this.transformEvents(res)));
  }

  getResources(): Observable<ResourceItem[]> {
    const url = `${this.baseUrl}/entries?access_token=${this.token}&content_type=resource`;

    return this.http
      .get<any>(url)
      .pipe(map((res) => this.transformResources(res)));
  }

  private resolveCover(item: any, assets: any[]): string {
    const coverAssetId = item.fields.cover?.sys?.id;
    const cover = assets.find((a: any) => a.sys.id === coverAssetId);
    return cover ? "https:" + cover.fields.file.url : "";
  }

  private transformNews(res: any): NewsItem[] {
    const assets = res.includes?.Asset || [];

    return res.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      date: item.fields.date,
      excerpt: item.fields.excerpt,
      content: documentToHtmlString(item.fields.content),
      source: item.fields.source,
      category: item.fields.category,
      slug: item.fields.slug,
      coverUrl: this.resolveCover(item, assets),
    }));
  }

  private transformEvents(res: any): EventItem[] {
    const assets = res.includes?.Asset || [];

    return res.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      date: item.fields.date,
      content: documentToHtmlString(item.fields.content),
      excerpt: item.fields.excerpt,
      category: item.fields.category,
      location: item.fields.location,
      slug: item.fields.slug,
      coverUrl: this.resolveCover(item, assets),
    }));
  }

  private transformResources(res: any): ResourceItem[] {
    const assets = res.includes?.Asset || [];

    return res.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      excerpt: item.fields.excerpt,
      coverUrl: this.resolveCover(item, assets),
      category: item.fields.category,
      materialLink: item.fields.materialLink,
      slug: item.fields.slug,
    }));
  }
}
