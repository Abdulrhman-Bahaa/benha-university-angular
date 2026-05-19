import { Component, inject, signal, HostListener, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ScrollService } from "../../../core/services/scroll.service";
import { EventService, NewsService } from "../../../core";
import { SearchOverlayComponent } from "../../../shared/components/search-overlay/search-overlay.component";
import { ContentfulService } from "../../../core/services/contentful.service";
import { ResourcesService } from "../../../core/services/resources.service ";

interface NavItem {
  label: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, SearchOverlayComponent],
  template: `
    <header>
      <nav class="container">
        <div class="logo" routerLink="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="61"
            fill="none"
            viewBox="0 0 60 61"
          >
            <path
              class="draw"
              fill="#132a4d"
              d="M34.91 50.765a18.465 18.465 0 0 1-14.547 10.14c-1.558.166-5.27.331-9.411-1.524-4.905-2.22-8.119-6.33-9.51-9.908C.48 46.955.214 44.27.115 43.443a26.5 26.5 0 0 1-.033-4.574c3.943 0 7.886 0 11.797.033v4.871c-2.088.034-4.176.034-6.23.067.066.828.232 2.021.696 3.346.132.365.894 2.519 2.684 4.44 2.054 2.221 5.633 4.375 10.04 4.11 5.07-.298 8.119-3.612 8.682-4.275.464-.53 3.115-3.612 3.214-8.284a13.2 13.2 0 0 0-.663-4.374c2.121.033 4.275.033 6.396.066-.53.497-3.016 2.95-3.148 6.826-.066 2.42.895 4.242 1.358 5.07M42.034 30.883c-1.69 1.723-2.916 3.215-4.573 4.938-4.672.033-14.216 0-18.855.033H.182v-4.937c14.315-.034 27.537 0 41.852-.034M54.261 60.971c-.033-7.488.033-14.745 0-22.234H59.1c0 7.422-.033 14.812-.033 22.234-1.59.034-3.181.034-4.805 0M9.99 4.904V.066c9.544-.132 18.822 0 28.332 0-1.623 1.624-2.883 3.215-4.54 4.838-7.886.033-15.938-.033-23.791 0M40.476 0H59.1v4.838H45.645A691 691 0 0 1 40.477 0"
            />
            <path
              class="draw"
              fill="#132a4d"
              d="m24.703 42.58-3.843 4.143-4.143-3.844a474 474 0 0 1 3.877-4.142c1.326 1.259 2.718 2.551 4.11 3.844M59.1 12.36h-4.806c-.033 3.645-.066 7.157-.066 10.803-2.286 0-4.606-.034-6.892-.034V12.36h-4.838v10.736c-2.485 0-4.938.033-7.423.033a16.8 16.8 0 0 0-1.425-5.633c-.596-1.292-2.021-4.042-5.003-6.362a17 17 0 0 0-3.944-2.287 17.06 17.06 0 0 0-7.488-1.192c-2.85.232-5.037 1.16-6.296 1.855.033 1.458.066 2.95.132 4.407 1.094-.695 2.75-1.59 4.937-1.888.63-.1 1.193-.1 1.724-.1.033 0-.961.066-2.055.464-1.889.663-2.982 2.055-3.247 2.42a7 7 0 0 0-1.094 2.087 7.9 7.9 0 0 0-.53 2.617c0 1.657.63 2.916 1.027 3.612-2.286-.033-4.54 0-6.826-.033V.033C3.363.066 1.806.066.182.1v27.935h34.43c.53-.63 1.06-1.16 1.59-1.79.596.63 1.16 1.16 1.756 1.79h7.489c.596-.63 1.193-1.226 1.79-1.856.563.596 1.093 1.226 1.656 1.822 1.856 0 3.181 0 5.037.034h5.202c0-5.302-.033-10.372-.033-15.674M18.307 22.533a3.11 3.11 0 0 1-3.115-3.115 3.11 3.11 0 0 1 3.115-3.115 3.11 3.11 0 0 1 3.115 3.115c-.033 1.723-1.425 3.115-3.115 3.115m6.462.596c.232-.397.497-1.027.695-1.822.564-2.32-.132-4.208-.265-4.573-.497-1.326-1.259-2.154-1.623-2.552-1.293-1.325-2.916-1.756-2.883-1.822s.795.133 1.69.497c.563.232 2.684 1.193 4.54 3.512 1.789 2.188 2.32 4.375 2.452 4.872.165.762.232 1.425.265 1.888zM58.933 35.224c-.695.299-1.458.166-1.988-.331-.43-.398-.63-1.06-.43-1.657.264-.895 1.16-1.127 1.292-1.16.497-.132.928 0 1.093.066v-1.988c-.232 0-.563 0-.928.034a5 5 0 0 0-1.16.198c-.43.133-1.557.497-2.22 1.59-.298.465-.364.929-.397 1.061-.199 1.226.398 2.187.563 2.452-.43 0-.895-.033-1.325 0v1.657h5.5zM51.18 33.203l-3.844 4.142-4.142-3.844c1.292-1.392 2.584-2.783 3.877-4.142a435 435 0 0 0 4.109 3.844M45.845 38.737a8.8 8.8 0 0 0-2.22-.365 7.34 7.34 0 0 0-6.43 3.81c-.761 1.591-.86 3.05-.86 3.282-.034.63-.1 1.888.463 3.247 1.226 3.015 4.308 4.01 4.772 4.142a7.64 7.64 0 0 0 3.81.166c-.132.198-.298.464-.53.762-.099.1-.497.596-1.16 1.126a7.4 7.4 0 0 1-2.385 1.227c-1.823.53-3.413.132-4.11-.1.398 1.524.796 3.082 1.16 4.606.697.199 1.823.398 3.182.331 1.06-.066 3.214-.331 5.335-1.822a10.5 10.5 0 0 0 2.485-2.485c1.325-1.89 1.657-3.712 1.889-5.037.265-1.59.232-2.817.199-3.579-.1-1.988-.133-3.446-.961-5.103-.067-.199-1.624-3.247-4.64-4.208m.795 10.04a7.7 7.7 0 0 1-2.85.365c-.596-.034-1.127-.1-1.657-.431-1.027-.63-1.325-1.69-1.358-1.856-.033-.199-.299-1.259.331-2.352.133-.233.663-1.028 1.657-1.326.132-.033 1.392-.43 2.452.331.464.332.696.73.928 1.127.43.762.53 1.491.596 1.988.033.497.067 1.26-.1 2.154"
            />
            <path
              class="draw"
              fill="#132a4d"
              d="m43.525 5.865-3.844 4.142-4.142-3.844c1.292-1.391 2.585-2.783 3.877-4.142 1.359 1.26 2.75 2.552 4.109 3.844"
            />
          </svg>
        </div>

        <button
          class="mobile-menu-toggle"
          (click)="toggleMobileMenu()"
          [attr.aria-expanded]="isMobileMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <i
            class="fas"
            [class.fa-bars]="!isMobileMenuOpen"
            [class.fa-times]="isMobileMenuOpen"
          ></i>
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
          <input (click)="openSearch()" type="text" placeholder="Search" />
          <i class="fas fa-search"></i>
        </div>

        <div class="spacer"></div>

        <div>
          <button
            class="language-toggle"
            type="button"
            (click)="toggleLanguage()"
            aria-label="Toggle language"
          >
            <i class="fas fa-globe-americas"></i>
          </button>
          <button
            class="theme-toggle"
            type="button"
            (click)="toggleTheme()"
            aria-label="Toggle dark mode"
          >
            <i
              class="fas"
              [class.fa-moon]="!isDarkMode()"
              [class.fa-sun]="isDarkMode()"
            ></i>
          </button>
        </div>
      </nav>
    </header>

    @if (isSearchOpen()) {
      <app-search-overlay />
    }
  `,
  styles: [
    `
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

      .logo svg path {
        fill: var(--dark-blue) !important;
      }

      .draw {
        animation: draw 2s forwards;
      }

      path:nth-child(1) {
        animation-delay: 0s;
      }

      path:nth-child(2) {
        animation-delay: 0.5s;
      }

      path:nth-child(3) {
        animation-delay: 1s;
      }

      .logo span {
        opacity: 0;
        transform: translateY(10px);
        display: inline-block;
        animation: letterReveal 0.5s ease forwards;
      }

      /* stagger delay */
      .logo span:nth-child(1) {
        animation-delay: 0.1s;
      }
      .logo span:nth-child(2) {
        animation-delay: 0.2s;
      }
      .logo span:nth-child(3) {
        animation-delay: 0.3s;
      }
      .logo span:nth-child(4) {
        animation-delay: 0.4s;
      }
      .logo span:nth-child(5) {
        animation-delay: 0.5s;
      }
      .logo span:nth-child(6) {
        animation-delay: 0.6s;
      }
      .logo span:nth-child(7) {
        animation-delay: 0.7s;
      }
      .logo span:nth-child(8) {
        animation-delay: 0.8s;
      }

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
        content: "";
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
        background: var(--bg-light);
        padding: 8px 15px;
        border-radius: 25px;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: box-shadow 0.2s;
      }

      .theme-toggle,
      .language-toggle {
        margin-left: 12px;
        background: var(--bg-light);
        border: 1px solid var(--border-color);
        color: var(--dark-blue);
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .theme-toggle:hover,
      .language-toggle:hover {
        background: var(--white);
        transform: translateY(-1px);
      }

      // .language-toggle {
      //   margin-right: auto;
      // }

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
    `,
  ],
})
export class HeaderComponent implements OnInit {
  private scrollService = inject(ScrollService);
  private contentfulService = inject(ContentfulService);
  private newsService = inject(NewsService);
  private eventService = inject(EventService);
  private resourcesService = inject(ResourcesService);

  isMobileMenuOpen = false;
  isSearchOpen = signal(false);
  isDarkMode = signal(false);

  navItems: NavItem[] = [
    { label: "Home", route: "/", exact: true },
    { label: "News", route: "/news" },
    { label: "Events", route: "/events" },
    { label: "Resources", route: "/resources" },
    { label: "About", route: "/about" },
    { label: "Contact", route: "/contact" },
  ];

  constructor() {
    // Listen for overlay close events
    document.addEventListener("closeSearchOverlay", () => {
      this.isSearchOpen.set(false);
    });
  }

  ngOnInit(): void {
    this.setTheme(this.getInitialTheme());
  }

  toggleTheme(): void {
    this.setTheme(!this.isDarkMode());
  }

  toggleLanguage(): void {
    const currentLang = this.contentfulService.locale;
    const newLang = currentLang === "en-US" ? "ar-EG" : "en-US";
    this.contentfulService.locale =
      this.contentfulService.locale === "en-US" ? "ar-EG" : "en-US";
    this.newsService.loadNews();
    this.eventService.loadEvents();
    this.resourcesService.loadResources();
    localStorage.setItem("benha-language", newLang);
  }

  private getInitialTheme(): boolean {
    const storedTheme = localStorage.getItem("benha-theme");
    if (storedTheme === "dark") {
      return true;
    }
    if (storedTheme === "light") {
      return false;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  private setTheme(darkMode: boolean): void {
    this.isDarkMode.set(darkMode);
    document.documentElement.classList.toggle("dark-theme", darkMode);
    document.body.classList.toggle("dark-theme", darkMode);
    localStorage.setItem("benha-theme", darkMode ? "dark" : "light");
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openSearch(): void {
    this.isSearchOpen.set(true);
    this.isMobileMenuOpen = false;
  }

  @HostListener("document:keydown", ["$event"])
  onKeydown(event: KeyboardEvent): void {
    // Cmd/Ctrl + K to open search
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault();
      this.openSearch();
    }

    // / to open search (if not in an input)
    if (event.key === "/" && !this.isInputFocused()) {
      event.preventDefault();
      this.openSearch();
    }
  }

  private isInputFocused(): boolean {
    const active = document.activeElement;
    return (
      active?.tagName === "INPUT" ||
      active?.tagName === "TEXTAREA" ||
      active?.getAttribute("contenteditable") === "true"
    );
  }
}
