import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { APP_ROUTES_PROVIDER, AppRoutes, SHOULD_MOCK_PROVIDER } from '@libera/environment';
import { AuthenticationQuery } from '@libera/state';
import { filter, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class NotAuthenticatedGuard implements CanActivate {
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
            map(state => state != 'signedIn'),
            withLatestFrom(this.query.selectUserType()),
            tap(([signedOut, userType]) => {
                if (signedOut) return;

                if (userType == 'ENTERPRISE_USER')
                    return this.document.location.assign(
                        this.routes.enterprise
                    );

                if (userType == 'LIBERA_USER')
                    return this.document.location.assign(this.routes.admin);

                throw Error('Could not determine userType of ' + userType);
            }),
            map(([signedOut]) => signedOut),
            take(1)
        );
    }
}
