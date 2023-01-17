import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from '../reducers';

const selectUserFeatureState = createFeatureSelector<UserState>('user');

const getCreateState = createSelector(
    selectUserFeatureState,
    state => (state ? state.create : null)
);

export const isCreatingUser = createSelector(
    getCreateState,
    state => (state ? state.submitting : false)
);

export const getCreateUserError = createSelector(
    getCreateState,
    state => (state ? state.error : null)
);
