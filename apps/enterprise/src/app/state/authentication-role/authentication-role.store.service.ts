import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRole } from '@libera/models/authentication';

import { AuthenticationRoleStore } from './authentication-role.store';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationRoleStoreService {
    constructor(
        private store: AuthenticationRoleStore,
        private router: Router
    ) {}

    select(payload: AuthenticationRole, redirect: boolean = false) {
        this.store.setSelectedRole(payload);
        if (redirect) return;
        if (payload == 'ENTERPRISE_CONSOLE_ADMIN')
            return this.router.navigateByUrl('/core/users');
        if (payload == 'ENTERPRISE_PAYER_ADMIN')
            return this.router.navigateByUrl('/core/providers');
        if (payload == 'ENTERPRISE_FUNDING_ADMIN')
            return this.router.navigateByUrl('/core/payers');
        if (payload == 'ENTERPRISE_PROVIDER_ADMIN')
            return this.router.navigateByUrl('/core/provider-invoices');
        return this.router.navigateByUrl('/core');
    }
}
