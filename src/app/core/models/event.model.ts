export interface EventItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: any; // or Contentful Rich Text type
  coverUrl: string;
  category: EventCategory;
  location: string;
  slug: string;
}

export enum EventCategory {
  Sport = "Sport",
  Cultural = "Cultural",
  Tech = "Tech",
  Art = "Art",
}
