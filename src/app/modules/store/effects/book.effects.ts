import {createAction, props} from '@ngrx/store';
import {Book, Books} from '../../../types/book.type';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../../services/api.service';
import {exhaustMap, map} from 'rxjs/operators';
import {addOneBookAction, setAllBookAction} from '../states/book/book.action';
import {JsonApiResponse} from "../../../types/json-api";
import {httpWrapper} from "../../../utils/http-wrapper.util";

enum BookEffectsActionType {
  FETCH_ALL_BOOKS = '[BOOK][EFFECTS] Fetch all books',
  FETCH_ALL_BOOKS_SUCCESS = '[BOOK][EFFECTS][SUCCESS] Fetch all books',
  FETCH_ALL_BOOKS_FAILURE = '[BOOK][EFFECTS][FAILURE] Fetch all books',
  SAVE_NEW_BOOK = '[BOOK][EFFECTS] Save new book',
  SAVE_NEW_BOOK_SUCCESS = '[BOOK][EFFECTS][SUCCESS] Save new book',
  SAVE_NEW_BOOK_FAILURE = '[BOOK][EFFECTS][FAILURE] Save new book'
}

export const fetchAllBooksAction = createAction(BookEffectsActionType.FETCH_ALL_BOOKS);
export const fetchAllBooksSuccessAction = createAction(BookEffectsActionType.FETCH_ALL_BOOKS_SUCCESS, (response: Books) => ({data: response}));
export const fetchAllBooksFailureAction = createAction(BookEffectsActionType.FETCH_ALL_BOOKS_FAILURE);


export const saveNewBookAction = createAction(BookEffectsActionType.SAVE_NEW_BOOK, props<{ book: Book }>());
export const saveNewBookSuccessAction = createAction(BookEffectsActionType.SAVE_NEW_BOOK_SUCCESS, (response: JsonApiResponse<Book>) => ({data: response.data}));
export const saveNewBookFailureAction = createAction(BookEffectsActionType.SAVE_NEW_BOOK_FAILURE);

@Injectable()
export class BookEffects {

  fetchAllBooks = createEffect(() => this.actions.pipe(
    ofType(fetchAllBooksAction),
    exhaustMap(() => httpWrapper(this.apiService.getBooks(), fetchAllBooksSuccessAction, fetchAllBooksFailureAction))
  ));
  fetchAllBooksSuccess = createEffect(() => this.actions.pipe(
    ofType(fetchAllBooksSuccessAction),
    map(action => setAllBookAction({
      books: action.data.map(entity => ({id: entity.id, title: entity.title, author: entity.author}))
    }))
  ));

  saveNewBookEffect = createEffect(() => this.actions.pipe(
    ofType(saveNewBookAction),
    exhaustMap(action => httpWrapper(this.apiService.addOneBook(action.book), saveNewBookSuccessAction, saveNewBookFailureAction))
  ));

  saveNewBookSuccessEffect = createEffect(() => this.actions.pipe(
    ofType(saveNewBookSuccessAction),
    map(action => addOneBookAction({
      book: action.data.attributes
    }))
  ));


  /* saveNewBookEffect = createEffect(() => this.actions.pipe(
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
   ), {dispatch: false});*/

  constructor(private readonly actions: Actions, private readonly apiService: ApiService) {
  }


}
