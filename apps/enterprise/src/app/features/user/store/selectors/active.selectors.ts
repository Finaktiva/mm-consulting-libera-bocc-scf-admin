import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from '../reducers';

const selectUserFeatureState = createFeatureSelector<UserState>('user');

export const getActiveUserId = createSelector(
    selectUserFeatureState,
    state => (state ? state.active : null)
);
