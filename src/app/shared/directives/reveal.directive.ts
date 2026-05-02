import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  inject,
  Renderer2
} from '@angular/core';
import { IntersectionObserverService } from '../../core/services/intersection-observer.service';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private observerService = inject(IntersectionObserverService);

  @Input() appRevealDelay = 0;
  @Input() appRevealThreshold = 0.15;
  @Input() appRevealAnimation = 'fadeInUp';

  private cleanupFn?: () => void;

  ngOnInit(): void {
    // Set initial state
    this.renderer.addClass(this.el.nativeElement, 'reveal');

    // Apply delay if specified
    if (this.appRevealDelay > 0) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'transition-delay',
        `${this.appRevealDelay}s`
      );
    }

    // Start observing
    this.cleanupFn = this.observerService.observe(
      this.el.nativeElement,
      (isIntersecting) => {
        if (isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'active');
        }
      },
      { threshold: this.appRevealThreshold, triggerOnce: true }
    );
  }

  ngOnDestroy(): void {
    if (this.cleanupFn) {
      this.cleanupFn();
    }
  }
}
