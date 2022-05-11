export interface INewsRequest {
  id: number,
  title: string,
  url: string,
  imageUrl: string,
  newsSite: string,
  summary: string,
  publishedAt: string,
  updatedAt: string,
  featured: boolean,
  launches: [
    {
      id: string,
      provider: string
    }
  ],
  events: []
}
