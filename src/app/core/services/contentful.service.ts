import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { NewsItem } from "../models/news.model";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

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

    return this.http.get<any>(url).pipe(map((res) => this.transform(res)));
  }

  private transform(res: any): NewsItem[] {
    const assets = res.includes?.Asset || [];

    return res.items.map((item: any) => {
      const coverAssetId = item.fields.cover?.sys?.id;

      const cover = assets.find((a: any) => a.sys.id === coverAssetId);

      return {
        id: item.sys.id,
        title: item.fields.title,
        date: item.fields.date,
        excerpt: item.fields.excerpt,
        content: documentToHtmlString(item.fields.content),
        source: item.fields.source,
        category: item.fields.category,
        slug: item.fields.slug,

        coverUrl: cover ? "https:" + cover.fields.file.url : "",
      } as NewsItem;
    });
  }
}
