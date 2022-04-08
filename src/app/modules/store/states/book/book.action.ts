import {createAction, props} from '@ngrx/store';
import {Book, Books} from '../../../../types/book.type';

export enum BookActionType {
  ADD_ONE_BOOK = '[BOOK] Add one book',
  SET_ALL_BOOK = '[BOOK] Set all book',
  MODIFY_ONE_BOOK ='[BOOK] Modifiy one book',
  SET_BOOKS_BY_ID = '[BOOK] find books by array of id'
}

export const addOneBookAction = createAction(BookActionType.ADD_ONE_BOOK, props<{book: Book}>());
export const setAllBookAction = createAction(BookActionType.SET_ALL_BOOK, props<{books: Books}>());
export const setSelectedBookIdAction = createAction(BookActionType.SET_BOOKS_BY_ID,props<{id: number}>())
export const modifyOneBookAction = createAction(BookActionType.MODIFY_ONE_BOOK, props<{book: Book}>());
export const setBooksByIdAction = createAction(BookActionType.SET_BOOKS_BY_ID, props<{bookIds: number[]}>())
