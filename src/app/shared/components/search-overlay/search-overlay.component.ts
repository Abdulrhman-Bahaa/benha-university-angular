import { Component, inject, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService, SearchResult } from '../../../core/services/search.service';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-search-overlay',
  standalone: true,
  imports: [RouterLink, FormsModule, TruncatePipe, TitleCasePipe],
  template: `
    <div class="search-overlay" (click)="closeOverlay($event)">
      <div class="search-container" (click)="$event.stopPropagation()">
        <!-- Search Input -->
        <div class="search-input-wrapper">
          <i class="fas fa-search"></i>
          <input
            type="text"
            [value]="searchQuery()"
            (input)="onSearch($any($event.target).value)"
            (keydown.escape)="close()"
            placeholder="Search news, events, and more..."
            autofocus
            #searchInput
          >
          @if (searchQuery()) {
            <button class="clear-btn" (click)="clearSearch()">
              <i class="fas fa-times"></i>
            </button>
          }
          <button class="close-btn" (click)="close()">
            <i class="fas fa-times"></i> ESC
          </button>
        </div>

        <!-- Results -->
        <div class="search-results">
          @if (searchService.isSearching()) {
            <div class="loading">
              <i class="fas fa-spinner fa-spin"></i>
              <span>Searching...</span>
            </div>
          }

          @if (!searchService.isSearching() && searchService.hasQuery() && !searchService.hasResults()) {
            <div class="no-results">
              <i class="fas fa-search"></i>
              <p>No results found for "{{ searchQuery() }}"</p>
              <span>Try different keywords</span>
            </div>
          }

          @if (searchService.hasResults()) {
            <div class="results-list">
              <div class="results-header">
                <span>{{ results().length }} result{{ results().length !== 1 ? 's' : '' }}</span>
              </div>

              @for (result of results(); track result.item.id + result.type) {
                <a 
                  [routerLink]="getResultLink(result)" 
                  class="result-item"
                  (click)="close()"
                >
                  <div class="result-icon" [class.news]="result.type === 'news'" [class.event]="result.type === 'event'">
                    <i [class]="result.type === 'news' ? 'fas fa-newspaper' : 'fas fa-calendar'"></i>
                  </div>
                  <div class="result-content">
                    <span class="result-type">{{ result.type | titlecase }}</span>
                    <h4>{{ result.item.title }}</h4>
                  </div>
                  <i class="fas fa-arrow-right result-arrow"></i>
                </a>
              }
            </div>
          }

          @if (!searchService.hasQuery()) {
            <div class="search-hints">
              <h3>Popular Searches</h3>
              <div class="hint-tags">
                @for (hint of popularSearches; track hint) {
                  <button class="hint-tag" (click)="searchHint(hint)">
                    {{ hint }}
                  </button>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 80px;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .search-container {
      width: 100%;
      max-width: 640px;
      margin: 0 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .search-input-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-bottom: 1px solid #eee;
    }

    .search-input-wrapper > i:first-child {
      color: #999;
      font-size: 1.1rem;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 1.1rem;
      color: var(--dark-blue);
      background: transparent;
    }

    input::placeholder {
      color: #aaa;
    }

    .clear-btn {
      background: none;
      border: none;
      color: #999;
      cursor: pointer;
      padding: 4px;
      border-radius: 50%;
      transition: all 0.2s;
    }

    .clear-btn:hover {
      background: #f0f0f0;
      color: #666;
    }

    .close-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #f5f5f5;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.8rem;
      color: #666;
      cursor: pointer;
      transition: all 0.2s;
    }

    .close-btn:hover {
      background: #e5e5e5;
    }

    .search-results {
      max-height: 60vh;
      overflow-y: auto;
    }

    .loading, .no-results {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 40px 20px;
      color: #999;
    }

    .no-results i {
      font-size: 2.5rem;
      color: #ddd;
    }

    .no-results p {
      color: var(--dark-blue);
      font-weight: 500;
      margin: 0;
    }

    .results-header {
      padding: 12px 20px;
      font-size: 0.8rem;
      color: #999;
      border-bottom: 1px solid #f5f5f5;
    }

    .result-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      text-decoration: none;
      color: inherit;
      border-bottom: 1px solid #f5f5f5;
      transition: background 0.15s;
    }

    .result-item:hover {
      background: #fafafa;
    }

    .result-item:hover .result-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    .result-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .result-icon.news {
      background: #fff3e0;
      color: var(--primary-orange);
    }

    .result-icon.event {
      background: #e3f2fd;
      color: var(--dark-blue);
    }

    .result-content {
      flex: 1;
      min-width: 0;
    }

    .result-type {
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #999;
    }

    .result-content h4 {
      font-size: 0.95rem;
      color: var(--dark-blue);
      margin: 4px 0;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .result-content p {
      font-size: 0.85rem;
      color: #888;
      margin: 0;
      line-height: 1.4;
    }

    .result-arrow {
      color: #ccc;
      opacity: 0;
      transform: translateX(-8px);
      transition: all 0.2s;
    }

    .search-hints {
      padding: 20px;
    }

    .search-hints h3 {
      font-size: 0.85rem;
      color: #999;
      margin-bottom: 12px;
      font-weight: 500;
    }

    .hint-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .hint-tag {
      background: #f5f5f5;
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.9rem;
      color: var(--dark-blue);
      cursor: pointer;
      transition: all 0.2s;
    }

    .hint-tag:hover {
      background: var(--primary-orange);
      color: white;
    }

    @media (max-width: 640px) {
      .search-overlay {
        padding-top: 20px;
      }

      .close-btn span {
        display: none;
      }
    }
  `]
})
export class SearchOverlayComponent {
  searchService = inject(SearchService);

  searchQuery = this.searchService.query;
  results = this.searchService.results;

  popularSearches = ['Cybersecurity', 'Conference', 'Workshop', 'Graduate', 'Japan'];

  onSearch(searchQuery: string): void {
    this.searchService.search(searchQuery);
  }

  clearSearch(): void {
    this.searchService.clear();
  }

  searchHint(hint: string): void {
    this.searchService.search(hint);
  }

  getResultLink(result: SearchResult): string[] {
    if (result.type === 'news') {
      return ['/news', (result.item as any).slug];
    }
    return ['/events', (result.item as any).slug];
  }

  close(): void {
    this.searchService.clear();
    // Emit event to parent to close overlay
    document.dispatchEvent(new CustomEvent('closeSearchOverlay'));
  }

  closeOverlay(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }
}
