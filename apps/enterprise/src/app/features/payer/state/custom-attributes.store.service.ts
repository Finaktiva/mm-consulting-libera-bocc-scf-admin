import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LenderService } from '@libera/api';
import { AuthenticationQuery } from '@libera/state';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { CustomAttributesStore } from './custom-attributes.store';

@Injectable({
    providedIn: 'root',
})
export class CustomAttributesStoreService {
    constructor(
        private store: CustomAttributesStore,
        private authenticationQuery: AuthenticationQuery,
        private lenderService: LenderService,
        private snackbar: MatSnackBar,
        private translateService: TranslateService
    ) {}

    fetchAll() {
        this.store.fetchAll();

        return this.lenderService
            .getCustomAttributes(this.enterpriseId)
            .pipe(
                tap(
                    response => this.store.fetchAllSuccess(response),
                    err => this.store.fetchAllError(err)
                )
            );
    }

    deleteCustomAttribute(id: number) {
        this.store.delete(id);

        return this.lenderService
            .deleteCustomAttribute(this.enterpriseId, id)
            .pipe(
                tap(
                    () => {
                        this.store.deleteSuccess(id);
                        this.snackbar.open(
                            this.translateService.instant(
                                'CUSTOM_ATTRIBUTES.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    err => {
                        this.store.deleteError(id, err);
                        this.snackbar.open(
                            this.translateService.instant(
                                'CUSTOM_ATTRIBUTES.ERROR'
                            ),
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
