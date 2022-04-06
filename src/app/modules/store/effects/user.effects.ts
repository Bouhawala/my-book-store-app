import {createAction, props} from '@ngrx/store';
import {User, Users} from '../../../types/user.type';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../../services/api.service';
// @ts-ignore
import * as _map from 'lodash/map';
import {exhaustMap, map} from 'rxjs/operators';
import {addOneUserAction, deleteUserAction, setAllUserAction, updateUserAction} from '../states/user/user.action';
import {JsonApiResponse} from "../../../types/json-api";
import {httpWrapper} from "../../../utils/http-wrapper.util";

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
export const fetchAllUsersSuccessAction = createAction(UserEffectsActionType.FETCH_ALL_USER_SUCCESS, (response: JsonApiResponse<Users>) => ({data: response.data}));
export const fetchAllUsersFailureAction = createAction(UserEffectsActionType.FETCH_ALL_USER_FAILURE);

export const saveNewUserAction = createAction(UserEffectsActionType.SAVE_NEW_USER, props<{ user: User }>());
export const saveNewUserSuccessAction = createAction(UserEffectsActionType.SAVE_NEW_USER_SUCCESS, (response: JsonApiResponse<User>) => ({data: response.data}));
export const saveNewUserFailureAction = createAction(UserEffectsActionType.SAVE_NEW_USER_FAILURE);

export const updateUserEffectAction = createAction(UserEffectsActionType.UPDATE_USER, props<{ user: User }>());
export const updateUserEffectSuccessAction = createAction(UserEffectsActionType.UPDATE_USER_SUCCES, (response: JsonApiResponse<User>) => ({data: response.data}));
export const updateUserEffectFailureAction = createAction(UserEffectsActionType.UPDATE_USER_FAILURE);

export const deleteUserEffectAction = createAction(UserEffectsActionType.DELETE_USER, props<{ id: string | number | undefined }>());
export const deleteUserEffectSuccessAction = createAction(UserEffectsActionType.DELETE_USER_SUCCES, (response: User) => ({user: response}));
export const deleteUserEffectFailureAction = createAction(UserEffectsActionType.DELETE_USER_FAILURE);

@Injectable()
export class UserEffects {

  fetchAllUsers = createEffect(() => this.actions.pipe(
    ofType(fetchAllUsersAction),
    exhaustMap(() => httpWrapper(this.apiService.getUsers(), fetchAllUsersSuccessAction, fetchAllUsersFailureAction))
  ));
  fetchAllUsersSuccess = createEffect(() => this.actions.pipe(
    ofType(fetchAllUsersSuccessAction),
    map(action => setAllUserAction({
      users: action.data.map(entity => ({id: entity.id, ...entity.attributes}))
    }))
  ));
  saveNewUserEffect = createEffect(() => this.actions.pipe(
    ofType(saveNewUserAction),
    exhaustMap(action => httpWrapper(this.apiService.addUser(action.user), saveNewUserSuccessAction, saveNewUserFailureAction))
  ));
  saveNewUserSuccessEffect = createEffect(() => this.actions.pipe(
    ofType(saveNewUserSuccessAction),
    map(action => addOneUserAction({
      user: action.data.attributes
    }))
  ));
  archiveUserEffect = createEffect(() => this.actions.pipe(
    ofType(deleteUserEffectAction),
    exhaustMap(action => httpWrapper(this.apiService.removeUser(action.id), deleteUserEffectSuccessAction, deleteUserEffectFailureAction))
  ));
  archiveUserSuccessEffect = createEffect(() => this.actions.pipe(
    ofType(deleteUserEffectSuccessAction),
    map(action => deleteUserAction({
      id: action.user.id
    }))
  ))
  updateUserEffect = createEffect(() => this.actions.pipe(
    ofType(updateUserEffectAction),
    exhaustMap(action => httpWrapper(this.apiService.updateUser(action.user.id, action.user), updateUserEffectSuccessAction, updateUserEffectFailureAction))
  ))
  updateUserEffectSuccess = createEffect(() => this.actions.pipe(
    ofType(updateUserEffectSuccessAction),
    map((action) => updateUserAction({
      user: action.data.attributes
    }))
  ));

  constructor(private readonly actions: Actions, private readonly apiService: ApiService) {
  }

  /* saveNewUserSuccesEffect = createEffect(() => this.actions.pipe(
     ofType(saveNewUserSuccessAction),
     map(action => addOneUserAction({user: action.user}))
   ));*/


  /*


    updateUserEffect = createEffect(() => this.actions.pipe(
        ofType(updateUserEffectAction),
        concatMap(({user}) => this.apiService.updateUser(user).pipe(
          map(() => updateUserEffectSuccessAction({user})),
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


  */


}
