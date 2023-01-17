import { Inject, Injectable } from '@angular/core';
import { SHOULD_MOCK_PROVIDER } from '@libera/environment';
import { AuthenticationRole } from '@libera/models/authentication';
import { AuthenticationQuery } from '@libera/state';
import { combineLatest, Observable, of } from 'rxjs';
import { select } from 'rxjs-augmented/operators';

import { AuthenticationRoleStore } from './authentication-role.store';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationRoleQuery {
    constructor(
        private authenticationQuery: AuthenticationQuery,
        private store: AuthenticationRoleStore,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock: boolean
    ) {}

    selectRole(): Observable<AuthenticationRole> {
        return this.store.state$;
    }

    selectIsPayerAdmin(): Observable<boolean> {
        if (this.shouldMock) return of(true);

        return combineLatest(
            this.authenticationQuery.selectUserRoles(),
            this.selectRole()
        ).pipe(
            select(
                ([roles, role]) =>
                    role == 'ENTERPRISE_CONSOLE_ADMIN' && roles.includes(role) && roles.includes('ENTERPRISE_PAYER_ADMIN')
            )
        );
    }

    selectIsAdmin(): Observable<boolean> {
        if (this.shouldMock) return of(true);

        return combineLatest(
            this.authenticationQuery.selectUserRoles(),
            this.selectRole()
        ).pipe(
            select(
                ([roles, role]) =>
                    role == 'ENTERPRISE_CONSOLE_ADMIN' && roles.includes(role)
            )
        );
    }

    selectIsProvider(): Observable<boolean> {
        if (this.shouldMock) return of(true);

        return combineLatest(
            this.authenticationQuery.selectUserRoles(),
            this.selectRole()
        ).pipe(
            select(
                ([roles, role]) =>
                    role == 'ENTERPRISE_PROVIDER_ADMIN' && roles.includes(role)
            )
        );
    }

    selectIsFunding(): Observable<boolean> {
        if (this.shouldMock) return of(true);

        return combineLatest(
            this.authenticationQuery.selectUserRoles(),
            this.selectRole()
        ).pipe(
            select(
                ([roles, role]) =>
                    role == 'ENTERPRISE_FUNDING_ADMIN' && roles.includes(role)
            )
        );
    }

    selectIsPayer(): Observable<boolean> {
        if (this.shouldMock) return of(true);

        return combineLatest(
            this.authenticationQuery.selectUserRoles(),
            this.selectRole()
        ).pipe(
            select(
                ([roles, role]) =>
                    role == 'ENTERPRISE_PAYER_ADMIN' && roles.includes(role)
            )
        );
    }
}
