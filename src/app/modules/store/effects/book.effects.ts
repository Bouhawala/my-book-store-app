import {createAction, props} from '@ngrx/store';
import {Book, Books} from '../../../types/book.type';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../../services/api.service';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {addOneBookAction, setAllBookAction} from '../states/book/book.action';

enum BookEffectsActionType {
  FETCH_ALL_BOOKS = '[BOOK][EFFECTS] Fetch all books',
  FETCH_ALL_BOOKS_SUCCESS = '[BOOK][EFFECTS][SUCCESS] Fetch all books',
  FETCH_ALL_BOOKS_FAILURE = '[BOOK][EFFECTS][FAILURE] Fetch all books',
  SAVE_NEW_BOOK = '[BOOK][EFFECTS] Save new book',
  SAVE_NEW_BOOK_SUCCESS = '[BOOK][EFFECTS][SUCCESS] Save new book',
  SAVE_NEW_BOOK_FAILURE = '[BOOK][EFFECTS][FAILURE] Save new book'
}

export const fetchAllBooksAction = createAction(BookEffectsActionType.FETCH_ALL_BOOKS);
export const fetchAllBooksSuccessAction = createAction(BookEffectsActionType.FETCH_ALL_BOOKS_SUCCESS, props<{ books: Books }>());
export const fetchAllBooksFailureAction = createAction(BookEffectsActionType.FETCH_ALL_BOOKS_FAILURE, props<{ code: number, reason: string }>());

export  const saveNewBookAction = createAction(BookEffectsActionType.SAVE_NEW_BOOK, props<{book: Book}>());
export  const saveNewBookSuccessAction = createAction(BookEffectsActionType.SAVE_NEW_BOOK_SUCCESS, props<{book: Book}>());
export  const saveNewBookFailureAction = createAction(BookEffectsActionType.SAVE_NEW_BOOK_FAILURE, props<{ code: number, reason: string }>());

@Injectable()
export class BookEffects {

  constructor(private readonly actions: Actions, private readonly apiService: ApiService) {}

  fetchAllBooks = createEffect(() => this.actions.pipe(
      ofType(fetchAllBooksAction),
      mergeMap(action => this.apiService.getBooks().pipe(
        map(books => fetchAllBooksSuccessAction({books})),
        catchError((error: HttpErrorResponse) => of(fetchAllBooksFailureAction({
          code: error.status,
          reason: error.message
        })))
      ))
    )
  );

  fetchAllBooksSuccess = createEffect(() => this.actions.pipe(
    ofType(fetchAllBooksSuccessAction),
    map(action => setAllBookAction({books: action.books}))
  ));

  fetchAllBooksFailure = createEffect(() => this.actions.pipe(
    ofType(fetchAllBooksFailureAction),
    tap(action => console.warn(action))
  ), {dispatch: false});

  saveNewBookEffect = createEffect(() => this.actions.pipe(
      ofType(saveNewBookAction),
      mergeMap(action => this.apiService.addOneBook(action.book).pipe(
        map(book => saveNewBookSuccessAction({book})),
        catchError((error: HttpErrorResponse) => of(saveNewBookFailureAction({
          code: error.status,
          reason: error.message
        })))
      ))
    )
  );

  saveNewBookSuccessEffect = createEffect(() => this.actions.pipe(
    ofType(saveNewBookSuccessAction),
    map(action => addOneBookAction({book: action.book}))
  ));

  saveNewBookFailureEffect = createEffect(() => this.actions.pipe(
    ofType(saveNewBookFailureAction),
    tap(action => console.warn(action))
  ), {dispatch: false});

}
