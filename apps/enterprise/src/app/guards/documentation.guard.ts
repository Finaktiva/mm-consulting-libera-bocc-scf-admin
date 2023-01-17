import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SHOULD_MOCK_PROVIDER } from '@libera/environment';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { EnterpriseQuery } from '../state/enterprise/enterprise.query';

@Injectable({
    providedIn: 'root',
})
export class DocumentationGuard implements CanActivate {
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
                if (status == 'ENABLED') return this.router.parseUrl('/core');

                return true;
            })
        );
    }
}
