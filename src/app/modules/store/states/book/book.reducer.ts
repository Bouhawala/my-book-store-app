import {Book, Books} from '../../../../types/book.type';
import {createReducer, on} from '@ngrx/store';
import {addOneBookAction, deleteBookAction, setAllBookAction, setSelectedBookIdAction, updateBookAction} from './book.action';

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
  on(setSelectedBookIdAction,(state,action) => ({...state,selectedBookId: action.id})),
  on(updateBookAction,(state,action) => {
    const updatedBook = state.entities.map(book => {
      return action.book.id === book.id ? action.book : book;
    })
      return  {
        ...state,
        entities: updatedBook
      }}),
  on(deleteBookAction, (state,action) => {
    const updatedBooks = state.entities.filter(book => {
      return book.id !== action.id
    })
    return {
      ...state, entities: updatedBooks
    }})
);
