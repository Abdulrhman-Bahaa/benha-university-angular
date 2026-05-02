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

/**
 * Directive that adds animate.css classes when element enters viewport
 */
@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private observerService = inject(IntersectionObserverService);
  private hasInitialized = false;

  @Input() animation = 'animate__fadeInUp';
  @Input() delay = 0;
  @Input() threshold = 0.15;
  @Input() triggerOnce = true;

  private cleanupFn?: () => void;
  private hasAnimated = false;

  ngOnInit(): void {
    // Hide initially
    this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
    setTimeout(() => { this.initObserver(); }, 500);
  }
  private initObserver(): void {
    this.cleanupFn = this.observerService.observe(
      this.el.nativeElement,
      (isIntersecting, entry) => {

        if (isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;

          setTimeout(() => {
            this.renderer.setStyle(this.el.nativeElement, 'visibility', 'visible');
            this.renderer.addClass(this.el.nativeElement, 'animate__animated');
            this.renderer.addClass(this.el.nativeElement, this.animation);
          }, 50);
        }
      },
      { threshold: this.threshold, triggerOnce: this.triggerOnce }
    );
  }

  ngOnDestroy(): void {
    if (this.cleanupFn) {
      this.cleanupFn();
    }
  }
}
