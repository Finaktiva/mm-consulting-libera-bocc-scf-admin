// import { createFeatureSelector, createSelector } from '@ngrx/store';

// import { State } from '../reducers/documentation.reducer';

// const selectDocumentationFeatureState = createFeatureSelector<State>(
//     'documentation'
// );

// export const hasLoadedDocumentation = createSelector(
//     selectDocumentationFeatureState,
//     state => (state ? state.loaded : false)
// );

// export const isLoadingDocumentation = createSelector(
//     selectDocumentationFeatureState,
//     state => (state ? state.loading : false)
// );

// export const getDocumentationError = createSelector(
//     selectDocumentationFeatureState,
//     state => (state ? state.error : null)
// );

// export const getDocumentationEntities = createSelector(
//     selectDocumentationFeatureState,
//     state => (state ? state.items : null)
// );

// const getDocumentation = createSelector(
//     getDocumentationEntities,
//     state => (state ? state.map(entity => entity.documentation) : [])
// );

// export const hasInvalidDocumentation = createSelector(
//     getDocumentation,
//     state =>
//         state
//             ? state.some(
//                   documentation =>
//                       documentation.type.required && !documentation.file
//               )
//             : false
// );
