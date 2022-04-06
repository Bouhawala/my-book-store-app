import {createFeatureSelector, createSelector} from '@ngrx/store';
import {StoreEntity} from '../../store.module';
import {BookState} from './book.reducer';
import {selectedUserSelector} from "../user/user.selector";
import {Book, Books} from "../../../../types/book.type";

const bookStateSelector = createFeatureSelector<BookState>(StoreEntity.BOOK);

export const booksSelector = createSelector(bookStateSelector, state => state.entities);
export const selectedBookIdSelector = createSelector(bookStateSelector, state => state.selectedBookId);
export const selectedBookTitle = createSelector(booksSelector, selectedBookIdSelector, (books, selectedBookId) => books.find(book => book.id === selectedBookId)?.title);
export const selectedBookBySelectedUser = createSelector(booksSelector, selectedUserSelector,
  (books, user) => user?.books ? user.books.reduce((acc: Books, bookId: string | null) => {
    const book = books.find(book => book.id === bookId);
    book && acc.push(book);
    return acc;

  }, []) : []
)

export const selectedBookTitleBySelectedUser = createSelector(selectedBookBySelectedUser, (books) => books.map((book: Book) => book.title));



