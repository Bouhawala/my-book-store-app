import {createAction, props} from '@ngrx/store';
import {Book, Books} from '../../../types/book.type';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../../services/api.service';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {addOneBookAction, deleteBookAction, setAllBookAction, updateBookAction} from '../states/book/book.action';

enum BookEffectsActionType {
  FETCH_ALL_BOOKS = '[BOOK][EFFECTS] Fetch all books',
  FETCH_ALL_BOOKS_SUCCESS = '[BOOK][EFFECTS][SUCCESS] Fetch all books',
  FETCH_ALL_BOOKS_FAILURE = '[BOOK][EFFECTS][FAILURE] Fetch all books',
  SAVE_NEW_BOOK = '[BOOK][EFFECTS] Save new book',
  SAVE_NEW_BOOK_SUCCESS = '[BOOK][EFFECTS][SUCCESS] Save new book',
  SAVE_NEW_BOOK_FAILURE = '[BOOK][EFFECTS][FAILURE] Save new book',
  UPDATE_BOOK = '[BOOK][EFFECTS] Update book',
  UPDATE_BOOK_SUCCES = '[BOOK][EFFECTS][SUCCES] Update  book',
  UPDATE_BOOK_FAILURE = '[BOOK][EFFECTS][FAILURE] Update  book',
  DELETE_BOOK = '[BOOK][EFFECTS] Delete  book',
  DELETE_BOOK_SUCCES = '[BOOK][EFFECTS][SUCCES] Delete  book',
  DELETE_BOOK_FAILURE = '[BOOK][EFFECTS][FAILURE] Delete  book'
}

export const fetchAllBooksAction = createAction(BookEffectsActionType.FETCH_ALL_BOOKS);
export const fetchAllBooksSuccessAction = createAction(BookEffectsActionType.FETCH_ALL_BOOKS_SUCCESS, props<{ books: Books }>());
export const fetchAllBooksFailureAction = createAction(BookEffectsActionType.FETCH_ALL_BOOKS_FAILURE, props<{ code: number, reason: string }>());

export const saveNewBookAction = createAction(BookEffectsActionType.SAVE_NEW_BOOK, props<{book: Book}>());
export const saveNewBookSuccessAction = createAction(BookEffectsActionType.SAVE_NEW_BOOK_SUCCESS, props<{book: Book}>());
export const saveNewBookFailureAction = createAction(BookEffectsActionType.SAVE_NEW_BOOK_FAILURE, props<{ code: number, reason: string }>());

export const updateBookEffectAction = createAction(BookEffectsActionType.UPDATE_BOOK,props<{book: Book}>());
export const updateBookEffectSuccessAction = createAction(BookEffectsActionType.UPDATE_BOOK_SUCCES, props<{book: Book}>());
export const updateBookEffectFailureAction = createAction(BookEffectsActionType.UPDATE_BOOK_FAILURE, props<{ code: number, reason: string }>());

export const deleteBookEffectAction = createAction(BookEffectsActionType.DELETE_BOOK,props<{id: number}>());
export const deleteBookEffectSuccessAction = createAction(BookEffectsActionType.DELETE_BOOK_SUCCES, props<{id: number}>());
export const deleteBookEffectFailureAction = createAction(BookEffectsActionType.DELETE_BOOK_FAILURE, props<{ code: number, reason: string }>());

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
      mergeMap(action => this.apiService.addBook(action.book).pipe(
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

  updateBookEffect = createEffect(() => this.actions.pipe(
    ofType(updateBookEffectAction),
    mergeMap(action => this.apiService.updateBook(action.book).pipe(
      map(book => updateBookEffectSuccessAction({book})),
      catchError((error: HttpErrorResponse) => of(updateBookEffectFailureAction({
        code: error.status,
        reason: error.message
      })))
    ))
  )
);

updateBookSuccessEffect = createEffect(() => this.actions.pipe(
  ofType(updateBookEffectSuccessAction),
  map(action => updateBookAction({book: action.book}))
));

updateBookFailureEffect = createEffect(() => this.actions.pipe(
  ofType(updateBookEffectFailureAction),
  tap(action => console.warn(action))
), {dispatch: false});

deleteBookEffect = createEffect(() => this.actions.pipe(
    ofType(deleteBookEffectAction),
    mergeMap(action => this.apiService.removeBook(action.id).pipe(
      map(id => deleteBookEffectSuccessAction({id: action.id})),
      catchError((error: HttpErrorResponse) => of(deleteBookEffectFailureAction({
        code: error.status,
        reason: error.message
      })))
    ))
  )
);

deleteBookSuccessEffect = createEffect(() => this.actions.pipe(
  ofType(deleteBookEffectSuccessAction),
  map(action => deleteBookAction({id: action.id}))
));

deleteBookFailureEffect = createEffect(() => this.actions.pipe(
  ofType(deleteBookEffectFailureAction),
  tap(action => console.warn(action))
), {dispatch: false});

}
