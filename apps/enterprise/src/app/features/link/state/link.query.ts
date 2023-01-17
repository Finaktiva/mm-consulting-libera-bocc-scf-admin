import { Injectable } from '@angular/core';
import { EnterpriseProviderTokenStatus, EnterpriseProviderTokenVerification } from '@libera/models/enterprise';
import { Query } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { map } from 'rxjs/operators';

import { LinkStore, LinkUI } from './link.store';

@Injectable({
    providedIn: 'root',
})
export class LinkQuery extends Query<
    EnterpriseProviderTokenVerification,
    LinkUI
> {
    constructor(private store: LinkStore) {
        super(store);
    }

    selectConfirming(): Observable<boolean> {
        return this.selectUIState().pipe(
            select(state => state.confirm.submitting)
        );
    }

    selectEnterpriseName(): Observable<string> {
        return this.selectState().pipe(
            select(state => (state ? state.enterpriseRequesterName : null))
        );
    }

    selectTokenStatus(): Observable<EnterpriseProviderTokenStatus> {
        return this.selectState().pipe(
            map(state => (state ? state.status : null))
        );
    }

    selectIsTokenValid(): Observable<boolean> {
        return this.selectTokenStatus().pipe(
            select(state => state == 'ACTIVE')
        );
    }

    selectIsTokenExpired(): Observable<boolean> {
        return this.selectTokenStatus().pipe(
            select(state => state == 'EXPIRED')
        );
    }

    selectIsTokenApplied(): Observable<boolean> {
        return this.selectTokenStatus().pipe(
            select(state => state == 'APPLIED')
        );
    }
}
