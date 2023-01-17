import { Branding } from '@libera/models/branding';
import produce from 'immer';

import * as fromActions from '../actions/branding.actions';

export interface State {
    fetch: {
        loaded: boolean;
        loading: boolean;
        error: any;
    };
    delete: {
        submitting: boolean;
        error: any;
    };
    theme: {
        submitting: boolean;
        error: any;
    };
    logo: {
        submitting: boolean;
        error: any;
    };
    favicon: {
        submitting: boolean;
        error: any;
    };
    value: Branding;
}

export const initialState: State = {
    fetch: {
        loaded: false,
        loading: false,
        error: null,
    },
    delete: {
        submitting: false,
        error: null,
    },
    theme: {
        submitting: false,
        error: null,
    },
    logo: {
        submitting: false,
        error: null,
    },
    favicon: {
        submitting: false,
        error: null,
    },
    value: null,
};

export function reducer(
    state = initialState,
    action: fromActions.ActionTypesUnion
): State {
    return produce(state, draft => {
        switch (action.type) {
            case fromActions.BrandingActionTypes.GetBranding:
                draft.fetch.loading = true;
                draft.fetch.error = null;
                return;
            case fromActions.BrandingActionTypes.GetBrandingSuccess:
                draft.fetch.loading = false;
                draft.fetch.loaded = true;
                draft.value = action.payload;
                return;
            case fromActions.BrandingActionTypes.GetBrandingError:
                draft.fetch.loading = false;
                draft.fetch.error = action.payload;
                return;
            case fromActions.BrandingActionTypes.UpdateTheme:
                draft.theme.submitting = true;
                draft.theme.error = null;
                return;
            case fromActions.BrandingActionTypes.UpdateThemeSuccess:
                draft.theme.submitting = false;
                draft.value = { ...draft.value, ...action.payload };
                return;
            case fromActions.BrandingActionTypes.UpdateThemeError:
                draft.theme.submitting = false;
                draft.theme.error = action.payload;
                return;
            case fromActions.BrandingActionTypes.UpdateLogo:
                draft.logo.submitting = true;
                draft.logo.error = null;
                return;
            case fromActions.BrandingActionTypes.UpdateLogoSuccess:
                draft.logo.submitting = false;
                draft.value = {
                    ...draft.value,
                    brandingLogoURL: action.payload.brandingLogoURL,
                };
                return;
            case fromActions.BrandingActionTypes.UpdateLogoError:
                draft.logo.submitting = false;
                draft.logo.error = action.payload;
            case fromActions.BrandingActionTypes.UpdateFavicon:
                draft.favicon.submitting = true;
                draft.favicon.error = null;
                return;
            case fromActions.BrandingActionTypes.UpdateFaviconSuccess:
                draft.favicon.submitting = false;
                draft.value = {
                    ...draft.value,
                    brandingFaviconURL: action.payload.brandingFaviconURL,
                };
                return;
            case fromActions.BrandingActionTypes.UpdateFaviconError:
                draft.favicon.submitting = false;
                draft.favicon.error = action.payload;
                return;
            case fromActions.BrandingActionTypes.DeleteBranding:
                draft.delete.submitting = true;
                draft.delete.error = null;
                return;
            case fromActions.BrandingActionTypes.DeleteBrandingSuccess:
                draft.delete.submitting = false;
                draft.value = null;
                return;
            case fromActions.BrandingActionTypes.DeleteBrandingError:
                draft.delete.submitting = false;
                draft.delete.error = action.payload;
                return;
        }
    });
}
