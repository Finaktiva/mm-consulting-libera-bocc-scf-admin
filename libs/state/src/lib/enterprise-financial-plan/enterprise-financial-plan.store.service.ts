import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnterpriseService } from '@libera/api';
import { PlanFiltersPayload } from '@libera/models/catalog';
import { CreateFinancingPlanPayload } from '@libera/models/financing-plan'
import { Page } from '@mediomelon/ng-core';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { EnterpriseFinancialPlanCreateStore } from './enterprise-financial-plan-create.store';
import { EnterpriseFinancialPlanQuery } from './enterprise-financial-plan.query';
import { EnterpriseFinancialPlanStore } from './enterprise-financial-plan.store';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseFinancialPlanStoreService {
    constructor(
        private store: EnterpriseFinancialPlanStore,
        private createStore: EnterpriseFinancialPlanCreateStore,
        private enterpriseService: EnterpriseService,
        private snackbar: MatSnackBar,
        private translateService: TranslateService,
        private query: EnterpriseFinancialPlanQuery,
    ) {}

    toggleEditing(id: number) {
        this.store.toggleEditing(id);
    }

    fetch(id: number) {
        this.store.fetch(id);
        return this.enterpriseService
            .getFinancialPlans(id)
            .pipe(
                tap(
                    plans => this.store.fetchSuccess(id, plans),
                    error => this.store.fetchError(id, error)
                )
            );
    }

    fetchCurrentPage(id: number,) {
        const page = this.query.getPage();
        const filters = this.query.getFilters();

        this.store.fetchPage();

        return this.fetchPage(id, page, filters);
    }

    changePage(id: number, page: Page) {
        const filters = this.query.getFilters();

        this.store.fetchPage(page);

        return this.fetchPage(id, page, filters);
    }

    changeFilters(id: number, filters: PlanFiltersPayload) {
        this.store.fetchPageWithFilters(filters);

        const page = this.query.getPage();

        return this.fetchPage(id, page, filters);
    }

    private fetchPage(
        id: number,
        page: Page,
        filters: PlanFiltersPayload
    ) {
        return this.enterpriseService
            .getFinancialPlanPage(id, filters, page)
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }

    createFinancialPlan(payload: CreateFinancingPlanPayload, id: number) {
        this.createStore.submit();

        return this.enterpriseService.createFinancialPlan(payload, id).pipe(
            tap(
                payload => {
                    this.createStore.submitSuccess();
                    this.store.insert(payload);
                    this.snackbar.open(
                        this.translateService.instant(
                            `FINANCIAL_PLAN.CREATE_SUCCESS`
                        ),
                        'OK'
                    );
                },
                ({ error }) => {
                    this.createStore.submitError(error);

                    const code =
                        error.code && error.code.includes('SCF.LIBERA')
                            ? error.code
                            : 'default';

                    this.snackbar.open(
                        this.translateService.instant((code === 'SCF.LIBERA.322') ?
                            `FINANCIAL_PLAN.ERRORS.CREATE.ENTERPRISE_DISABLED` :
                            `FINANCIAL_PLAN.ERRORS.CREATE.${code}`
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    getDetailFinancialPlan(id: number){
        return this.enterpriseService.getDetailFinancialPlans(id)
    }

    approveFinancialPlan(idPlan: number, status: string, comments?:string){
        return this.enterpriseService.approveFinancialPlan(idPlan, status, comments).pipe(
            tap(
                payload => {
                    this.store.updateFinancialConditionSuccess(payload,idPlan)
                    this.snackbar.open(
                        this.translateService.instant(
                            `FINANCIAL_PLAN.${status}`
                        ),
                        'OK'
                    );
                },
                ({ error }) => {
                    this.snackbar.open(
                        this.translateService.instant(`FINANCIAL_PLAN.ERRORS.ERROR_${status}`),
                        'OK'
                    );
                }
            )
        );
    }
}
