import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnterpriseService } from '@libera/api';
import { EnterpriseCustomAttribute } from '@libera/models/enterprise';
import { AuthenticationQuery } from '@libera/state';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { CreateCustomAttributeStore } from './create-custom-attribute.store';
import { CustomAttributeQuery } from './custom-attribute.query';
import { CustomAttributeStore } from './custom-attribute.store';

@Injectable({
    providedIn: 'root',
})
export class CustomAttributeStoreService {
    constructor(
        private store: CustomAttributeStore,
        private query: CustomAttributeQuery,
        private createStore: CreateCustomAttributeStore,
        private authenticationQuery: AuthenticationQuery,
        private enterpriseService: EnterpriseService,
        private snackbar: MatSnackBar,
        private translateService: TranslateService
    ) {}

    fetchAll() {
        // const shouldFetch = this.query.getError() || !this.query.getLoaded();

        // if (!shouldFetch) return EMPTY;

        const id = this.authenticationQuery.getEnterpriseId();

        this.store.fetchAll();

        return this.enterpriseService
            .getCustomAttributes(id)
            .pipe(
                tap(
                    payload => this.store.fetchAllSuccess(payload),
                    error => this.store.fetchAllError(error)
                )
            );
    }

    create(payload: EnterpriseCustomAttribute) {
        const id = this.authenticationQuery.getEnterpriseId();

        this.createStore.submit();

        return this.enterpriseService.createCustomAttribute(id, payload).pipe(
            tap(
                payload => {
                    this.store.insert(payload);
                    this.createStore.submitSuccess();
                    this.snackbar.open(
                        this.translateService.instant(
                            'CUSTOM_ATTRIBUTE_NOTIFICATIONS.CREATE.SUCCESS'
                        ),
                        'OK'
                    );
                },
                error => {
                    this.createStore.submitError(error);
                    this.snackbar.open(
                        this.translateService.instant(
                            'CUSTOM_ATTRIBUTE_NOTIFICATIONS.CREATE.ERROR'
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    delete(attributeId: number) {
        const enterpriseId = this.authenticationQuery.getEnterpriseId();

        this.store.delete(attributeId);

        return this.enterpriseService
            .deleteCustomAttribute(enterpriseId, attributeId)
            .pipe(
                tap(
                    () => {
                        this.store.deleteSuccess(attributeId);
                        this.snackbar.open(
                            this.translateService.instant(
                                'CUSTOM_ATTRIBUTE_NOTIFICATIONS.DELETE.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.store.deleteError(attributeId, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'CUSTOM_ATTRIBUTE_NOTIFICATIONS.DELETE.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }
}
