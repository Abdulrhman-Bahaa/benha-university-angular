import { Injectable, signal } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly _categories = signal<Category[]>([
    { id: 1, name: 'SPORT', icon: 'fas fa-table-tennis-paddle-ball', slug: 'sport' },
    { id: 2, name: 'ART', icon: 'fas fa-palette', slug: 'art' },
    { id: 3, name: 'CULTURE', icon: 'fas fa-book-open', slug: 'culture' },
    { id: 4, name: 'TECH', icon: 'fas fa-microchip', slug: 'tech' }
  ]);

  readonly categories = this._categories.asReadonly();

  getCategoryBySlug(slug: string): Category | undefined {
    return this._categories().find(cat => cat.slug === slug);
  }
}
