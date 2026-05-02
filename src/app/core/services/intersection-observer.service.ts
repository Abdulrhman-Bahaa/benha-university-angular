import { Injectable } from '@angular/core';

export interface ObserverConfig {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class IntersectionObserverService {
  private observers = new Map<Element, IntersectionObserver>();

  observe(
    element: Element,
    callback: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void,
    config: ObserverConfig = {}
  ): () => void {
    const { threshold = 0.15, rootMargin = '0px', triggerOnce = false } = config;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          callback(entry.isIntersecting, entry);
          if (triggerOnce && entry.isIntersecting) {
            this.unobserve(element);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    this.observers.set(element, observer);

    return () => this.unobserve(element);
  }

  unobserve(element: Element): void {
    const observer = this.observers.get(element);
    if (observer) {
      observer.unobserve(element);
      observer.disconnect();
      this.observers.delete(element);
    }
  }

  disconnectAll(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
  }
}
