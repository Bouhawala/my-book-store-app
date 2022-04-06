import {Response} from './response.type';

export interface User extends Response {
  firstname: string;
  lastname: string;
  books?: string[];
  updateAt: number | Date;
  state: State;
}

export enum State {
  ACTIVE = 'Active',
  UNACTIVE = 'Unactive'
}

export type Users = User[];
