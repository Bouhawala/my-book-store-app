import {Response} from './response.type';

export interface User extends Response {
  firstname: string;
  lastname: string;
  listOfBooksId: string[];
}

export type Users = User[];
