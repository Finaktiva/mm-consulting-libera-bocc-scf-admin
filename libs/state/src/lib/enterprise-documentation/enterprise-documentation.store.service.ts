import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CatalogService, EnterpriseService, S3Service } from '@libera/api';
import { ChangeDocumentationStatusPayload, EnterpriseDocumentation, EnterpriseStatus, SaveNewDocument } from '@libera/models/enterprise';
import { EMPTY } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { EnterpriseDocumentationQuery } from './enterprise-documentation.query';
import { EnterpriseDocumentationStore } from './enterprise-documentation.store';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationQuery } from '../authentication';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseDocumentationStoreService {
    private snackbarConfig: MatSnackBarConfig = {
        horizontalPosition: 'right',
    };

    constructor(
        private query: EnterpriseDocumentationQuery,
        private store: EnterpriseDocumentationStore,
        private s3Service: S3Service,
        private enterpriseService: EnterpriseService,
        private catalogServise: CatalogService,
        private snackbar: MatSnackBar,
        private translateService: TranslateService,
        private authenticationQuery: AuthenticationQuery,
    ) {}

    fetchEnterprise() {
        return this.fetch(
            this.authenticationQuery.getEnterpriseId()
        );
    }

    changeStatusEnterprise(id: number, payload: ChangeDocumentationStatusPayload) {
        return this.changeStatus(
            this.authenticationQuery.getEnterpriseId(),
            id,
            payload
        );
    }

    uploadFileEnterprise(id: number, file: File, explanation:string, expeditionDate:string, isUpdate: boolean) {
        return this.uploadFile(
            this.authenticationQuery.getEnterpriseId(),
            id,
            file,
            explanation,
            expeditionDate,
            isUpdate
        );
    }

    deleteFileEnterprise(id: number) {
        return this.deleteFile(
            this.authenticationQuery.getEnterpriseId(),
            id
        );
    }
    saveNewDocumentEnterprise(payload: SaveNewDocument){
        return this.saveNewDocument(
            this.authenticationQuery.getEnterpriseId(),
            payload
        )
    }

    fetch(id: number) {
        // const shouldFetch =
        //     !this.query.getEnterpriseLoaded(id) ||
        //     this.query.getEnterpriseError(id);

        // if (!shouldFetch) return EMPTY;
        this.store.fetch(id);
        return this.enterpriseService
            .getDocumentation(id)
            .pipe(
                tap(
                    documentation => this.store.fetchSuccess(id, documentation),
                    error => this.store.fetchError(id, error)
                )
            );
    }

    uploadFile(enterpriseId: number, documentationId: number, file: File, explanation:string, expeditionDate:string, isUpdate?: boolean) {
        this.store.uploadFile(documentationId);
        return this.s3Service
            .generateUrl({ filename: file.name, enterpriseId })
            .pipe(
                switchMap(url => this.s3Service.upload(url, file)),
                switchMap(() =>
                    this.enterpriseService.linkFileToDocumentation(
                        enterpriseId,
                        documentationId,
                        file.name,
                        explanation,
                        expeditionDate
                    )
                ),
                tap(
                    payload => {
                        this.store.uploadFileSuccess(documentationId, {
                            ...payload,
                            name: file.name,
                            expeditionDate: expeditionDate,
                            explanation,
                        });
                        if (!isUpdate) {
                            this.snackbar.open(
                                this.translateService.instant(
                                    'ENTERPRISE_DOCUMENTATION.SUCCESSFUL_FILE_LOAD'
                                ),
                                'OK',
                                this.snackbarConfig
                            );
                        }else{
                            this.snackbar.open(
                                this.translateService.instant(
                                    'ENTERPRISE_DOCUMENTATION.SUCCESSFUL_FILE_UPDATE'
                                ),
                                'OK',
                                this.snackbarConfig
                            );
                        }
                    },
                    error => {
                        this.store.uploadFileError(documentationId, error);
                        if(!isUpdate){
                            this.snackbar.open(
                                this.translateService.instant(
                                    'ENTERPRISE_DOCUMENTATION.ERRORS.FILE_LOAD'
                                ),
                                'OK',
                                this.snackbarConfig
                            );
                        }else{
                            this.snackbar.open(
                                this.translateService.instant(
                                    'ENTERPRISE_DOCUMENTATION.ERRORS.FILE_UPDATE'
                                ),
                                'OK',
                                this.snackbarConfig
                            );
                        }
                    }
                )
            );
    }

    uploadProviderFile (file: File) {
        this.store.uploadFileProvider(0);
        return this.s3Service
            .generateUrl({ filename: file.name })
            .pipe(
                switchMap(url => this.s3Service.upload(url, file)),
                tap(
                    payload => {
                        this.store.uploadFileSuccessProvider(0);
                        this.snackbar.open(
                            this.translateService.instant(
                                'ENTERPRISE_DOCUMENTATION.SUCCESSFUL_FILE_LOAD'
                            ),
                            'OK',
                            this.snackbarConfig
                        );
                    },
                    error => {
                        this.store.uploadFileErrorProvider(0, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'ENTERPRISE_DOCUMENTATION.ERRORS.FILE_LOAD'
                            ),
                            'OK',
                            this.snackbarConfig
                        );
                    }
                )
            );
    }

    deleteFile(enterpriseId: number, documentationId: number) {
        this.store.deleteFile(documentationId);

        return this.enterpriseService
            .deleteFileFromDocumentation(enterpriseId, documentationId)
            .pipe(
                tap(
                    () => {
                        this.store.deleteFileSuccess(documentationId);
                        this.snackbar.open(
                            this.translateService.instant(
                                'ENTERPRISE_DOCUMENTATION.DELETED_FILE'
                            ),
                            'OK',
                            this.snackbarConfig
                        );
                    },
                    error => {
                        this.store.deleteFileError(documentationId, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'ENTERPRISE_DOCUMENTATION.ERRORS.DELETE_FILE'
                            ),
                            'OK',
                            this.snackbarConfig
                        );
                    }
                )
            );
    }

    changeStatus(
        enterpriseId: number,
        documentationId: number,
        payload: ChangeDocumentationStatusPayload
    ) {
        this.store.updateStatus(documentationId);

        return this.enterpriseService
            .changeDocumentationStatus(enterpriseId, documentationId, payload)
            .pipe(
                tap(
                    () => {
                        this.store.updateStatusSuccess(
                            documentationId,
                            payload
                        );
                        if(payload.status == 'ACCEPTED')
                            this.snackbar.open(
                                this.translateService.instant(
                                    'ENTERPRISE_DOCUMENTATION.APPROVED_FILE'
                                ),
                                'OK'
                            );
                        else if(payload.status == 'REJECTED')
                            this.snackbar.open(
                                this.translateService.instant(
                                    'ENTERPRISE_DOCUMENTATION.REJECTED_FILE'
                                ),
                                'OK'
                            );
                        else
                            this.snackbar.open(
                                this.translateService.instant(
                                    'ENTERPRISE_DOCUMENTATION.UPDATED_FILE'
                                ),
                                'OK'
                            );
                    },
                    error => {
                        this.store.updateStatusError(documentationId, error);
                        if(payload.status == 'ACCEPTED')
                            this.snackbar.open(
                                this.translateService.instant(
                                    'ENTERPRISE_DOCUMENTATION.ERROR.APPROVED_FILE'
                                ),
                                'OK'
                            );
                        else if(payload.status == 'REJECTED')
                            this.snackbar.open(
                                this.translateService.instant(
                                    'ENTERPRISE_DOCUMENTATION.ERROR.REJECTED_FILE'
                                ),
                                'OK'
                            );
                        else
                            this.snackbar.open(
                                this.translateService.instant(
                                    'ENTERPRISE_DOCUMENTATION.ERRORS.UPDATED_FILE'
                                ),
                                'OK'
                            );
                    }
                )
            );
    }

    saveNewDocument (enterpriseId:number, payload:SaveNewDocument) {
        this.store.fetch(enterpriseId);
        return this.enterpriseService
            .saveNewDocument(enterpriseId, payload)
            .pipe(
                tap(
                    (document: EnterpriseDocumentation) => {
                        this.snackbar.open(
                            this.translateService.instant('ENTERPRISE_DOCUMENTATION.NEW_DOCUMENT_SAVED'),
                            'OK'
                        );
                        this.store.fetchSuccessNewDocument(enterpriseId, document);
                    },
                    (error) => {
                        console.log(error)
                        if(error.error.code == 'SCF.LIBERA.292')
                        this.snackbar.open(
                            this.translateService.instant('ENTERPRISE_DOCUMENTATION.ERRORS.LIMIT_FILE'),
                            'OK'
                        );
                        else
                        this.snackbar.open(
                            this.translateService.instant('ENTERPRISE_DOCUMENTATION.NEW_DOCUMENT_NOT_SAVED'),
                            'OK'
                        );
                        this.store.fetchError(enterpriseId, error);
                    }
                )
            )
    }

    uploadBasicFile (id: number, file: File) {
        this.store.uploadBasicFile(0);
        return this.s3Service
            .generateUrl({ filename: file.name, enterpriseId: id })
            .pipe(
                switchMap(url => this.s3Service.upload(url, file)),
                tap(
                    payload => {
                        this.store.uploadBasicFileSuccess(0);
                        this.snackbar.open(
                            this.translateService.instant(
                                'ENTERPRISE_DOCUMENTATION.SUCCESSFUL_FILE_LOAD'
                            ),
                            'OK',
                            this.snackbarConfig
                        );
                    },
                    error => {
                        console.log(error)
                        this.store.uploadBasicFileError(0, error);
                        this.snackbar.open(
                            this.translateService.instant(
                                'ENTERPRISE_DOCUMENTATION.ERRORS.FILE_LOAD'
                            ),
                            'OK',
                            this.snackbarConfig
                        );
                    }
                )
            );
    }
}
