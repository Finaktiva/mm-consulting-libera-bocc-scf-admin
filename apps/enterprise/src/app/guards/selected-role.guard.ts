import { Inject, Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { ROLE_PATHS } from '@libera/constants';
import { SHOULD_MOCK_PROVIDER } from '@libera/environment';
import {
    AuthenticationRole,
    AUTHENTICATION_ROLE,
} from '@libera/models/authentication';
import { AuthenticationQuery } from '@libera/state';
import { map, tap } from 'rxjs/operators';
import { AuthenticationRoleStoreService } from '../state/authentication-role/authentication-role.store.service';

@Injectable({
    providedIn: 'root',
})
export class SelectedRoleGuard implements CanActivate {
    constructor(
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock: boolean,
        private authenticationRoleStoreService: AuthenticationRoleStoreService,
        private router: Router,
        private authenticationQuery: AuthenticationQuery
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.shouldMock) return true;

        return this.authenticationQuery.selectUserRoles().pipe(
            map(roles => {
                if (
                    state.url.includes('provider-invoices') &&
                    roles.includes(
                        AUTHENTICATION_ROLE.ENTERPRISE_PROVIDER_ADMIN
                    )
                ) {
                    return AUTHENTICATION_ROLE.ENTERPRISE_PROVIDER_ADMIN;
                }
                return roles.find(role =>
                    ROLE_PATHS[role].some(path => path.test(state.url))
                );
            }),
            map((currentRole: AuthenticationRole) => {
                if (!currentRole) {
                    return this.router.parseUrl('/roles');
                }
                this.authenticationRoleStoreService.select(currentRole, true);
                return true;
            })
        );
    }
}
