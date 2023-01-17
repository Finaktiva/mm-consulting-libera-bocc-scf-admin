import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from '../reducers/branding.reducer';

const selectBrandingFeatureState = createFeatureSelector<State>('branding');

const getFetchBrandingState = createSelector(
    selectBrandingFeatureState,
    state => (state ? state.fetch : null)
);

const getDeleteBrandingState = createSelector(
    selectBrandingFeatureState,
    state => (state ? state.delete : null)
);

const getBrandingThemeState = createSelector(
    selectBrandingFeatureState,
    state => (state ? state.theme : null)
);

const getBrandingLogoState = createSelector(
    selectBrandingFeatureState,
    state => (state ? state.logo : null)
);

const getBrandingFaviconState = createSelector(
    selectBrandingFeatureState,
    state => (state ? state.favicon : null)
);

export const hasLoadedBranding = createSelector(
    getFetchBrandingState,
    state => (state ? state.loaded : false)
);

export const isLoadingBranding = createSelector(
    getFetchBrandingState,
    state => (state ? state.loading : false)
);

export const getBrandingError = createSelector(
    getFetchBrandingState,
    state => (state ? state.error : null)
);

export const isDeletingBranding = createSelector(
    getDeleteBrandingState,
    state => (state ? state.submitting : false)
);

export const isUpdatingTheme = createSelector(
    getBrandingThemeState,
    state => (state ? state.submitting : false)
);

export const isUpdatingLogo = createSelector(
    getBrandingLogoState,
    state => (state ? state.submitting : false)
);

export const isUpdatingFavicon = createSelector(
    getBrandingFaviconState,
    state => (state ? state.submitting : false)
);

const getBranding = createSelector(
    selectBrandingFeatureState,
    state => (state ? state.value : null)
);

export const getPrimaryColor = createSelector(
    getBranding,
    state => (state ? state.primaryColor : null)
);

export const getAccentColor = createSelector(
    getBranding,
    state => (state ? state.accentColor : null)
);

export const getLogo = createSelector(
    getBranding,
    state => (state ? state.brandingLogoURL : null)
);

export const getFavicon = createSelector(
    getBranding,
    state => (state ? state.brandingFaviconURL : null)
);
