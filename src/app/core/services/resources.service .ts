import { Injectable, signal } from "@angular/core";
import { ResourceItem } from "../models/resource.model ";
import { inject } from "@angular/core";
import { computed } from "@angular/core";
import { Signal } from "@angular/core";
import { ContentfulService } from "./contentful.service";
import { Category } from "../models/category.model";

@Injectable({
  providedIn: "root",
})
export class ResourcesService {
  // Using signals for reactive state management
  private contentfulService = inject(ContentfulService);
  private readonly _resources = signal<ResourceItem[]>([]);

  private readonly _categories = signal<Category[]>([
    { id: 1, name: "Guides", icon: "", slug: "guides", color: "#4CAF50" },
    { id: 2, name: "Tools", icon: "", slug: "tools", color: "#2196F3" },
    { id: 3, name: "Articles", icon: "", slug: "articles", color: "#FF9800" },
    { id: 4, name: "Videos", icon: "", slug: "videos", color: "#9C27B0" },
    { id: 5, name: "PDFs", icon: "", slug: "pdfs", color: "#F44336" },
  ]);

  constructor() {
    this.contentfulService.getResources().subscribe((resources) => {
      this._resources.set(resources);
    });
  }

  readonly resources = this._resources.asReadonly();
  readonly categories = this._categories.asReadonly();

  getResourceById(id: number): ResourceItem | undefined {
    return this._resources().find((item) => item.id === id);
  }

  getResourceBySlug(slug: string): ResourceItem | undefined {
    return this._resources().find((item) => item.slug === slug);
  }

  getResourcesByCategory(category: string): Signal<ResourceItem[]> {
    return computed(() =>
      this._resources().filter((item) => item.category === category),
    );
  }
}
