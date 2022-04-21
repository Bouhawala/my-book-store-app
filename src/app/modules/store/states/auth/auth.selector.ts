import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreEntity } from '../../store.module';
import { AuthState } from './auth.reducer';

// get the `auth` property from the state object
export const getAuthFeatureState = createFeatureSelector<AuthState>(StoreEntity.AUTH);

// get the userProfile from the auth state
export const selectCurrentUserProfile = createSelector(getAuthFeatureState, state => state.userProfile);

// get the isLoggedIn from the auth state
export const selectIsLoggedIn = createSelector(getAuthFeatureState, state => state.isLoggedIn);