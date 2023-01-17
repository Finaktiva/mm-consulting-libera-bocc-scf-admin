import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnterpriseRequestService, EnterpriseService } from '@libera/api';
import { CreateProgramPayload } from '@libera/models/enterprise';
import {
    ChangeEnterpriseRequestStatusPayload,
    EnterpriseLinkRequest,
    EnterpriseRequestPaginationFilters,
} from '@libera/models/enterprise-request';
import { Page } from '@mediomelon/ng-core';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { EnterpriseRequestLinkQuery } from './request-link.query';
import { EnterpriseRequestLinkStore } from './request-link.store';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseRequestLinkStoreService {
    constructor(
        private query: EnterpriseRequestLinkQuery,
        private store: EnterpriseRequestLinkStore,
        private enterpriseRequestService: EnterpriseRequestService,
        private enterpriseService: EnterpriseService,
        private snackbar: MatSnackBar,
        private translateService: TranslateService
    ) {}

    fetch(id: number) {
        // const shouldFetch =
        //     this.query.getUIEntityError(id) ||
        //     !this.query.getUIEntityLoaded(id);

        // if (!shouldFetch) return EMPTY;

        this.store.fetch(id);

        return this.enterpriseRequestService
            .get(id)
            .pipe(
                tap(
                    request =>
                        this.store.fetchSuccess(
                            id,
                            request as EnterpriseLinkRequest
                        ),
                    error => this.store.fetchError(id, error)
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

    invite(id: number, payload: CreateProgramPayload) {
        this.store.invite(id);

        const { vinculationType, requestId } = this.query.getEntity(id);

        return this.enterpriseService
            .createProgram({
                ...payload,
                modules: [vinculationType],
                referenceRequestId: requestId,
            })
            .pipe(
                tap(
                    () => {
                        this.store.inviteSuccess(id, payload);

                        this.snackbar.open(
                            this.translateService.instant(
                                'REQUEST_LINK_NOTIFICATIONS.INVITE.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    ({ error }: HttpErrorResponse) => {
                        this.store.inviteError(id, error);

                        const code =
                            error.code && error.code.includes('SCF.LIBERA')
                                ? error.code
                                : 'default';

                        this.snackbar.open(
                            this.translateService.instant(
                                `REQUEST_LINK_NOTIFICATIONS.INVITE.ERROR.${code}`
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    changeStatus(id: number, payload: ChangeEnterpriseRequestStatusPayload) {
        this.store.updateStatus(id);

        return this.enterpriseRequestService.updateStatus(id, payload).pipe(
            tap(
                () => {
                    this.store.updateStatusSuccess(id, payload);

                    let message: string;

                    switch (payload.status) {
                        case 'ACCEPTED':
                            message = this.translateService.instant(
                                'REQUEST_LINK_NOTIFICATIONS.CHANGE_STATUS.SUCCESS.ACCEPTED'
                            );
                            break;
                        case 'REJECTED':
                            message = this.translateService.instant(
                                'REQUEST_LINK_NOTIFICATIONS.CHANGE_STATUS.SUCCESS.REJECTED'
                            );
                            break;
                        default:
                            message = this.translateService.instant(
                                'REQUEST_LINK_NOTIFICATIONS.CHANGE_STATUS.SUCCESS.DEFAULT'
                            );
                    }

                    this.snackbar.open(message, 'OK');
                },
                (response: HttpErrorResponse) => {
                    this.store.updateStatusError(id, response);

                    let message: string;

                    switch (payload.status) {
                        case 'ACCEPTED':
                            if (
                                response.status == 409 &&
                                response.error &&
                                response.error.code === 'SCF.LIBERA.63'
                            )
                                message = this.translateService.instant(
                                    'REQUEST_LINK_NOTIFICATIONS.CHANGE_STATUS.ERROR.ACCEPTED_63'
                                );
                            else
                                message = this.translateService.instant(
                                    'REQUEST_LINK_NOTIFICATIONS.CHANGE_STATUS.ERROR.ACCEPTED'
                                );
                            break;
                        case 'REJECTED':
                            message = this.translateService.instant(
                                'REQUEST_LINK_NOTIFICATIONS.CHANGE_STATUS.ERROR.REJECTED'
                            );
                            break;
                        default:
                            message = this.translateService.instant(
                                'REQUEST_LINK_NOTIFICATIONS.CHANGE_STATUS.ERROR.DEFAULT'
                            );
                    }

                    this.snackbar.open(message, 'OK');
                    this.store.inviteError(id, response);
                }
            )
        );
    }

    private fetchPage(page: Page, filters: EnterpriseRequestPaginationFilters) {
        return this.enterpriseRequestService
            .getPage(page, filters, 'ENTERPRISE_LINKING')
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }
}
