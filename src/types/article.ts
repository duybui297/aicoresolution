export type ArticleStatus = 'Published' | 'Draft' | 'Scheduled' | 'Deleted' | 'Archived' | 'Unknown';

export interface Article {
  id: number;
  publisher: string;
  headline: string;
  status: ArticleStatus;
  role: string;
  dateCreated: string;
  rawDate?: string | Date;
}
