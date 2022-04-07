import {Response} from './response.type';

export interface User extends Response {
  firstname: string;
  lastname: string;
  books?: string[];
}

export type Users = User[];
