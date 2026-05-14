export type ArticleStatus = 'Published' | 'Draft' | 'Scheduled' | 'Deleted' | 'Archived' | 'Unknown' | 'Waiting for approval' | 'Approved' | 'Rejected' | 'UnPublished';

export interface Article {
  id: number;
  publisher: string;
  headline: string;
  status: ArticleStatus;
  role: string;
  dateCreated: string;
  rawDate?: string | Date;
}
