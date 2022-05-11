export interface INews {
  id: number,
  type: 'news' | 'post';
  title: string;
  description: string;
  content: string;
  postCreationDate: Date;
  preview?: string;
  source?: string;
  commentsCount?: number;
}
