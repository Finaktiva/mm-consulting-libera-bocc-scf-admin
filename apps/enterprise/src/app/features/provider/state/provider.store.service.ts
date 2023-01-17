import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EnterpriseService, S3Service } from '@libera/api';
import {
    EnterpriseProviderBulkCreatePayload,
    EnterpriseProviderFilterPayload,
    EnterpriseProviderPayload,
} from '@libera/models/enterprise';
import { AuthenticationQuery } from '@libera/state';
import { Page } from '@mediomelon/ng-core';
import { EMPTY } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ProviderBulkCreateStore } from './provider-bulk-create.store';
import { ProviderBulkQuery } from './provider-bulk.query';
import { ProviderBulkStore } from './provider-bulk.store';
import { ProviderCreateStore } from './provider-create.store';
import { ProviderQuery } from './provider.query';
import { ProviderStore } from './provider.store';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class ProviderStoreService {
    constructor(
        private s3Service: S3Service,
        private enterpriseService: EnterpriseService,
        private store: ProviderStore,
        private query: ProviderQuery,
        private bulkStore: ProviderBulkStore,
        private bulkQuery: ProviderBulkQuery,
        private createStore: ProviderCreateStore,
        private bulkCreateStore: ProviderBulkCreateStore,
        private authenticationQuery: AuthenticationQuery,
        private snackbar: MatSnackBar,
        private router: Router,
        private translateService: TranslateService
    ) {}

    fetchCurrentBulkPage(force: boolean = false) {
        // const shouldFetch =
        //     force || this.bulkQuery.getError() || !this.bulkQuery.getLoaded();

        // if (!shouldFetch) return EMPTY;

        const page = this.bulkQuery.getPage();

        this.bulkStore.fetchPage();

        return this.fetchBulkPage(page);
    }

    changeBulkPage(page: Page) {
        this.bulkStore.fetchPage(page);

        return this.fetchBulkPage(page);
    }

    bulkCreate({ file, requests }: EnterpriseProviderBulkCreatePayload) {
        const id = this.authenticationQuery.getEnterpriseId();

        this.bulkCreateStore.submit();

        return this.s3Service
            .generateUrl({ filename: file.name, contentType: file.type })
            .pipe(
                switchMap(url => this.s3Service.upload(url, file)),
                switchMap(() =>
                    this.enterpriseService.linkFileToProvider(
                        id,
                        file.name,
                        file.type
                    )
                ),
                switchMap(({ enterpriseRequestBulkId }) =>
                    this.enterpriseService.bulkCreateProviders(id, {
                        enterpriseRequestBulkId,
                        requests,
                    })
                ),
                tap(
                    payload => {
                        this.bulkCreateStore.submitSuccess();
                        this.bulkStore.insert(payload);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PROVIDER_NOTIFICATIONS.BULK_CREATE.SUCESS'
                            ),
                            'OK'
                        );
                        this.router.navigateByUrl('/core/providers/bulk');
                    },
                    error => {
                        this.bulkCreateStore.submitError(error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PROVIDER_NOTIFICATIONS.BULK_CREATE.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    create(payload: EnterpriseProviderPayload) {
        const id = this.authenticationQuery.getEnterpriseId();

        this.createStore.submit();

        return this.enterpriseService.createProvider(id, payload).pipe(
            tap(
                payload => {
                    this.createStore.submitSuccess();
                    this.store.insert(payload);
                    this.snackbar.open(
                        this.translateService.instant(
                            'PROVIDER_NOTIFICATIONS.CREATE.SUCCESS'
                        ),
                        'OK'
                    );
                },
                ({error}) => {
                    this.createStore.submitError(error);

                    const code = error.code && error.code.includes('SCF.LIBERA')?
                        error.code:
                        "ERROR"

                    this.snackbar.open(
                        this.translateService.instant(
                            `PROVIDER_NOTIFICATIONS.CREATE.${code}`
                        ),
                        'OK'
                    );
                }
            )
        );
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

    changeFilters(filters: EnterpriseProviderFilterPayload) {
        this.store.fetchPageWithFilters(filters);

        const page = this.query.getPage();

        return this.fetchPage(page, filters);
    }

    private fetchPage(page: Page, filters: EnterpriseProviderFilterPayload) {
        const id = this.authenticationQuery.getEnterpriseId();

        return this.enterpriseService
            .getProviderPage(id, page, filters)
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }

    private fetchBulkPage(page: Page) {
        const id = this.authenticationQuery.getEnterpriseId();

        return this.enterpriseService
            .getProviderBulkPage(id, page)
            .pipe(
                tap(
                    payload => this.bulkStore.fetchPageSuccess(payload),
                    error => this.bulkStore.fetchPageError(error)
                )
            );
    }
}
