import { RouterLink } from "@angular/router";
import {
  Component,
  inject,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { ScrollService } from "../../../../core/services/scroll.service";

@Component({
  selector: "app-hero",
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <video #video autoplay muted loop playsinline class="hero-video">
        <source src="assets/videos/hero.mp4" type="video/mp4" />
      </video>
      <div class="hero-overlay">
        <div class="container">
          <h1 class="animate__animated animate__fadeIn">
            Stay Updated With Benha University
          </h1>
          <a routerLink="/events" class="btn btn-primary pulse-animation">
            Explore Events
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
        font-size: 2.5rem;
        max-width: 500px;
        margin-bottom: 20px;
        color: var(--hero-color);
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
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: translate(-50%, -50%);
        z-index: 0;

        /* dark overlay for readability */
        background: rgba(0, 0, 0, 0.5);

        display: flex;
        align-items: left;
        color: var(--white);
      }

      .hero-overlay .container {
        position: absolute;
        top: 25%;
        left: 14%;
        width: 100%;
        height: 70%;
        text-align: left;
      }

      .hero-overlay h1 {
        font-size: 3rem;
        max-width: 700px;
        margin-bottom: 20px;
      }

      @media (max-width: 768px) {
        .hero {
          height: 300px;
        }

        h1 {
          font-size: 0.5rem;
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
