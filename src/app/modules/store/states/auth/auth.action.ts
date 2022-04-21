import { createAction, props } from '@ngrx/store';

export enum AuthActionType {
    AUTH_CHECK_AUTH = '[Auth] check Auth',
    AUTH_LOGIN = '[Auth] login',
    AUTH_LOGIN_COMPLETE = '[Auth] login complete',
    AUTH_LOGOUT = '[Auth] logout',
    AUTH_LOGOUT_COMPLETE = '[Auth] logout complete'
  }

export const checkAuthAction = createAction(AuthActionType.AUTH_CHECK_AUTH);
export const loginAction = createAction(AuthActionType.AUTH_LOGIN);
export const loginCompleteAction = createAction(AuthActionType.AUTH_LOGIN_COMPLETE,
                                          props<{ profile: any; isLoggedIn: boolean }>());
export const logoutAction = createAction(AuthActionType.AUTH_LOGOUT);
export const logoutCompleteAction = createAction(AuthActionType.AUTH_LOGOUT_COMPLETE);