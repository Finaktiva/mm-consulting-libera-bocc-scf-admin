import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnterpriseService, S3Service } from '@libera/api';
import { EnterpriseModuleName, RequestEnterpriseModuleActivationPayload } from '@libera/models/enterprise';
import { RouterHelper } from '@libera/shared';
import { AuthenticationQuery } from '@libera/state';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, tap } from 'rxjs/operators';

import { EnterpriseModuleQuery } from './enterprise-module.query';
import { EnterpriseModuleStore } from './enterprise-module.store';

@Injectable({
    providedIn: 'root'
})
export class EnterpriseModuleStoreService {
    constructor(
        private routeHelper: RouterHelper,
        private store: EnterpriseModuleStore,
        private query: EnterpriseModuleQuery,
        private authenticationQuery: AuthenticationQuery,
        private enterpriseService: EnterpriseService,
        private s3Service: S3Service,
        private snackbar: MatSnackBar,
        private translateService: TranslateService
    ) {}

    fetchAll() {
        // const shouldFetch = !this.query.getLoaded() || this.query.getError();

        // if (!shouldFetch) return EMPTY;

        this.store.fetchAll();

        return this.enterpriseService
            .getModules(this.authenticationQuery.getEnterpriseId())
            .pipe(
                tap(
                    payload => this.store.fetchAllSuccess(payload),
                    error => this.store.fetchAllError(error)
                )
            );
    }

    requestModuleActivation(payload: RequestEnterpriseModuleActivationPayload) {
        this.store.requestActivation(payload.module);

        const route = this.routeHelper.getCurrentRoute();

        return this.enterpriseService
            .requestModuleActivation(
                this.authenticationQuery.getEnterpriseId(),
                payload,
                route.snapshot.queryParamMap.get('token')
            )
            .pipe(
                tap(
                    () => {
                        this.store.requestActivationSuccess(payload.module);
                        this.snackbar.open(
                            this.translateService.instant(
                                'ENTERPRISE_MODULE_NOTIFICATIONS.REQUEST_MODULE_ACTIVATION.SUCCESS'
                            ),
                            'OK'
                        );
                    },
                    error => {
                        this.store.requestActivationError(
                            payload.module,
                            error
                        );
                        this.snackbar.open(
                            this.translateService.instant(
                                'ENTERPRISE_MODULE_NOTIFICATIONS.REQUEST_MODULE_ACTIVATION.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }

    uploadFile(
        module: EnterpriseModuleName,
        documentationId: number,
        file: File,
        explanation:string,
        expeditionDate:string
    ) {
        this.store.uploadFile(module);

        return this.s3Service.generateUrl({ filename: file.name }).pipe(
            switchMap(url => this.s3Service.upload(url, file)),
            switchMap(() =>
                this.enterpriseService.linkFileToDocumentation(
                    this.authenticationQuery.getEnterpriseId(),
                    documentationId,
                    file.name,
                    explanation,
                    expeditionDate
                )
            ),
            tap(
                result =>
                    this.store.uploadFileSuccess(module, {
                        ...result,
                        name: file.name,
                    }),
                error => {
                    this.store.uploadFileError(module, error);
                    this.snackbar.open(
                        this.translateService.instant(
                            'ENTERPRISE_MODULE_NOTIFICATIONS.UPDATE_FILE.ERROR'
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    deleteFile(module: EnterpriseModuleName, documentationId: number) {
        this.store.deleteFile(module);

        return this.enterpriseService
            .deleteFileFromDocumentation(
                this.authenticationQuery.getEnterpriseId(),
                documentationId
            )
            .pipe(
                tap(
                    () => this.store.deleteFileSuccess(module),
                    error => {
                        this.store.deleteFileError(module, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'ENTERPRISE_MODULE_NOTIFICATIONS.DELETE_FILE.ERROR'
                            ),
                            'OK'
                        );
                    }
                )
            );
    }
}
