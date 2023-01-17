import { Injectable } from '@angular/core';
import { SubmitQuery } from '@mediomelon/ng-core';

import { EnterpriseCreateStore } from './enterprise-create.store';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseCreateQuery extends SubmitQuery {
    constructor(private store: EnterpriseCreateStore) {
        super(store);
    }
}
