import {createAction, props} from '@ngrx/store';
import {User, Users} from '../../../../types/user.type';


export enum UserActionType {
  ADD_ONE_USER = '[USER] Add one user',
  SET_ALL_USER = '[USER] Set all users',
  SET_ONE_USER_ID = '[USER] Set one user id',
  SET_ONE_USER = '[USER] SET one user',
  UPDATE_USER = '[USER] Update ',
  DELETE_USER = '[USER] Delete'
}

export const addOneUserAction = createAction(UserActionType.ADD_ONE_USER, props<{user: User}>());
export const updateUserAction = createAction(UserActionType.UPDATE_USER, props<{ user: User}>());
export const setAllUserAction = createAction(UserActionType.SET_ALL_USER, props<{users: Users}>());
export const setSelectedUserIdAction = createAction(UserActionType.SET_ONE_USER_ID, props<{id: number}>());
export const setSelectedUserAction = createAction(UserActionType.SET_ONE_USER, props<{id: number}>());
export const deleteUserAction = createAction(UserActionType.DELETE_USER, props<{id: number}>());



