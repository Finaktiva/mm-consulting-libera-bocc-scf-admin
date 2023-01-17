import { Injectable } from '@angular/core';
import { BasicFinancialPlan} from '@libera/models/enterprise';
import { EntityListQuery } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';

import { EnterpriseFinancialPlanStore, FinancialPlanUI } from './enterprise-financial-plan.store';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseFinancialPlanQuery extends EntityListQuery<BasicFinancialPlan, FinancialPlanUI> {
    constructor(private store: EnterpriseFinancialPlanStore) {
        super(store);
    }

    selectUIEntityEditing(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.editing : false))
        );
    }

    selectUIEntityUpdating(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.update.submitting : false))
        );
    }

    selectEntityUpdatingStatus(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => entity.status.submitting)
        );
    }
}
