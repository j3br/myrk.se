import { AstroComponentFactory } from "astro/dist/runtime/server";

export interface Post {
  id: string;
  slug: string;
  permalink: string;

  publishDate: Date;
  updateDate?: Date;

  title: string;
  excerpt?: string;
  image?: string;

  category?: string;
  tags?: Array<string>;
  author?: string;

  draft?: boolean;

  Content?: AstroComponentFactory;
  content?: string;

  readingTime?: number;
}
