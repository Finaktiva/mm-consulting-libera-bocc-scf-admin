import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LenderService } from '@libera/api';
import { PayerCustomAttributePayload } from '@libera/models/payer';
import { AuthenticationQuery } from '@libera/state';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { PayerCustomAttributesStore } from './payer-custom-attributes.store';

@Injectable({
    providedIn: 'root',
})
export class PayerCustomAttributesStoreService {
    constructor(
        private store: PayerCustomAttributesStore,
        private authenticationQuery: AuthenticationQuery,
        private snackbar: MatSnackBar,
        private service: LenderService,
        private translateService: TranslateService
    ) {}

    get enterpriseId() {
        return this.authenticationQuery.getEnterpriseId();
    }

    updatePayerCustomAttributes(
        id: number,
        payload: PayerCustomAttributePayload[]
    ) {
        this.store.update(id);

        return this.service
            .updatePayerCustomAttributes(this.enterpriseId, id, payload)
            .pipe(
                tap(
                    response => {
                        // this.store.updateSuccess(id, payload);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_CUSTOM_ATTRIBUTES.SUCCESS.SAVED_INFO'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.store.updateError(id, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_CUSTOM_ATTRIBUTES.ERRORS.UPDATE_INFO'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    deletePayerCustomAttribute(id: number) {
        this.store.delete(id);

        return this.service
            .deletePayerCustomAttribute(this.enterpriseId, id, 0)
            .pipe(
                tap(
                    () => {
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_CUSTOM_ATTRIBUTES.SUCCESS.ATTRIBUTE_DELETED'
                            ),
                            'OK'
                        );
                    },
                    err => {
                        this.store.deleteError(id, err);
                        this.snackbar.open(
                            this.translateService.instant(
                                'PAYER_CUSTOM_ATTRIBUTES.ERRORS.ATTRIBUTE_DELETED'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }
}
