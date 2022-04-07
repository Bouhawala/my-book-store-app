import {asyncScheduler, Observable, of, queueScheduler, scheduled, throwError} from 'rxjs';
import {Action, ActionCreator} from '@ngrx/store';
import {catchError, mergeMap, retry, startWith} from 'rxjs/operators';
import {v4 as uuidv4} from 'uuid';
import {HttpResponse} from '@angular/common/http';
import {forEach} from 'lodash';

/**
 * HTTP CLIENT CALL WRAPPER
 * It simplify NgRx effects boilerplate by automatically passing global actions and catching errors
 * NOTE : Use the effect pattern : action, success, failure
 */
export function httpWrapper(
  httpResponse: Observable<HttpResponse<any>>,
  successAction: ActionCreator<string, any>,
  failureAction: ActionCreator<string, any>): Observable<Action> {

  const requestId = uuidv4();
  return httpResponse.pipe(
    retry(3),
    mergeMap(response => response?.body?.errors?.length ? throwError(response) : of(response)),
    mergeMap(response => scheduled<Action>([
        successAction(response.body),
      ], asyncScheduler)
    ),
    catchError(response => {
      const actions: Action[] = [failureAction(response.error)];
      return scheduled<Action>(actions, queueScheduler);
    }),
    startWith()
  );
}


