import {Book, Books} from '../../../../types/book.type';
import {createReducer, on} from '@ngrx/store';
import {addOneBookAction, setAllBookAction} from './book.action';

export interface BookState {
  entities: Books;
  selectedBookId: number | null;
}

const initialBookState: BookState = {
  entities: [],
  selectedBookId: null
}

export const bookReducer = createReducer(
  initialBookState,
  on(addOneBookAction, (state, action) => ({...state, entities: [...state.entities, action.book]})),
  on(setAllBookAction, (state, action) => ({...state, entities: action.books})),
);

export function updateEntities(entities: Books,book: Book){
  const elementIndex = entities.findIndex(b => b.id == book.id);
  entities[elementIndex] = book;
  return entities;
}
