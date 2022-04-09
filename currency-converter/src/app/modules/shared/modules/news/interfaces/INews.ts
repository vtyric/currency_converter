export interface INews {
  id: number,
  type: 'news' | 'post';
  title: string;
  description: string;
  postCreationDate: Date;
  preview?: string;
}
