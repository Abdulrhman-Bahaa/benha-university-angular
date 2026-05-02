import { Component, inject, OnInit } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { NewsSectionComponent } from './components/news-section/news-section.component';
import { EventsSectionComponent } from './components/events-section/events-section.component';
import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    NewsSectionComponent,
    EventsSectionComponent,
    CategoriesSectionComponent
  ],
  template: `
    <app-hero />
    <app-news-section />
    <app-events-section />
    <app-categories-section />
  `
})
export class HomeComponent implements OnInit {
  private scrollService = inject(ScrollService);

  ngOnInit(): void {
    // Initialize smooth scrolling
    // this.scrollService.initSmoothScroll(0.8);
  }
}
