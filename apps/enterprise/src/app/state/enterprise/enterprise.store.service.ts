import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EnterpriseService } from '@libera/api';
import { Enterprise, UpdateEnterprisePayload } from '@libera/models/enterprise';
import { AuthenticationQuery, AuthenticationStoreService } from '@libera/state';
import { TranslateService } from '@ngx-translate/core';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { EnterpriseQuery } from './enterprise.query';
import { EnterpriseStore } from './enterprise.store';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseStoreService {
    private snackbarConfig: MatSnackBarConfig = {
        horizontalPosition: 'right',
    };

    constructor(
        private store: EnterpriseStore,
        private query: EnterpriseQuery,
        private authenticationQuery: AuthenticationQuery,
        private enterpriseService: EnterpriseService,
        private snackbar: MatSnackBar,
        private router: Router,
        private translateService: TranslateService,
        private authenticationStoreService: AuthenticationStoreService
    ) {
        this.authenticationQuery
            .selectLoaded()
            .pipe(
                filter(loaded => loaded),
                take(1),
                switchMap(() => this.fetch())
            )
            .subscribe();
    }

    fetch() {
        // const shouldFetch = this.query.getError() || !this.query.getLoaded();

        // if (!shouldFetch) return EMPTY;

        const id = this.authenticationQuery.getEnterpriseId();

        this.store.fetch();

        return this.enterpriseService.get(id).pipe(
            tap(
                enterprise => {
                    if (enterprise.status === 'REJECTED') {
                        this.store.fetchSuccess(enterprise);
                        this.authenticationStoreService.signOut().subscribe();
                    } else {
                        this.store.fetchSuccess(enterprise);
                    }
                },
                error => this.store.fetchError(error)
            )
        );
    }

    request() {
        this.store.request();

        return this.enterpriseService
            .request(this.authenticationQuery.getEnterpriseId())
            .pipe(
                tap(
                    () => {
                        this.store.requestSuccess();
                        this.snackbar.open(
                            this.translateService.instant(
                                'ENTERPRISE.REQUEST_SENT_SUCCESSFULLY'
                            ),
                            'OK',
                            this.snackbarConfig
                        );
                        this.router.navigateByUrl('/documentation/status');
                    },
                    error => {
                        this.store.requestError(error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'ENTERPRISE.ERROR_REQUEST_SENT'
                            ),
                            'OK',
                            this.snackbarConfig
                        );
                    }
                )
            );
    }

    update(enterprise: Enterprise) {
        const id = this.authenticationQuery.getEnterpriseId();

        const payload: UpdateEnterprisePayload = {
            city: enterprise.city,
            department: enterprise.department,
            enterpriseName: enterprise.enterpriseName,
            owner: enterprise.owner,
            phone: {
                extension: enterprise.phone.extension,
                number: enterprise.phone.number,
            },
            bankRegion:{
                id: enterprise.bankRegion.id
            },
            sectorId: enterprise.sector.id,
        };

        this.store.update();

        return this.enterpriseService.update(id, payload).pipe(
            tap(
                () => {
                    this.snackbar.open(
                        this.translateService.instant(
                            'COMMON.ENTERPRISE.ENTERPRISE_UPDATE'
                        ),
                        'OK'
                    );
                    this.store.updateSuccess(enterprise);
                },
                error => {
                    this.snackbar.open(
                        this.translateService.instant(
                            'COMMON.ENTERPRISE.ERROR_LOAD_ENTERPRISE'
                        ),
                        'OK'
                    );
                    this.store.updateError(error);
                }
            )
        );
    }
}
