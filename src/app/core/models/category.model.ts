import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

export interface Category {
  id: number;
  name: string;
  icon: SafeHtml;
  slug: string;
  color?: string;
}
