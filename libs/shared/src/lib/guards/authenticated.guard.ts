import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { APP_ROUTES_PROVIDER, AppRoutes, SHOULD_MOCK_PROVIDER } from '@libera/environment';
import { AuthenticationQuery } from '@libera/state';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
    constructor(
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock: boolean,
        @Inject(DOCUMENT) private document: Document,
        @Inject(APP_ROUTES_PROVIDER) private routes: AppRoutes,
        private query: AuthenticationQuery
    ) {}

    canActivate() {
        if (this.shouldMock) return true;

        return this.query.selectLoaded().pipe(
            filter(loaded => loaded),
            switchMap(() => this.query.selectUserState()),
            map(state => state == 'signedIn'),
            tap(signedIn => {
                if (signedIn) return;

                const { landing: contextPath } = this.routes;
                const encodedRedirect = encodeURIComponent(
                    this.document.location.href
                );

                return this.document.location.assign(
                    `${contextPath}?redirect=${encodedRedirect}`
                );
            }),
            take(1)
        );
    }
}
