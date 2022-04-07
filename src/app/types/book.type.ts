import {Response} from './response.type';

export interface Book extends Response {
  title: string;
  author?: string;
}

export type Books = Book[];
