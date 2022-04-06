import {createReducer, on} from '@ngrx/store';
import {
  addOneUserAction,
  deleteUserAction,
  setAllUserAction,
  setSelectedUserIdAction,
  updateUserAction
} from './user.action';
import {User} from 'src/app/types/user.type';

export interface UserState {
  entities: any;
  selectedUserId: string | null;
}

const initialUserState: UserState = {
  entities: [],
  selectedUserId: null
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
  on(setAllUserAction, (state, {users}) => ({...state, entities: users})),
  on(setSelectedUserIdAction, (state, action) => ({...state, selectedUserId: action.id})),
  on(updateUserAction, (state, {user}) => ({
    ...state,
    entities: [user, ...state.entities]
  })),
  on(deleteUserAction, (state, action) => {
    const updatedUsers = state.entities.filter((u: User) => {
      return u.id !== action.id;
    });
    return {
      ...state,
      entities: updatedUsers
    };
  })
);
