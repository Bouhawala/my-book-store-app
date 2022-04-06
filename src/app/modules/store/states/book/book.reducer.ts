import {Book, Books} from '../../../../types/book.type';
import {createReducer, on} from '@ngrx/store';
import {addOneBookAction, setAllBookAction, setBooksByIdAction} from './book.action';

export interface BookState {
  entities: Books;
  selectedBookId: string | null;
  selectedBooksIds: string[];
}

const initialBookState: BookState = {
  entities: [],
  selectedBookId: null,
  selectedBooksIds: []
}


export const bookReducer = createReducer(
  initialBookState,
  on(addOneBookAction, (state, action) => ({...state, entities: [...state.entities, action.book]})),
  on(setAllBookAction, (state, {books}) => ({...state, entities: books})),
  on(setBooksByIdAction, (state, action) => ({...state,}))
);

export function updateEntities(entities: Books, book: Book) {
  const elementIndex = entities.findIndex(b => b.id == book.id);
  entities[elementIndex] = book;
  return entities;
}
