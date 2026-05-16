export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: any; // or Contentful Rich Text type
  source: string;
  coverUrl: string;
  category: string;
  slug: string;
}
