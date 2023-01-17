import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AUTHENTICATION_ROLE, AuthenticationRole } from '@libera/models/authentication';
import { AuthenticationQuery } from '@libera/state';
import {
    AuthenticationRoleStoreService,
} from 'apps/enterprise/src/app/state/authentication-role/authentication-role.store.service';

@Component({
    selector: 'role-selector',
    templateUrl: './role-selector.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleSelectorPage {
    roles$ = this.authenticationQuery.selectUserRoles();

    AUTHENTICATION_ROLE = AUTHENTICATION_ROLE;

    constructor(
        private authenticationQuery: AuthenticationQuery,
        private authenticationRoleStoreService: AuthenticationRoleStoreService
    ) {}

    onSelect(payload: AuthenticationRole) {
        this.authenticationRoleStoreService.select(payload);
    }
}
