import { Component, inject, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScrollService } from '../../../core/services/scroll.service';
import { EventService } from '../../../core';
import { SearchOverlayComponent } from '../../../shared/components/search-overlay/search-overlay.component';


interface NavItem {
  label: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, SearchOverlayComponent],
  template: `
    <header>
      <nav class="container">
        <!-- <div class="logo" routerLink="/">BENHA ON</div> -->

        <div class="logo" routerLink="/">
        <span>B</span>
        <span>E</span>
        <span>N</span>
        <span>H</span>
        <span>A</span>
        <span>&nbsp;</span>
        <span>O</span>
        <span>N</span>
      </div>

        <button 
          class="mobile-menu-toggle" 
          (click)="toggleMobileMenu()"
          [attr.aria-expanded]="isMobileMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <i class="fas" [class.fa-bars]="!isMobileMenuOpen" [class.fa-times]="isMobileMenuOpen"></i>
        </button>

        <ul class="nav-links" [class.open]="isMobileMenuOpen">
          @for (item of navItems; track item.route) {
            <li>
              <a 
                [routerLink]="item.route" 
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: item.exact ?? false }"
                (click)="isMobileMenuOpen = false"
              >
                {{ item.label }}
              </a>
            </li>
          }
        </ul>

      <div class="search-bar">
          <input (click)="openSearch()" type="text" placeholder="Search">
          <i class="fas fa-search"></i>
      </div>

      </nav>
    </header>

    @if (isSearchOpen()) {
      <app-search-overlay />
    }
  `,
  styles: [`
    header {
      position: sticky;
      padding: 20px 0;
      border-bottom: 1px solid var(--border-color);
      background: var(--white);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    main {
      margin-top: 80px;
    }

    :host {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
    }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-weight: bold;
      font-size: 1.5rem;
      color: var(--dark-blue);
      cursor: pointer;
      letter-spacing: -0.5px;
      display: inline-flex;
    }

  .logo span {
    opacity: 0;
    transform: translateY(10px);
    display: inline-block;
    animation: letterReveal 0.5s ease forwards;
  }

  /* stagger delay */
  .logo span:nth-child(1) { animation-delay: 0.1s; }
  .logo span:nth-child(2) { animation-delay: 0.2s; }
  .logo span:nth-child(3) { animation-delay: 0.3s; }
  .logo span:nth-child(4) { animation-delay: 0.4s; }
  .logo span:nth-child(5) { animation-delay: 0.5s; }
  .logo span:nth-child(6) { animation-delay: 0.6s; }
  .logo span:nth-child(7) { animation-delay: 0.7s; }
  .logo span:nth-child(8) { animation-delay: 0.8s; }

  @keyframes letterReveal {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

    .nav-links {
      display: flex;
      list-style: none;
      gap: 25px;
      margin: 0;
      padding: 0;
    }

    .nav-links a {
      text-decoration: none;
      color: var(--dark-blue);
      font-size: 0.9rem;
      font-weight: 500;
      padding: 5px 0;
      position: relative;
      transition: color 0.2s;
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--dark-blue);
      transition: width 0.3s ease;
    }

    .nav-links a:hover::after,
    .nav-links a.active::after {
      width: 100%;
    }

    .nav-links a.active {
      font-weight: 700;
    }

    .search-bar {
      background: #f0f0f0;
      padding: 8px 15px;
      border-radius: 25px;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: box-shadow 0.2s;
    }

    .search-bar:focus-within {
      box-shadow: 0 0 0 2px var(--primary-orange);
    }

    .search-bar input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 0.9rem;
      width: 120px;
    }

    .search-bar i {
      color: var(--text-gray);
      cursor: pointer;
      transition: color 0.2s;
    }

    .search-bar i:hover {
      color: var(--dark-blue);
    }

    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: var(--dark-blue);
      cursor: pointer;
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .mobile-menu-toggle {
        display: block;
      }

      .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: var(--white);
        flex-direction: column;
        padding: 20px;
        gap: 15px;
        border-bottom: 1px solid var(--border-color);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .nav-links.open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .search-bar {
        display: none;
      }
    }
  `]
})
export class HeaderComponent {
  private scrollService = inject(ScrollService);

  isMobileMenuOpen = false;
  isSearchOpen = signal(false);

  navItems: NavItem[] = [
    { label: 'Home', route: '/', exact: true },
    { label: 'News', route: '/news' },
    { label: 'Events', route: '/events' },
    { label: 'Resources', route: '/resources' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' }
  ];

  constructor() {
    // Listen for overlay close events
    document.addEventListener('closeSearchOverlay', () => {
      this.isSearchOpen.set(false);
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openSearch(): void {
    this.isSearchOpen.set(true);
    this.isMobileMenuOpen = false;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    // Cmd/Ctrl + K to open search
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.openSearch();
    }

    // / to open search (if not in an input)
    if (event.key === '/' && !this.isInputFocused()) {
      event.preventDefault();
      this.openSearch();
    }
  }

  private isInputFocused(): boolean {
    const active = document.activeElement;
    return active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA' || active?.getAttribute('contenteditable') === 'true';
  }
}
