# Benha University Portal - Angular

A modern, responsive university portal built with Angular 17+ standalone components.

Try it live at https://abdulrhman-bahaa.github.io/benha-university-angular/

## Features

- **Standalone Components** - No NgModules, using Angular's latest component architecture
- **Signals** - Reactive state management with Angular Signals
- **Lazy Loading** - Route-level code splitting for optimal performance
- **Scroll Animations** - Intersection Observer-based reveal animations
- **Responsive Design** - Mobile-first approach with CSS Grid & Flexbox
- **TypeScript** - Full type safety throughout the application

## Project Structure

```
src/app/
├── core/
│   ├── models/          # TypeScript interfaces (News, Event, Category)
│   └── services/        # Injectable services with Signals
├── shared/
│   ├── components/      # Reusable UI components
│   ├── directives/      # Reveal & animation directives
│   └── pipes/           # Truncate pipe
├── features/
│   ├── layout/          # Header & Footer
│   ├── home/            # Home page with Hero, News, Events, Categories
│   ├── news/            # News list & detail pages
│   ├── events/          # Events list & detail pages
│   ├── resources/       # Resources page
│   ├── about/           # About page
│   ├── contact/         # Contact form page
│   └── category/        # Category filter page
└── app.component.ts     # Root component
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build
```

## Architecture Highlights

### Services with Signals
```typescript
// Reactive data that automatically updates the UI
private readonly _news = signal<NewsItem[]>([...]);
readonly news = this._news.asReadonly();
```

### Standalone Components
```typescript
@Component({
  standalone: true,
  imports: [RouterLink, TruncatePipe],
  // No module declarations needed!
})
```

### Lazy-Loaded Routes
```typescript
{
  path: 'news',
  loadComponent: () => import('./features/news/news.component')
    .then(m => m.NewsComponent)
}
```

### Custom Directives
- `appReveal` - Scroll-triggered fade-in animation
- `appAnimateOnScroll` - Animate.css integration with Intersection Observer

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)
