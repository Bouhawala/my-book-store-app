import {createFeatureSelector, createSelector} from '@ngrx/store';
import {StoreEntity} from '../../store.module';
import { UserState } from './user.reducer';

const userStateSelector = createFeatureSelector<UserState>(StoreEntity.USER);
export const usersSelector = createSelector(userStateSelector, state => state.entities);
export const selectedUserIdSelector = createSelector(userStateSelector, state => state.selectedUserId);
export const selectedUserSelector = createSelector(usersSelector, selectedUserIdSelector, (users, userId) => users && users.find(user => user.id === userId)
);
