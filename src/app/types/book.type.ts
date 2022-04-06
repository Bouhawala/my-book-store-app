import {Response} from './response.type';

export interface Book extends Response {
  title: string;
  author?: string;
  updateAt: number | Date;
  state: State;
}

export enum State {
  ACTIVE = 'Active',
  UNACTIVE = 'Unactive'
}

export type Books = Book[];
