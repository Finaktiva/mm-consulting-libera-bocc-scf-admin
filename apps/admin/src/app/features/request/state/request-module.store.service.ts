import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnterpriseRequestService } from '@libera/api';
import {
    ChangeEnterpriseRequestStatusPayload,
    EnterpriseRequestPaginationFilters,
} from '@libera/models/enterprise-request';
import { Page } from '@mediomelon/ng-core';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { EnterpriseRequestModuleDetailQuery } from './request-module-detail.query';
import { EnterpriseRequestModuleDetailStore } from './request-module-detail.store';
import { EnterpriseRequestModuleQuery } from './request-module.query';
import { EnterpriseRequestModuleStore } from './request-module.store';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseRequestModuleStoreService {
    constructor(
        private query: EnterpriseRequestModuleQuery,
        private store: EnterpriseRequestModuleStore,
        private detailQuery: EnterpriseRequestModuleDetailQuery,
        private detailStore: EnterpriseRequestModuleDetailStore,
        private enterpriseRequestService: EnterpriseRequestService,
        private snackbar: MatSnackBar,
        private translateService: TranslateService
    ) {}

    fetch(id: number) {
        // const shouldFetch =
        //     this.detailQuery.getUIEntityError(id) ||
        //     !this.detailQuery.getUIEntityLoaded(id);

        // if (!shouldFetch) return EMPTY;

        this.detailStore.fetch(id);

        return this.enterpriseRequestService
            .get(id)
            .pipe(
                tap(
                    request => this.detailStore.fetchSuccess(id, request),
                    error => this.detailStore.fetchError(id, error)
                )
            );
    }

    changeFilters(filters: EnterpriseRequestPaginationFilters) {
        this.store.fetchPageWithFilters(filters);

        const page = this.query.getPage();

        return this.fetchPage(page, filters);
    }

    fetchCurrentPage() {
        // const shouldFetch = this.query.getError() || !this.query.getLoaded();

        // if (!shouldFetch) return EMPTY;

        const page = this.query.getPage();
        const filters = this.query.getFilters();

        this.store.fetchPage();

        return this.fetchPage(page, filters);
    }

    changePage(page: Page) {
        const filters = this.query.getFilters();

        this.store.fetchPage(page);

        return this.fetchPage(page, filters);
    }

    changeStatus(id: number, payload: ChangeEnterpriseRequestStatusPayload) {
        this.detailStore.updateStatus(id);

        return this.enterpriseRequestService.updateStatus(id, payload).pipe(
            tap(
                () => {
                    this.detailStore.updateStatusSuccess(id, payload);
                    this.store.updateStatusSuccess(id, payload);

                    let message: string;

                    switch (payload.status) {
                        case 'ACCEPTED':
                            message = this.translateService.instant(
                                'REQUEST_MODULE_NOTIFICATIONS.CHANGE_STATUS.SUCCESS.ACCEPTED'
                            );
                            break;
                        case 'REJECTED':
                            message = this.translateService.instant(
                                'REQUEST_MODULE_NOTIFICATIONS.CHANGE_STATUS.SUCCESS.REJECTED'
                            );
                            break;
                        default:
                            message = this.translateService.instant(
                                'REQUEST_MODULE_NOTIFICATIONS.CHANGE_STATUS.SUCCESS.DEFAULT'
                            );
                    }

                    this.snackbar.open(message, 'OK');
                },
                error => {
                    this.detailStore.updateStatusError(id, error);

                    let message: string;

                    switch (payload.status) {
                        case 'ACCEPTED':
                            message = this.translateService.instant(
                                'REQUEST_MODULE_NOTIFICATIONS.CHANGE_STATUS.ERROR.ACCEPTED'
                            );
                            break;
                        case 'REJECTED':
                            message = this.translateService.instant(
                                'REQUEST_MODULE_NOTIFICATIONS.CHANGE_STATUS.ERROR.REJECTED'
                            );
                            break;
                        default:
                            message = this.translateService.instant(
                                'REQUEST_MODULE_NOTIFICATIONS.CHANGE_STATUS.ERROR.DEFAULT'
                            );
                    }

                    this.snackbar.open(message, 'OK');
                }
            )
        );
    }

    private fetchPage(page: Page, filters: EnterpriseRequestPaginationFilters) {
        return this.enterpriseRequestService
            .getPage(page, filters, 'ENTERPRISE_MODULE_ACTIVATION')
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }
}
