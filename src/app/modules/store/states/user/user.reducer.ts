import {createReducer, on} from '@ngrx/store';
import {
  addOneUserAction, deleteUserAction,
  setAllUserAction,
  setSelectedUserIdAction,
  updateUserAction
} from './user.action';
import {Users} from 'src/app/types/user.type';

export interface UserState {
  entities: Users;
  selectedUserId: number | null;
}

const initialUserState: UserState = {
  entities: [],
  selectedUserId: null,
}

export const userReducer = createReducer(
  initialUserState,
  on(addOneUserAction, (state, action) => (
      {
        ...state,
        entities: [...state.entities, action.user]
      }
    )
  ),
  on(setAllUserAction, (state, action) => ({...state, entities: action.users})),
  on(setSelectedUserIdAction,(state,action) => ({...state,selectedUserId: action.id})),
  on(updateUserAction,(state,action) => {
    const updatedUser = state.entities.map(user => {
      return action.user.id === user.id ? action.user : user;
    })
      return  {
        ...state,
        entities: updatedUser
      }}),
  on(deleteUserAction, (state,action) => {
    const updatedUsers = state.entities.filter(user => {
      return user.id !== action.id
    })
    return {
      ...state, entities: updatedUsers
    }}))
