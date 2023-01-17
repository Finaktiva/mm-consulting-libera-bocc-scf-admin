import { Injectable } from '@angular/core';
import { LenderCustomAttribute } from '@libera/models/lender';
import { AuthenticationQuery } from '@libera/state';
import { LenderService } from '@libera/api';
import { CustomAttributesStore } from './custom-attributes.store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { CreateCustomAttributesStore } from './create-custom-attributes.store';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class CreateCustomAttributesStoreService {
    constructor(
        private authenticationQuery: AuthenticationQuery,
        private lenderService: LenderService,
        private customAttributesStore: CustomAttributesStore,
        private snackbar: MatSnackBar,
        private createStore: CreateCustomAttributesStore,
        private translateService: TranslateService
    ) { }

    createCustomAttribute(payload: LenderCustomAttribute) {
        this.createStore.submit();

        return this.lenderService
            .createCustomAttributes(this.enterpriseId, payload)
            .pipe(
                tap(
                    response => {
                        this.createStore.submitSuccess();
                        this.customAttributesStore.insert(response);
                        this.snackbar.open(
                            this.translateService.instant('CREATE_CUSTOM_ATTRIBUTES.SUCCESS'),
                            'OK'
                        );
                    },
                    err => {
                        this.createStore.submitError(err);
                        this.snackbar.open(
                            this.translateService.instant('CREATE_CUSTOM_ATTRIBUTES.ERROR'),
                            'OK'
                        );
                    }
                )
            );
    }

    get enterpriseId() {
        return this.authenticationQuery.getEnterpriseId();
    }
}
