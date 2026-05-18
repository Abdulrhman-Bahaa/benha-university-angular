export interface ResourceItem {
  id: number;
  title: string;
  excerpt: string;
  coverUrl: string;
  category: ResourceCategory;
  materialLink: string;
  slug: string;
}

export enum ResourceCategory {
  Guides = "Guides",
  Tools = "Tools",
  Articles = "Articles",
  Videos = "Videos",
  PDFs = "PDFs",
}
