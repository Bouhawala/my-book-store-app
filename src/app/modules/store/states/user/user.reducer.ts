import {createReducer, on} from '@ngrx/store';
import {
  addOneUserAction, deleteUserAction,
  setAllUserAction,
  setSelectedUserIdAction,
  updateUserAction
} from './user.action';
import {User, Users} from 'src/app/types/user.type';
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {Book, Books} from "../../../../types/book.type";

export interface UserState {
  entities: Users;
  selectedUserId: number | null;
}

const initialUserState: UserState = {
  entities: [],
  selectedUserId: null
}
export const adapter: EntityAdapter<User> = createEntityAdapter<User>();


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


      return  {
        ...state,
        entities: [...updateEntitiesUsers(state.entities,action.user)]
      }

  }



  ),
  on(deleteUserAction, (state,action) => {


    return {
      ...state,...state.entities.filter(user => user.id !== action.id)
    }

  }))

export  function updateEntitiesUsers(entities: Users,user: User){
  const elementIndex = entities.findIndex(u => u.id == user.id);
  entities[elementIndex] = user;
  return entities;
}
