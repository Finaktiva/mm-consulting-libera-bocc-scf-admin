import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticationQuery, EnterpriseFinancialPlanQuery, EnterpriseFinancialPlanStoreService } from '@libera/state';
import { BASIC_FINANCIAL_PLAN_UI_MOCK } from '@libera/mocks/basic-financial-plan';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import { PageEvent } from '@angular/material';
import { PlanFiltersPayload } from '@libera/models/catalog';

@Component({
    selector: 'financial-conditions-page',
    templateUrl: './financial-conditions.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialConditionsPage {

    isLoading$ = this.financialPlanQuery.selectLoading();

    filters$ = this.financialPlanQuery.selectFilters();

    total$ = this.financialPlanQuery.selectTotal();

    paginationSize$ = this.financialPlanQuery.selectPageSize();

    paginationIndex$ = this.financialPlanQuery.selectPageIndex();

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    entities = this.financialPlanQuery.selectEntitiesWithUI();

    constructor(
        private financialPlanQuery: EnterpriseFinancialPlanQuery,
        private financialPlanStoreService: EnterpriseFinancialPlanStoreService,
        private authenticationQuery: AuthenticationQuery,
    ) {}

    ngOnInit() {
        this.financialPlanStoreService
            .fetchCurrentPage(this.authenticationQuery.getEnterpriseId())
            .subscribe();
    }

    onChangePage({ pageIndex: index, pageSize: size }: PageEvent) {
        this.financialPlanStoreService
            .changePage(this.authenticationQuery.getEnterpriseId(), { index, size })
            .subscribe();
    }

    onUpdateFilters(filters: PlanFiltersPayload) {
        this.financialPlanStoreService
            .changeFilters(this.authenticationQuery.getEnterpriseId(), filters)
            .subscribe();
    }
}
