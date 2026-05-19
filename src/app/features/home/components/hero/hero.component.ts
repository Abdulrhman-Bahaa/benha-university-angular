import { RouterLink } from "@angular/router";
import {
  Component,
  inject,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
@Component({
  selector: "app-hero",
  standalone: true,
  imports: [RouterLink, TranslateModule],
  template: `
    <section class="hero">
      <video #video autoplay muted loop playsinline class="hero-video">
        <source src="assets/videos/hero.mp4" type="video/mp4" />
      </video>
      <div class="hero-overlay">
        <div class="container">
          <h1 class="animate__animated animate__fadeIn">
            {{ "HERO.TITLE" | translate }}
          </h1>

          <a routerLink="/events" class="btn btn-primary pulse-animation">
            {{ "HERO.BUTTON" | translate }}
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        // background: url('assets/images/hero-bg.jpg') center/cover;
        height: 80vh;
        position: relative;
        overflow: hidden;
      }

      .hero h1 {
        font-size: 3rem;
        max-width: 700px;
        margin-bottom: 20px;
        color: var(--hero-color);
        overflow-wrap: break-word;
        word-break: break-word;
      }

      /* VIDEO */
      .hero-video {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: translate(-50%, -50%);
        z-index: 0;
      }

      .hero-overlay {
        position: absolute;
        inset: 0; /* replaces top/left/width/height */
        z-index: 0;

        background: rgba(0, 0, 0, 0.5);

        display: flex;
        align-items: center;
        justify-content: center;

        color: var(--white);
      }

      [dir="ltr"] .hero-overlay .container {
        align-items: flex-start;
        text-align: left;
      }

      [dir="rtl"] .hero-overlay .container {
        align-items: flex-end;
        text-align: right;
      }

      @media (max-width: 768px) {
        .hero {
          height: 300px;
        }

        .hero h1 {
          font-size: 1.8rem;
        }
      }
    `,
  ],
})
export class HeroComponent {
  @ViewChild("video") video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const vid = this.video.nativeElement;

    vid.muted = true;

    vid.play().catch(() => {
      console.log("Autoplay blocked");

      // fallback if autoplay fails
      document.addEventListener("click", () => vid.play(), { once: true });
    });
  }
}
