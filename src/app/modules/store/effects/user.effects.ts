import {Action, createAction, props} from '@ngrx/store';
import {User, Users} from '../../../types/user.type';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../../services/api.service';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {addOneUserAction, deleteUserAction, setAllUserAction, updateUserAction} from '../states/user/user.action';

enum UserEffectsActionType {
  FETCH_ALL_USER = '[USER][EFFECTS] Fetch all USER',
  FETCH_ALL_USER_SUCCESS = '[USER][EFFECTS][SUCCESS] Fetch all USER',
  FETCH_ALL_USER_FAILURE = '[USER][EFFECTS][FAILURE] Fetch all USER',
  SAVE_NEW_USER = '[USER][EFFECTS] Save new user',
  SAVE_NEW_USER_SUCCESS = '[USER][EFFECTS][SUCCESS] Save new user',
  SAVE_NEW_USER_FAILURE = '[USER][EFFECTS][FAILURE] Save new user',
  UPDATE_USER = '[USER][EFFECTS] Update  user',
  UPDATE_USER_SUCCES = '[USER][EFFECTS][SUCCES] Update  user',
  UPDATE_USER_FAILURE = '[USER][EFFECTS][FAILURE] Update  user',
  DELETE_USER = '[USER][EFFECTS] Delete  user',
  DELETE_USER_SUCCES = '[USER][EFFECTS][SUCCES] Delete  user',
  DELETE_USER_FAILURE = '[USER][EFFECTS][FAILURE] Delete  user'
}

export const fetchAllUsersAction = createAction(UserEffectsActionType.FETCH_ALL_USER);
export const fetchAllUsersSuccessAction = createAction(UserEffectsActionType.FETCH_ALL_USER_SUCCESS, props<{ users: Users }>());
export const fetchAllUsersFailureAction = createAction(UserEffectsActionType.FETCH_ALL_USER_FAILURE, props<{ code: number, reason: string }>());

export  const saveNewUserAction = createAction(UserEffectsActionType.SAVE_NEW_USER, props<{user: User}>());
export  const saveNewUserSuccessAction = createAction(UserEffectsActionType.SAVE_NEW_USER_SUCCESS, props<{user: User}>());
export  const saveNewUserFailureAction = createAction(UserEffectsActionType.SAVE_NEW_USER_FAILURE, props<{ code: number, reason: string }>());

export const  updateUserEffectAction = createAction(UserEffectsActionType.UPDATE_USER,props<{user: User}>());
export  const updateUserEffectSuccessAction = createAction(UserEffectsActionType.UPDATE_USER_SUCCES, props<{user: User}>());
export  const updateUserEffectFailureAction = createAction(UserEffectsActionType.UPDATE_USER_FAILURE, props<{ code: number, reason: string }>());

export const  deleteUserEffectAction = createAction(UserEffectsActionType.DELETE_USER,props<{id: number}>());
export  const deleteUserEffectSuccessAction = createAction(UserEffectsActionType.DELETE_USER_SUCCES, props<{id: number}>());
export  const deleteUserEffectFailureAction = createAction(UserEffectsActionType.DELETE_USER_FAILURE, props<{ code: number, reason: string }>());

@Injectable()
export class UserEffects {
  constructor(private readonly actions: Actions, private readonly apiService: ApiService) {
  }

  fetchAllUsers: Observable<Action> = createEffect(() => this.actions.pipe(
      ofType(fetchAllUsersAction),
      mergeMap(action => this.apiService.getUsers().pipe(
        map(users => fetchAllUsersSuccessAction({users})),
        catchError((error: HttpErrorResponse) => of(fetchAllUsersFailureAction({
          code: error.status,
          reason: error.message
        })))
      ))
    )
  );

  fetchAllUserSuccess = createEffect(() => this.actions.pipe(
    ofType(fetchAllUsersSuccessAction),
    map(action => setAllUserAction({users: action.users}))
  ));

  fetchAllUserFailure = createEffect(() => this.actions.pipe(
    ofType(fetchAllUsersFailureAction),
    tap(action => console.warn(action))
  ), {dispatch: false});

  saveNewUserEffect = createEffect(() => this.actions.pipe(
      ofType(saveNewUserAction),
      mergeMap(action => this.apiService.addUser(action.user).pipe(
        map(user => saveNewUserSuccessAction({user})),
        catchError((error: HttpErrorResponse) => of(saveNewUserFailureAction({
          code: error.status,
          reason: error.message
        })))
      ))
    )
  );

  saveNewUserSuccesEffect = createEffect(() => this.actions.pipe(
    ofType(saveNewUserSuccessAction),
    map(action => addOneUserAction({user: action.user}))
  ));

  saveNewUserFailureEffect = createEffect(() => this.actions.pipe(
    ofType(saveNewUserFailureAction),
    tap(action => console.warn(action))
  ), {dispatch: false});

  updateUserEffect = createEffect(() => this.actions.pipe(
      ofType(updateUserEffectAction),
      mergeMap(action => this.apiService.updateUser(action.user).pipe(
        map(user => updateUserEffectSuccessAction({user})),
        catchError((error: HttpErrorResponse) => of(updateUserEffectFailureAction({
          code: error.status,
          reason: error.message
        })))
      ))
    )
  );

  updateUserSuccessEffect = createEffect(() => this.actions.pipe(
    ofType(updateUserEffectSuccessAction),
    map(action => updateUserAction({user: action.user}))
  ));

  updateUserFailureEffect = createEffect(() => this.actions.pipe(
    ofType(updateUserEffectFailureAction),
    tap(action => console.warn(action))
  ), {dispatch: false});

  deleteUserEffect = createEffect(() => this.actions.pipe(
      ofType(deleteUserEffectAction),
      mergeMap(action => this.apiService.removeUser(action.id).pipe(
        map(id => deleteUserEffectSuccessAction({id: action.id})),
        catchError((error: HttpErrorResponse) => of(deleteUserEffectFailureAction({
          code: error.status,
          reason: error.message
        })))
      ))
    )
  );

  deleteUserSuccessEffect = createEffect(() => this.actions.pipe(
    ofType(deleteUserEffectSuccessAction),
    map(action => deleteUserAction({id: action.id}))
  ));

  deleteUserFailureEffect = createEffect(() => this.actions.pipe(
    ofType(deleteUserEffectFailureAction),
    tap(action => console.warn(action))
  ), {dispatch: false});

}
