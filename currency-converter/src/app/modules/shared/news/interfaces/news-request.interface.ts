import { newsType } from '../types';

export interface INewsRequest {
  category: newsType;
  data: {
    author: string,
    content: string,
    date: string,
    imageUrl: string,
    readMoreUrl: string,
    time: string,
    title: string,
    url: string,
  }[];
}
