import { Injectable } from '@angular/core';
import { UpdateThemePayload } from '@libera/models/branding';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import * as fromActions from '../actions/branding.actions';
import {
    getAccentColor,
    getBrandingError,
    getFavicon,
    getLogo,
    getPrimaryColor,
    hasLoadedBranding,
    isDeletingBranding,
    isLoadingBranding,
    isUpdatingFavicon,
    isUpdatingLogo,
    isUpdatingTheme,
} from '../selectors/branding.selectors';

@Injectable({
    providedIn: 'root',
})
export class BrandingFacade {
    hasLoaded$ = this.store.pipe(select(hasLoadedBranding));

    isLoading$ = this.store.pipe(select(isLoadingBranding));

    error$ = this.store.pipe(select(getBrandingError));

    isDeletingBranding$ = this.store.pipe(select(isDeletingBranding));

    isUpdatingTheme$ = this.store.pipe(select(isUpdatingTheme));

    isUpdatingLogo$ = this.store.pipe(select(isUpdatingLogo));

    isUpdatingFavicon$ = this.store.pipe(select(isUpdatingFavicon));

    primaryColor$ = this.store.pipe(select(getPrimaryColor));

    accentColor$ = this.store.pipe(select(getAccentColor));

    favicon$ = this.store.pipe(select(getFavicon));

    logo$ = this.store.pipe(select(getLogo));

    loadedLogo$ = this.store.pipe(select(getLogo => (getLogo ? true : false)));

    updateThemeSuccess$ = this.actions$.pipe(
        ofType<fromActions.UpdateThemeSuccess>(
            fromActions.BrandingActionTypes.UpdateThemeSuccess
        )
    );

    updateLogoSuccess$ = this.actions$.pipe(
        ofType<fromActions.UpdateLogoSuccess>(
            fromActions.BrandingActionTypes.UpdateLogoSuccess
        )
    );

    updateFaviconSuccess$ = this.actions$.pipe(
        ofType<fromActions.UpdateFaviconSuccess>(
            fromActions.BrandingActionTypes.UpdateFaviconSuccess
        )
    );

    deleteBrandingSuccess$ = this.actions$.pipe(
        ofType<fromActions.DeleteBrandingSuccess>(
            fromActions.BrandingActionTypes.DeleteBrandingSuccess
        )
    );

    constructor(private store: Store<any>, private actions$: Actions) {}

    updateTheme(payload: UpdateThemePayload) {
        this.store.dispatch(new fromActions.UpdateTheme(payload));
    }

    updateLogo(file: File) {
        this.store.dispatch(new fromActions.UpdateLogo(file));
    }

    updateFavicon(file: File) {
        this.store.dispatch(new fromActions.UpdateFavicon(file));
    }

    delete() {
        this.store.dispatch(new fromActions.DeleteBranding());
    }

    fetch() {
        this.store.dispatch(new fromActions.FetchBranding());
    }
}
