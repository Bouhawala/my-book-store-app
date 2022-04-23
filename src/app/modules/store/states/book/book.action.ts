import {createAction, props} from '@ngrx/store';
import {Book, Books} from '../../../../types/book.type';

export enum BookActionType {
  ADD_ONE_BOOK = '[BOOK] Add one book',
  SET_ALL_BOOK = '[BOOK] Set all book',
  SET_ONE_BOOK_ID = '[BOOK] Set one book id',
  SET_ONE_BOOK = '[BOOK] SET one book',
  UPDATE_BOOK = '[BOOK] Update ',
  DELETE_BOOK = '[BOOK] Delete'
}

export const addOneBookAction = createAction(BookActionType.ADD_ONE_BOOK, props<{book: Book}>());
export const updateBookAction = createAction(BookActionType.UPDATE_BOOK, props<{book: Book}>());
export const setAllBookAction = createAction(BookActionType.SET_ALL_BOOK, props<{books: Books}>());
export const setSelectedBookIdAction = createAction(BookActionType.SET_ONE_BOOK_ID, props<{id: number}>());
export const setSelectedBookAction = createAction(BookActionType.SET_ONE_BOOK, props<{id: number}>());
export const deleteBookAction = createAction(BookActionType.DELETE_BOOK, props<{id: number}>());

