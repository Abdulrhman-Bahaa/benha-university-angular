import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Home - Benha University'
  },
  {
    path: 'news',
    loadComponent: () => import('./features/news/news.component').then(m => m.NewsComponent),
    title: 'News - Benha University'
  },
  {
    path: 'news/:slug',
    loadComponent: () => import('./features/news/news-detail.component').then(m => m.NewsDetailComponent),
    title: 'News Details - Benha University'
  },
  {
    path: 'events',
    loadComponent: () => import('./features/events/events.component').then(m => m.EventsComponent),
    title: 'Events - Benha University'
  },
  {
    path: 'events/:slug',
    loadComponent: () => import('./features/events/event-detail.component').then(m => m.EventDetailComponent),
    title: 'Event Details - Benha University'
  },
  {
    path: 'resources',
    loadComponent: () => import('./features/resources/resources.component').then(m => m.ResourcesComponent),
    title: 'Resources - Benha University'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'About - Benha University'
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact - Benha University'
  },
  {
    path: 'category/:slug',
    loadComponent: () => import('./features/category/category.component').then(m => m.CategoryComponent),
    title: 'Category - Benha University'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
