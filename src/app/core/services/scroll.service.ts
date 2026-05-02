import { Injectable, inject, DestroyRef } from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private destroyRef = inject(DestroyRef);

  /**
   * Initializes smooth scrolling with custom multiplier
   */
  initSmoothScroll(multiplier: number = 0.8): void {
    fromEvent<WheelEvent>(document, 'wheel', { passive: false })
      .pipe(
        throttleTime(16), // ~60fps
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((e) => {
        e.preventDefault();
        window.scrollBy({
          top: e.deltaY * 100,
          left: 0,
          behavior: 'smooth'
        });
      });
  }

  /**
   * Scroll to element by selector
   */
  scrollToElement(selector: string): void {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
