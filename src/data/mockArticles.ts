export type ArticleStatus = 'Published' | 'Draft' | 'Scheduled';

export interface Article {
  id: number;
  publisher: string;
  headline: string;
  status: ArticleStatus;
  role: string;
  dateCreated: string;
}

const publishers = ['Sasha Sasmitha', 'Super Admin', 'John Doe', 'Jane Smith'];
const roles = ['Contributor', 'Admin', 'Editor'];
const statuses: ArticleStatus[] = ['Published', 'Draft', 'Scheduled'];

export const mockArticles: Article[] = Array.from({ length: 55 }, (_, i) => ({
  id: i + 1,
  publisher: publishers[Math.floor(Math.random() * publishers.length)],
  headline: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Article ${i + 1}`,
  status: statuses[Math.floor(Math.random() * statuses.length)],
  role: roles[Math.floor(Math.random() * roles.length)],
  dateCreated: 'Monday, 27 Jan 2025',
}));
