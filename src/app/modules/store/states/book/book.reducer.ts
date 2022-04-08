import {Book, Books} from '../../../../types/book.type';
import {createReducer, on} from '@ngrx/store';
import {addOneBookAction, modifyOneBookAction, setAllBookAction, setBooksByIdAction} from './book.action';
import {act} from "@ngrx/effects";

export interface BookState {
  entities: Books;
  selectedBookId: number | null;
  selectedBooksIds: number[] ;
}

const initialBookState: BookState = {
  entities: [],
  selectedBookId: null,
  selectedBooksIds: []
}



export const bookReducer = createReducer(
  initialBookState,
  on(addOneBookAction, (state, action) => ({...state, entities: [...state.entities, action.book]})),
  on(setAllBookAction, (state, action) => ({...state, entities: action.books})),
  on(setBooksByIdAction, (state,action) => ({...state,}))
);

export  function updateEntities(entities: Books,book: Book){
  const elementIndex = entities.findIndex(b => b.id == book.id);
  entities[elementIndex] = book;
  return entities;
}


