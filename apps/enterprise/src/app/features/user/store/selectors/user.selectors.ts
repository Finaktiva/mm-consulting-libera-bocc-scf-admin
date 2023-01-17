import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from '../reducers';
import { getActiveUserId } from './active.selectors';

const selectUserFeatureState = createFeatureSelector<UserState>('user');

const getListState = createSelector(
    selectUserFeatureState,
    state => (state ? state.list : null)
);

const getEntities = createSelector(
    selectUserFeatureState,
    state => (state ? state.entities : null)
);

export const hasLoadedUserList = createSelector(
    getListState,
    state => (state ? state.loaded : false)
);

export const isLoadingUserList = createSelector(
    getListState,
    state => (state ? state.loading : false)
);

export const getUserListError = createSelector(
    getListState,
    state => (state ? state.error : null)
);

const getUserListIds = createSelector(
    getListState,
    state => (state ? state.ids : [])
);

export const getUserListEntities = createSelector(
    getUserListIds,
    getEntities,
    (ids, entities) => (ids && entities ? ids.map(id => entities[id]) : [])
);

export const getUserListPagination = createSelector(
    getListState,
    state => (state ? state.pagination : null)
);

export const getUserListFilters = createSelector(
    getUserListPagination,
    state => (state ? state.filters : null)
);

const getUserListPageState = createSelector(
    getUserListPagination,
    state => (state ? state.page : null)
);

export const getUserListPageIndex = createSelector(
    getUserListPageState,
    state => (state ? state.index : null)
);

export const getUserListPageSize = createSelector(
    getUserListPageState,
    state => (state ? state.size : null)
);

export const getUserListTotal = createSelector(
    getUserListPagination,
    state => (state ? state.total : null)
);

const getActiveUserEntity = createSelector(
    getActiveUserId,
    getEntities,
    (id, entities) => (id && entities ? entities[id] : null)
);

const getUpdateActiveUserState = createSelector(
    getActiveUserEntity,
    state => (state ? state.update : null)
);

export const isUpdatingActiveUser = createSelector(
    getUpdateActiveUserState,
    state => (state ? state.submitting : false)
);

export const getActiveUser = createSelector(
    getActiveUserEntity,
    state => (state ? state.value : null)
);

const getDeleteActiveUserState = createSelector(
    getActiveUserEntity,
    state => (state ? state.delete : null)
);

export const isDeletingActiveUser = createSelector(
    getDeleteActiveUserState,
    state => (state ? state.submitting : false)
);
