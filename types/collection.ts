import { Picture } from 'types/strapi';

export interface Article {
  Title: string;
  Description: string;
  Content: string;
  PublishedAt: string;
  Status: string;
  Slug: string;
  author: Author;
  tags: Tag[];
}

export interface Author {
  Name: string;
  Email: string;
  Picture: Picture;
}

export interface Tag {
  Name: string;
  Slug: string;
}
