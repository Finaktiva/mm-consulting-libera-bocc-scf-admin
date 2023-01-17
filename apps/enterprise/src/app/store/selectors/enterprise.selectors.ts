// import { createFeatureSelector, createSelector } from '@ngrx/store';

// import { State } from '../reducers/enterprise.reducer';

// const selectEnterpriseFeatureState = createFeatureSelector<State>('enterprise');

// const getEnterpriseFetchState = createSelector(
//     selectEnterpriseFeatureState,
//     state => (state ? state.fetch : null)
// );

// export const hasLoadedEnterprise = createSelector(
//     getEnterpriseFetchState,
//     state => (state ? state.loaded : false)
// );

// export const isLoadingEnterprise = createSelector(
//     getEnterpriseFetchState,
//     state => (state ? state.loading : false)
// );

// export const getEnterpriseError = createSelector(
//     getEnterpriseFetchState,
//     state => (state ? state.error : null)
// );

// export const getEnterprise = createSelector(
//     selectEnterpriseFeatureState,
//     state => (state ? state.value : null)
// );

// export const isSubmittingRequest = createSelector(
//     selectEnterpriseFeatureState,
//     state => (state ? state.request.submitting : false)
// );
