import { Injectable } from '@angular/core';
import { Enterprise, EnterpriseStatus } from '@libera/models/enterprise';
import { Query } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';

import { EnterpriseStore, EnterpriseUI } from './enterprise.store';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseQuery extends Query<Enterprise, EnterpriseUI> {
    constructor(private store: EnterpriseStore) {
        super(store);
    }

    selectEnterpriseStatus(): Observable<EnterpriseStatus> {
        return this.selectState().pipe(
            select(state => (state ? state.status : null))
        );
    }

    selectUpdating(): Observable<boolean> {
        return this.selectUIState().pipe(
            select(state => state.update.submitting)
        );
    }

    selectRequesting(): Observable<boolean> {
        return this.selectUIState().pipe(
            select(state => state.request.submitting)
        );
    }
}
