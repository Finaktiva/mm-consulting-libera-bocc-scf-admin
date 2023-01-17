import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnterpriseService, S3Service } from '@libera/api';
import { AuthenticationActionTypes, AuthenticationFacade, LoadState } from '@libera/authentication';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mapTo, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';

import { BrandingService } from '../../branding.service';
import * as fromActions from '../actions/branding.actions';
import { BrandingFacade } from '../facades/branding.facade';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class BrandingEffects {
    @Effect()
    init$: Observable<fromActions.FetchBranding> = this.actions$.pipe(
        ofType<LoadState>(AuthenticationActionTypes.LoadState),
        mapTo(new fromActions.FetchBranding()),
        take(1)
    );

    @Effect()
    fetchBranding$: Observable<fromActions.GetBranding> = this.actions$.pipe(
        ofType<fromActions.FetchBranding>(
            fromActions.BrandingActionTypes.FetchBranding
        ),
        withLatestFrom(
            this.brandingFacade.hasLoaded$,
            this.brandingFacade.error$
        ),
        filter(([, hasLoaded, error]) => !hasLoaded || !!error),
        mapTo(new fromActions.GetBranding())
    );

    @Effect()
    getBranding$: Observable<
        fromActions.GetBrandingSuccess | fromActions.GetBrandingError
    > = this.actions$.pipe(
        ofType<fromActions.GetBranding>(
            fromActions.BrandingActionTypes.GetBranding
        ),
        withLatestFrom(this.authenticationFacade.enterpriseId$),
        switchMap(([, id]) => {
            return this.enterpriseService.getBranding(id).pipe(
                map(branding => new fromActions.GetBrandingSuccess(branding)),
                catchError(error => of(new fromActions.GetBrandingError(error)))
            );
        })
    );

    @Effect()
    updateTheme$: Observable<
        fromActions.UpdateThemeSuccess | fromActions.UpdateThemeError
    > = this.actions$.pipe(
        ofType<fromActions.UpdateTheme>(
            fromActions.BrandingActionTypes.UpdateTheme
        ),
        withLatestFrom(this.authenticationFacade.enterpriseId$),
        switchMap(([{ payload }, id]) => {
            return this.enterpriseService.updateTheme(id, payload).pipe(
                map(() => new fromActions.UpdateThemeSuccess(payload)),
                catchError(error => of(new fromActions.UpdateThemeError(error)))
            );
        })
    );

    @Effect({
        dispatch: false,
    })
    setTheme$: Observable<
        fromActions.UpdateThemeSuccess | fromActions.GetBrandingSuccess
    > = this.actions$.pipe(
        ofType<fromActions.UpdateThemeSuccess | fromActions.GetBrandingSuccess>(
            fromActions.BrandingActionTypes.UpdateThemeSuccess,
            fromActions.BrandingActionTypes.GetBrandingSuccess
        ),
        filter(
            ({ payload }) => !!payload.primaryColor && !!payload.accentColor
        ),
        tap(({ payload }) =>
            this.brandingService.setTheme(
                payload.primaryColor,
                payload.accentColor
            )
        )
    );

    @Effect({
        dispatch: false,
    })
    setFavicon$: Observable<
        fromActions.UpdateFaviconSuccess | fromActions.GetBrandingSuccess
    > = this.actions$.pipe(
        ofType<
            fromActions.UpdateFaviconSuccess | fromActions.GetBrandingSuccess
        >(
            fromActions.BrandingActionTypes.UpdateFaviconSuccess,
            fromActions.BrandingActionTypes.GetBrandingSuccess
        ),
        filter(({ payload }) => !!payload.brandingFaviconURL),
        tap(({ payload }) =>
            this.brandingService.setFavicon(payload.brandingFaviconURL)
        )
    );

    @Effect({
        dispatch: false,
    })
    updateThemeSuccess$: Observable<
        fromActions.UpdateThemeSuccess
    > = this.actions$.pipe(
        ofType<fromActions.UpdateThemeSuccess>(
            fromActions.BrandingActionTypes.UpdateThemeSuccess
        ),
        tap(() => this.snackbar.open(
            this.translateService.instant('BRANDING_NOTIFICATIONS.UPDATE_THEME.SUCCESS'),
            'OK')
            )
    );

    @Effect({
        dispatch: false,
    })
    updateThemeError$: Observable<
        fromActions.UpdateThemeError
    > = this.actions$.pipe(
        ofType<fromActions.UpdateThemeError>(
            fromActions.BrandingActionTypes.UpdateThemeError
        ),
        tap(() =>
            this.snackbar.open(
                this.translateService.instant('BRANDING_NOTIFICATIONS.UPDATE_THEME.ERROR'),
                'OK'
                )
        )
    );

    @Effect()
    updateLogo$: Observable<
        fromActions.UpdateLogoSuccess | fromActions.UpdateLogoError
    > = this.actions$.pipe(
        ofType<fromActions.UpdateLogo>(
            fromActions.BrandingActionTypes.UpdateLogo
        ),
        withLatestFrom(this.authenticationFacade.enterpriseId$),
        switchMap(([{ payload: file }, id]) => {
            return this.s3Service
                .generateUrl({ filename: file.name, contentType: file.type })
                .pipe(
                    switchMap(url => this.s3Service.upload(url, file)),
                    switchMap(() =>
                        this.enterpriseService.updateLogo(id, file.name)
                    ),
                    map(payload => new fromActions.UpdateLogoSuccess(payload)),
                    catchError(error =>
                        of(new fromActions.UpdateLogoError(error))
                    )
                );
        })
    );

    @Effect({
        dispatch: false,
    })
    updateLogoSuccess$: Observable<
        fromActions.UpdateLogoSuccess
    > = this.actions$.pipe(
        ofType<fromActions.UpdateLogoSuccess>(
            fromActions.BrandingActionTypes.UpdateLogoSuccess
        ),
        tap(() => this.snackbar.open(
            this.translateService.instant('BRANDING_NOTIFICATIONS.UPDATE_LOGO.SUCCESS'),
            'OK')
            )
    );

    @Effect({
        dispatch: false,
    })
    updateLogoError$: Observable<
        fromActions.UpdateLogoError
    > = this.actions$.pipe(
        ofType<fromActions.UpdateLogoError>(
            fromActions.BrandingActionTypes.UpdateLogoError
        ),
        tap(() =>
            this.snackbar.open(
                this.translateService.instant('BRANDING_NOTIFICATIONS.UPDATE_LOGO.ERROR'),
                'OK'
                )
        )
    );

    @Effect()
    updateFavicon$: Observable<
        fromActions.UpdateFaviconSuccess | fromActions.UpdateFaviconError
    > = this.actions$.pipe(
        ofType<fromActions.UpdateFavicon>(
            fromActions.BrandingActionTypes.UpdateFavicon
        ),
        withLatestFrom(this.authenticationFacade.enterpriseId$),
        switchMap(([{ payload: file }, id]) => {
            return this.s3Service
                .generateUrl({ filename: file.name, contentType: file.type })
                .pipe(
                    switchMap(url => this.s3Service.upload(url, file)),
                    switchMap(() =>
                        this.enterpriseService.updateFavicon(id, file.name)
                    ),
                    map(
                        payload => new fromActions.UpdateFaviconSuccess(payload)
                    ),
                    catchError(error =>
                        of(new fromActions.UpdateFaviconError(error))
                    )
                );
        })
    );

    @Effect({
        dispatch: false,
    })
    updateFaviconSuccess$: Observable<
        fromActions.UpdateFaviconSuccess
    > = this.actions$.pipe(
        ofType<fromActions.UpdateFaviconSuccess>(
            fromActions.BrandingActionTypes.UpdateFaviconSuccess
        ),
        tap(() => this.snackbar.open(
            this.translateService.instant('BRANDING_NOTIFICATIONS.UPDATE_FAVICON.SUCCESS'),
            'OK')
            )
    );

    @Effect({
        dispatch: false,
    })
    updateFaviconError$: Observable<
        fromActions.UpdateFaviconError
    > = this.actions$.pipe(
        ofType<fromActions.UpdateFaviconError>(
            fromActions.BrandingActionTypes.UpdateFaviconError
        ),
        tap(() =>
            this.snackbar.open(
                this.translateService.instant('BRANDING_NOTIFICATIONS.UPDATE_FAVICON.ERROR'), 
                'OK')
        )
    );

    @Effect()
    deleteBranding$: Observable<
        fromActions.DeleteBrandingSuccess | fromActions.DeleteBrandingError
    > = this.actions$.pipe(
        ofType<fromActions.DeleteBranding>(
            fromActions.BrandingActionTypes.DeleteBranding
        ),
        withLatestFrom(this.authenticationFacade.enterpriseId$),
        switchMap(([, id]) => {
            return this.enterpriseService.deleteBranding(id).pipe(
                map(() => new fromActions.DeleteBrandingSuccess()),
                catchError(error =>
                    of(new fromActions.DeleteBrandingError(error))
                )
            );
        })
    );

    @Effect({
        dispatch: false,
    })
    deleteBrandingSuccess$: Observable<
        fromActions.DeleteBrandingSuccess
    > = this.actions$.pipe(
        ofType<fromActions.DeleteBrandingSuccess>(
            fromActions.BrandingActionTypes.DeleteBrandingSuccess
        ),
        tap(() =>
            this.snackbar.open(
                this.translateService.instant('BRANDING_NOTIFICATIONS.DELETE.SUCCESS'),
                'OK'
            )
        ),
        tap(() => this.brandingService.reset())
    );

    @Effect({
        dispatch: false,
    })
    deleteBrandingError$: Observable<
        fromActions.DeleteBrandingError
    > = this.actions$.pipe(
        ofType<fromActions.DeleteBrandingError>(
            fromActions.BrandingActionTypes.DeleteBrandingError
        ),
        tap(() =>
            this.snackbar.open(
                this.translateService.instant('BRANDING_NOTIFICATIONS.DELETE.ERROR'),
                'OK'
            )
        )
    );

    constructor(
        private actions$: Actions,
        private snackbar: MatSnackBar,
        private enterpriseService: EnterpriseService,
        private authenticationFacade: AuthenticationFacade,
        private brandingFacade: BrandingFacade,
        private brandingService: BrandingService,
        private s3Service: S3Service,
        private translateService:TranslateService
    ) {}
}
