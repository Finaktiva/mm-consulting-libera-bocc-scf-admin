import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnterpriseService } from '@libera/api';
import { enterprises } from '@libera/mocks/programs.mocks';
import {
    AvailableEnterpriseType,
    ChangeProgramStatusPayload,
    CreateProgramPayload,
    Enterprise,
    EnterpriseProviderFilterPayload,
    ProgramFiltersPayload,
    ProgramStatus,
    ProviderStatus,
    SaveNewDocument,
    UpdateEnterprisePayload,
    UpdateModulesProductsPayload,
} from '@libera/models/enterprise';
import { Page } from '@mediomelon/ng-core';
import { TranslateService } from '@ngx-translate/core';
import { ActivitiesHistoryStore } from 'apps/admin/src/app/features/programs/state/activities-history.store';
import { ActivitiesHistoryUnionQuery } from 'apps/admin/src/app/features/programs/state/activities-history.union.query';
import { ActivitiesHistoryUnionStore } from 'apps/admin/src/app/features/programs/state/activities-history.union.store';
import { tap } from 'rxjs/operators';
import { EnterpriseCreateStore } from './enterprise-create.store';
import { EnterpriseQuery } from './enterprise.query';
import { EnterpriseStore } from './enterprise.store';
import { EnterpriseProviderStore } from './enterprise-provider.store';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseStoreService {
    constructor(
        private store: EnterpriseStore,
        private createStore: EnterpriseCreateStore,
        private query: EnterpriseQuery,
        private enterpriseService: EnterpriseService,
        private snackbar: MatSnackBar,
        private activitiesHistoryStore: ActivitiesHistoryStore,
        private activitiesHistoryUnionStore: ActivitiesHistoryUnionStore,
        private activitiesHistoryUnionQuery: ActivitiesHistoryUnionQuery,
        private translateService: TranslateService,
        private providerStore: EnterpriseProviderStore,
    ) {}

    toggleEditing(id: number) {
        this.store.toggleEditing(id);
    }

    addNewDocument (id:number, document:SaveNewDocument) {
        this.store.addDocument(id, document);
    }

    update(id: number, enterprise: Enterprise) {
        const payload: UpdateEnterprisePayload = {
            city: enterprise.city,
            department: enterprise.department,
            enterpriseName: enterprise.enterpriseName,
            owner: enterprise.owner,
            phone: {
                extension: enterprise.phone.extension,
                number: enterprise.phone.number,
            },
            sectorId: 1,
            bankRegion:{
                id: enterprise.bankRegion.id
            }
        };
        this.store.update(id);
        return this.enterpriseService.update(id, payload).pipe(
            tap(
                () => {
                    this.snackbar.open(
                        this.translateService.instant(
                            'COMMON.ENTERPRISE.ENTERPRISE_UPDATE'
                        ),
                        'OK'
                    );
                    this.store.updateSuccess(id, enterprise);
                },
                error => {
                    this.snackbar.open(
                        this.translateService.instant(
                            'COMMON.ENTERPRISE.ERROR_LOAD_ENTERPRISE'
                        ),
                        'OK'
                    );
                    this.store.updateError(id, error);
                }
            )
        );
    }

    updateStatus(id: number, payload: ChangeProgramStatusPayload) {
        this.store.updateStatus(id);

        return this.enterpriseService.changeProgramStatus(id, payload).pipe(
            tap(
                () => {
                    this.store.updateStatusSuccess(id, payload.status);
                    this.snackbar.open(
                        this.translateService.instant(
                            'ENTERPRISE.UPDATE_STATUS_PROGRAM'
                        ),
                        'OK'
                    );
                },
                error => {
                    this.store.updateStatusError(id, error);
                    this.snackbar.open(
                        this.translateService.instant(
                            'ENTERPRISE.ERRORS.UPDATE_STATUS_PROGRAM'
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    create({bankRegion, ...rest}: CreateProgramPayload) {
        this.createStore.submit();

        const payload = {
            ...rest,
            bankRegion:{
                id: bankRegion.id
            }
        }

        return this.enterpriseService.createProgram(payload).pipe(
            tap(
                enterprise => {
                    this.createStore.submitSuccess();
                    this.store.insert(enterprise);
                    this.snackbar.open(
                        this.translateService.instant(
                            'ENTERPRISE.PROGRAM_INVITED'
                        ),
                        'OK'
                    );
                },
                ({ error }) => {
                    this.createStore.submitError(error);

                    const code =
                        error.code && error.code.includes('SCF.LIBERA')
                            ? error.code
                            : 'default';

                    const params = 
                        error.code && error.code.includes('SCF.LIBERA.300')
                            ? { documentType: payload.enterpriseDocumentType, documentNumber: payload.nit }
                            : {};

                    this.snackbar.open(
                        this.translateService.instant(
                            `ENTERPRISE.ERRORS.PROGRAM_INVITED.${code}`,
                            params
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    invite(id: number) {
        this.store.invite(id);

        return this.enterpriseService.resendInvitation(id).pipe(
            tap(
                () => {
                    this.store.inviteSuccess(id);
                    this.snackbar.open(
                        this.translateService.instant(
                            'ENTERPRISE.INVITATION_FORWARDED'
                        ),
                        'OK'
                    );
                },
                error => {
                    this.store.inviteError(id, error);
                    this.snackbar.open(
                        this.translateService.instant(
                            'ENTERPRISE.ERRORS.INVITATION_FORWARD'
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    fetch(id: number) {
        // const shouldFetch =
        //     this.query.getUIEntityError(id) ||
        //     !this.query.getUIEntityLoaded(id);

        // if (!shouldFetch) return EMPTY;

        this.store.fetch(id);

        return this.enterpriseService
            .get(id)
            .pipe(
                tap(
                    enterprise => this.store.fetchSuccess(id, enterprise),
                    error => this.store.fetchError(id, error)
                )
            );
    }

    fetchCurrentPage(status: ProgramStatus) {
        // const shouldFetch = this.query.getError() || !this.query.getLoaded();

        // if (!shouldFetch) return EMPTY;

        const page = this.query.getPage();
        const filters = this.query.getFilters();

        this.store.fetchPage();

        return this.fetchPage(page, filters, status);
    }

    changePage(page: Page, status: ProgramStatus) {
        const filters = this.query.getFilters();

        this.store.fetchPage(page);

        return this.fetchPage(page, filters, status);
    }

    changeFilters(filters: ProgramFiltersPayload, status: ProgramStatus) {
        this.store.fetchPageWithFilters(filters);

        const page = this.query.getPage();

        return this.fetchPage(page, filters, status);
    }

    private fetchPage(
        page: Page,
        filters: ProgramFiltersPayload,
        status: ProgramStatus
    ) {
        return this.enterpriseService
            .getPage(filters, page, status)
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }

    fetchProvidersFilter(id: number, query: string, type: AvailableEnterpriseType, documentType: string) {

        return this.enterpriseService.findAvailableEnterprises(id, query, type, documentType);
    }


    fetchActivitiesHistory(id: number) {
        // const shouldFetch = this.activitiesHistoryUnionQuery.shouldFetch(id);

        // if (!shouldFetch) return EMPTY;
        this.activitiesHistoryStore.fetchAll();
        this.activitiesHistoryUnionStore.fetchAll(id);

        return this.enterpriseService.findActivityHistory(id).pipe(
            tap(
                response => {
                    this.activitiesHistoryStore.fetchAllSuccess(response);
                    this.activitiesHistoryUnionStore.fetchAllSuccess(
                        id,
                        response.map(response => response.id)
                    );
                },
                error => this.activitiesHistoryStore.fetchAllError(error)
            )
        );
    }

    fetchByCriterion(type: string, number: string, module: string){
        this.store.fetch(number);
        return this.enterpriseService.findByCriterion(type, number, module).pipe(
            tap(
                enterprise => this.store.fetchSuccess(number,enterprise),
                error => this.store.fetchError(number,error)
            )
        );
    }

    updateModulesProducts(id: number, enterprise: Enterprise){
        const payload: UpdateModulesProductsPayload = {
            id: enterprise.idRegister,
            phone: {
                phoneExt: enterprise.phoneExt,
                number: enterprise.phoneNumber
            },
            owner: {
                id: enterprise.idOwner,
                secondSurname: enterprise.secondSurname,
                modules: enterprise.modules,
                documentNumber: enterprise.documentNumber,
                documentType: enterprise.documentType
            },
            productType: enterprise.productType,
            relationshipManager: enterprise.relationshipManager,
            sales: enterprise.sales,
            salesCut: enterprise.salesPerYear,
            bankRegion:{
                id: enterprise.bankRegion.id
            }
        };
        this.store.updateModulesProducts(+enterprise.nit);
    
        return this.enterpriseService.updateModulesProducts(id, payload).pipe(
            tap(
                () => {
                    this.snackbar.open(
                        this.translateService.instant(
                            'COMMON.ENTERPRISE.ENTERPRISE_UPDATE'
                        ),
                        'OK'
                    );
                    this.store.updateSuccess(+enterprise.nit, enterprise);
                },
                error => {
                    this.snackbar.open(
                        this.translateService.instant(
                            'COMMON.ENTERPRISE.ERROR_LOAD_ENTERPRISE'
                        ),
                        'OK'
                    );
                    this.store.updateError(+enterprise.nit, error);
                }
            )
        );
    }

    sendDocumentationResolution (id: number){
        this.store.documentationResolution(id);

        return this.enterpriseService.documentationResolution(id).pipe(
            tap(
                () => {
                    this.store.documentationResolutionSuccess(id);
                    this.snackbar.open(
                        this.translateService.instant(
                            'ENTERPRISE.RESOLUTION_SENT'
                        ),
                        'OK'
                    );
                },
                error => {
                    this.store.documentationResolutionError(id, error);
                    this.snackbar.open(
                        this.translateService.instant(
                            'ENTERPRISE.ERRORS.RESOLUTION_SENT'
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    getEnterprisesBasicInfo(id: number){
        this.store.fetchEnterprisesBasicInfo(id);

        return this.enterpriseService.getEnterprisesBasicInfo(id).pipe(
            tap(
                () => {
                    this.store.fetchEnterprisesBasicInfoSuccess(id);
                },
                error => {
                    this.store.fetchEnterprisesBasicInfoError(id, error);
                }
            )
        )
    }
}
