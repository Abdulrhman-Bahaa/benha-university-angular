export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  // content?: string;
  imageUrl: string;
  category?: string;
  date?: Date;
  slug: string;
}
