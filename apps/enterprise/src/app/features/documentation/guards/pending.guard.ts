import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SHOULD_MOCK_PROVIDER } from '@libera/environment';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { EnterpriseQuery } from '../../../state/enterprise/enterprise.query';

@Injectable({
    providedIn: 'root',
})
export class PendingGuard implements CanActivate {
    constructor(
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock: boolean,
        private query: EnterpriseQuery,
        private router: Router
    ) {}

    canActivate() {
        if (this.shouldMock) return true;

        return this.query.selectLoaded().pipe(
            filter(hasLoaded => hasLoaded),
            switchMap(() => this.query.selectEnterpriseStatus()),
            take(1),
            map(status => {
                if (status == 'INCOMPLETE_ACCOUNT')
                    return this.router.parseUrl('/documentation');
                return true;
            })
        );
    }
}
