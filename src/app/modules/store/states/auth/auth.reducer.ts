import { Action, createReducer, on } from '@ngrx/store';
import { loginCompleteAction, logoutCompleteAction } from './auth.action';

export interface AuthState {
  userProfile: any;
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  userProfile: null,
  isLoggedIn: false,
};

const authReducerInternal = createReducer(
    initialState,
    on(loginCompleteAction, (state, { profile, isLoggedIn }) => {
      return {
        ...state,
        userProfile: profile,
        isLoggedIn,
      };
    }),
    on(logoutCompleteAction, (state, {}) => {
      return {
        ...state,
        userProfile: null,
        isLoggedIn: false,
      };
    })
  );

  export function authReducer(state: AuthState | undefined, action: Action): AuthState {
    return authReducerInternal(state, action);
  }