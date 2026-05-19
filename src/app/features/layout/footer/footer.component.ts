import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AnimateOnScrollDirective } from "../../../shared/directives/animate-on-scroll.directive";
import { TranslateModule } from "@ngx-translate/core";

interface QuickLink {
  label: string;
  route: string;
}

interface ContactInfo {
  icon: string;
  value: string;
  href: string;
  type: "email" | "phone";
}

interface SocialLink {
  icon: string;
  url: string;
  label: string;
}

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [RouterLink, AnimateOnScrollDirective, TranslateModule],
  template: `
    <footer>
      <div class="container footer-grid">
        <!-- Brand Info -->
        <div class="footer-info">
          <h3 appAnimateOnScroll animation="animate__fadeInLeft">
            {{ "FOOTER.BRAND_NAME" | translate }}
          </h3>
          <p appAnimateOnScroll animation="animate__fadeInUp">
            {{ "FOOTER.BRAND_TAGLINE" | translate }}
          </p>
          <p appAnimateOnScroll animation="animate__fadeInUp" class="copyright">
            {{ "FOOTER.COPYRIGHT" | translate }}
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 appAnimateOnScroll animation="animate__fadeInLeft">
            {{ "FOOTER.QUICK_LINKS" | translate }}
          </h3>
          <ul class="quick-links">
            @for (link of quickLinks; track link.route) {
              <li appAnimateOnScroll animation="animate__fadeInUp">
                <a [routerLink]="link.route">{{ link.label | translate }}</a>
              </li>
            }
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="contact-info">
          <h3 appAnimateOnScroll animation="animate__fadeInLeft">
            {{ "FOOTER.CONTACT_INFO" | translate }}
          </h3>
          <div class="contact-items">
            @for (contact of contacts; track contact.href) {
              <div class="contact-item">
                <i
                  appAnimateOnScroll
                  animation="animate__fadeInUp"
                  [class]="contact.icon"
                ></i>
                <a
                  appAnimateOnScroll
                  animation="animate__fadeInUp"
                  [href]="contact.href"
                  >{{ contact.value }}</a
                >
              </div>
            }
          </div>
        </div>

        <!-- Social Links -->
        <div class="socials">
          <h3 appAnimateOnScroll animation="animate__fadeInLeft">
            {{ "FOOTER.SOCIAL_LINKS" | translate }}
          </h3>
          <div class="social-icons">
            @for (social of socialLinks; track social.url) {
              <a
                [href]="social.url"
                target="_blank"
                rel="noopener noreferrer"
                [attr.aria-label]="social.label"
                appAnimateOnScroll
                animation="animate__fadeInLeft"
              >
                <i [class]="social.icon"></i>
              </a>
            }
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        background: var(--dark-blue);
        color: var(--white);
        padding: 50px 0;
        margin-top: 50px;
      }

      .footer-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1.5fr 1fr;
        gap: 40px;
        font-size: 0.85rem;
      }

      h3 {
        margin-bottom: 15px;
        font-size: 1rem;
        color: var(--white);
        font-weight: 600;
      }

      .footer-info p {
        opacity: 0.8;
        line-height: 1.6;
        margin-bottom: 5px;
      }

      .copyright {
        margin-top: 10px;
        font-size: 0.8rem;
        opacity: 0.6;
      }

      .quick-links {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .quick-links li {
        margin-bottom: 8px;
        opacity: 0;
      }

      .quick-links li:nth-child(1) {
        animation-delay: 0.1s;
      }
      .quick-links li:nth-child(2) {
        animation-delay: 0.25s;
      }
      .quick-links li:nth-child(3) {
        animation-delay: 0.4s;
      }
      .quick-links li:nth-child(4) {
        animation-delay: 0.55s;
      }

      .quick-links a {
        color: var(--white);
        text-decoration: none;
        opacity: 0.8;
        transition:
          opacity 0.2s,
          color 0.2s;
        display: inline-block;
      }

      .quick-links a:hover {
        opacity: 1;
        color: var(--primary-orange);
      }

      .contact-items {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .contact-item {
        display: flex;
        align-items: center;
        gap: 12px;
        opacity: 0;
        animation: fadeInUp 0.6s ease forwards;
      }

      .contact-item:nth-child(1) {
        animation-delay: 0.2s;
      }
      .contact-item:nth-child(2) {
        animation-delay: 0.35s;
      }

      .contact-item i {
        font-size: 1rem;
        color: var(--white);
        width: 20px;
        text-align: center;
      }

      .contact-item a {
        color: var(--white);
        text-decoration: none;
        opacity: 0.9;
        transition:
          opacity 0.2s,
          color 0.2s;
      }

      .contact-item a:hover {
        opacity: 1;
        color: var(--primary-orange);
      }

      .social-icons {
        display: flex;
        gap: 15px;
      }

      .social-icons a {
        color: var(--white);
        font-size: 1.2rem;
        transition:
          transform 0.2s,
          color 0.2s;
        display: inline-block;
        opacity: 0;
        // animation: fadeInRight 0.6s ease forwards;
      }

      .social-icons a:nth-child(1) {
        animation-delay: 0.3s;
      }
      .social-icons a:nth-child(2) {
        animation-delay: 0.45s;
      }
      .social-icons a:nth-child(3) {
        animation-delay: 0.6s;
      }
      .social-icons a:nth-child(4) {
        animation-delay: 0.75s;
      }

      .social-icons a:hover {
        transform: scale(1.2);
        color: var(--primary-orange);
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeInRight {
        from {
          opacity: 0;
          transform: translateX(-15px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      /* Mobile Responsive */
      @media (max-width: 768px) {
        .footer-grid {
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
      }

      @media (max-width: 480px) {
        .footer-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks: QuickLink[] = [
    { label: "NAV.HOME", route: "/" },
    { label: "NAV.EVENTS", route: "/events" },
    { label: "NAV.RESOURCES", route: "/resources" },
    { label: "NAV.ABOUT", route: "/about" },
  ];

  contacts: ContactInfo[] = [
    {
      icon: "fas fa-envelope",
      value: "benhaon25@gmail.com",
      href: "mailto:benhaon25@gmail.com",
      type: "email",
    },
    {
      icon: "fas fa-phone-alt",
      value: "01020939477",
      href: "tel:01020939477",
      type: "phone",
    },
  ];

  socialLinks: SocialLink[] = [
    { icon: "fab fa-tiktok", url: "#", label: "TikTok" },
    { icon: "fab fa-facebook", url: "#", label: "Facebook" },
    { icon: "fab fa-instagram", url: "#", label: "Instagram" },
    { icon: "fab fa-twitter", url: "#", label: "Twitter" },
  ];
}
