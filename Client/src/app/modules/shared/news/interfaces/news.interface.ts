export interface INews {
    id: number,
    type: 'news' | 'post';
    title: string;
    description: string;
    content: string;
    postCreationDate: Date;
    commentsCount: number;
    preview?: string;
    source?: string;
}
