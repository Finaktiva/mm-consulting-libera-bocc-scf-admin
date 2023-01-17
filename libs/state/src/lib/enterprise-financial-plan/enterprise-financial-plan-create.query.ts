import { Injectable } from '@angular/core';
import { SubmitQuery } from '@mediomelon/ng-core';

import { EnterpriseFinancialPlanCreateStore } from './enterprise-financial-plan-create.store';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseFinancialPlanCreateQuery extends SubmitQuery {
    constructor(private store: EnterpriseFinancialPlanCreateStore) {
        super(store);
    }
}
