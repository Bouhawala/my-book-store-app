import {Response} from './response.type';

export interface Book extends Response {
  title: string;
  authors: string[];
}

export type Books = Book[];
