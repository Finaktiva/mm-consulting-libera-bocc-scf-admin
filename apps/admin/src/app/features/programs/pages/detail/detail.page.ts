import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityHistory, BasicFinancialPlan, ChangeDocumentationStatus, DocumentationFilePayload, Enterprise, EnterpriseDocumentation, EnterpriseStatus, ENTERPRISE_STATUS } from '@libera/models/enterprise';
import { RouterService } from '@libera/shared';
import { CountryCallingCodeQuery, CountryCallingCodeStoreService, EnterpriseDocumentationQuery, EnterpriseDocumentationStoreService, EnterpriseQuery, EnterpriseSectorQuery, EnterpriseSectorStoreService, EnterpriseStoreService, BankQuery,BankStore, BankStoreService, DocumentTypeQuery, DocumentTypeStore, DocumentTypeStoreService, CitiesAndDepartmentsQuery, BankRegionsQuery, BankRegionsStoreServices, EnterpriseFinancialPlanQuery, FinancialPlanUI, EnterpriseFinancialPlanStoreService, ProfileRolePermissionsQuery } from '@libera/state'
import { StateWithUI } from '@mediomelon/ng-core';
import { ReuploadFileDialog } from 'apps/admin/src/app/dialogs/reupload-file/reupload-file.dialog';
import { EnterpriseDocumentationUI } from 'libs/state/src/lib/enterprise-documentation/enterprise-documentation.store';
import { combineLatest, observable, Observable, Subscription } from 'rxjs';
import { auditTime, map, switchMap, tap } from 'rxjs/operators';
import { UserStoreService } from '../../../user/state/user.store.service';
import { AcceptProgramDialogComponent } from '../../dialogs/accept-program-dialog/accept-program-dialog.component';
import { AddDocumentDialog } from '../../dialogs/add-document/add-document-dialog';
import { SendInvitationDialog } from '../../dialogs/send-invitation-dialog/send-invitation.dialog';
import { SendResolutionDialog } from '../../dialogs/send-resolution-dialog/send-resolution.dialog';
import { ConfirmRejectDialog } from '../../dialogs/confirm-reject/confirm-reject.dialog';
import { ActivitiesHistoryQuery } from '../../state/activities-history.query';
import { BankRegions, DocumentType, PlanFiltersPayload } from '@libera/models/catalog';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import { PageEvent } from '@angular/material/paginator/typings';
import { CreateFinancialConditionsDialog } from '../../dialogs/create-financial-conditions-dialog/create-financial-conditions.dialog';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CodePermission } from '@libera/models/user';


@Component({
    selector: 'program-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPage implements OnInit, OnDestroy {

    filters$: Observable<PlanFiltersPayload>;

    total$: Observable<number>;

    paginationSize$: Observable<number>;

    paginationIndex$: Observable<number>;
    
    isLoadingFinancialPlan$: Observable<boolean>;

    isSubmitting$: Observable<boolean>;

    isLoadingDetail$: Observable<boolean>;

    hasLoaded$: Observable<boolean>;

    error$: Observable<any>;

    detail$: Observable<Enterprise>;

    hasLoadedDocumentation$: Observable<boolean>;

    isLoadingDocumentation$: Observable<boolean>;

    documentationEntities$: Observable<
        StateWithUI<EnterpriseDocumentation, EnterpriseDocumentationUI>[]
    >;

    documentationError$: Observable<any>;

    shouldRenderActionButtons$: Observable<boolean>;

    shouldRenderSendInvitation$: Observable<boolean>;

    shouldDisableApprovalButton$: Observable<boolean>;

    shouldDisableRejectButton$: Observable<boolean>;

    shouldRenderEnterpriseForm$: Observable<boolean>;

    shouldRenderDocumentationActions$: Observable<boolean>;

    hasLoadedAndEditing$: Observable<boolean>;

    isDocumentLoaded$: Observable<any>;

    bankRegions$: Observable<BankRegions[]>;

    isLoadingEnterpriseSectors$ = this.enterpriseSectorQuery.selectLoading();

    enterpriseSectorsError$ = this.enterpriseSectorQuery.selectError();

    enterpriseSectors$ = this.enterpriseSectorQuery.selectEntities();

    isLoadingCountryCallingCodes$ = this.countryCallingCodeQuery.selectLoading();

    countryCallingCodesError$ = this.countryCallingCodeQuery.selectError();

    countryCallingCodes$ = this.countryCallingCodeQuery.selectEntities();

    banksInformation$ = this.banksInformation.selectEntities()

    documentTypes$ = this.documentTypeQuery.selectEntities()

    ENTERPRISE_STATUS = ENTERPRISE_STATUS;

    private subscription = new Subscription();

    history$: Observable<ActivityHistory[]>

    isLoadingActivitiesHistory$ = this.activitiesHistoryQuery.selectLoading();

    activitiesHistoryError$ = this.activitiesHistoryQuery.selectError();

    isLoadingcitiesAndDepartments$ = this.citiesAndDepartmentsQuery.selectLoading();
    canReadEnterpriseDocumentation$ = this.profileQuery.hasPermission(CodePermission.READ_ENTERPRISE_DOCUMENTATION);
    canRequestDocuments$ = this.profileQuery.hasPermission(CodePermission.REQUEST_DOCUMENTS);

    shouldRenderFinancialPlanTable$ = this.profileQuery.hasPermission(CodePermission.READ_FINANCING_PLAN_LIST);

    canCreateFinancialPlan$ = this.profileQuery.hasPermission(CodePermission.CREATE_FINANCING_PLAN);

    canReadEnterpriseDetail$ = this.profileQuery.hasPermission(CodePermission.READ_ENTERPRISE_DETAIL);
    canUpdateEnterprise$ = this.profileQuery.hasPermission(CodePermission.UPDATE_ENTERPRISE);
    enterprise: Enterprise;
    documentTypes: DocumentType[];

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    financialPlanError$: Observable<any>;

    planEntities$: Observable<StateWithUI<BasicFinancialPlan, FinancialPlanUI>[]>;
    canAddPlan: boolean = true;


    constructor(
        private router: Router,
        private location: Location,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
        private routerService: RouterService,
        private programStoreService: EnterpriseStoreService,
        private programQuery: EnterpriseQuery,
        private documentationStoreService: EnterpriseDocumentationStoreService,
        private documentationQuery: EnterpriseDocumentationQuery,
        private userStoreService: UserStoreService,
        private snackbar: MatSnackBar,
        private translateService: TranslateService,

        private countryCallingCodeQuery: CountryCallingCodeQuery,
        private countryCallingCodeStoreService: CountryCallingCodeStoreService,

        private banksInformation: BankQuery,
        private banksInformationStoreService: BankStoreService,
        private documentTypeQuery: DocumentTypeQuery,
        private documentTypeStoreService: DocumentTypeStoreService,

        private enterpriseSectorQuery: EnterpriseSectorQuery,
        private enterpriseSectorStoreService: EnterpriseSectorStoreService,
        private activitiesHistoryQuery: ActivitiesHistoryQuery,
        private citiesAndDepartmentsQuery:CitiesAndDepartmentsQuery,
        private bankRegionsQuery: BankRegionsQuery,
        private bankRegionsStoreServices: BankRegionsStoreServices,
        private financialPlanQuery: EnterpriseFinancialPlanQuery,
        private financialPlanStoreService: EnterpriseFinancialPlanStoreService,
        private profileQuery: ProfileRolePermissionsQuery,
    ) { }

    ngOnInit() {
        this.setup();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onEditFC(entity: any){console.log('working it...')}

    onEdit() {
        this.fetchBanks()
        this.fetchCountryCallingCodes();
        this.fetchEnterpriseSectors();
        this.programStoreService.toggleEditing(this.getParamId());
    }

    onCancel() {
        this.programStoreService.toggleEditing(this.getParamId());
    }

    onSubmit(payload: Enterprise) {
        this.programStoreService.update(this.getParamId(), payload).subscribe();
    }

    goBack() {
        if (this.routerService.hasRouterHistory) this.location.back();
        else this.router.navigateByUrl('/programs');
    }

    onUploadFile({ id, file }: DocumentationFilePayload) {
        this.documentationStoreService
            .uploadFile(this.getParamId(), id, file,'','')
            .subscribe();
    }

    onAddPlan(){
        if(this.enterprise.status !== ENTERPRISE_STATUS.ENABLED){
            this.snackbar.open(
                this.translateService.instant(
                    'CREATE_FINANCIAL_CONDITIONS_FORM.ERRORS.INVALID_STATUS'
                ),
                'OK'
            );
            this.canAddPlan = false;
            return;
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { payer$: this.detail$ }
        const dialogRef = this.dialog.open(CreateFinancialConditionsDialog,dialogConfig);
        dialogRef.afterClosed().subscribe();
    }

    onChangeDocumentationStatus({
        id,
        status,
    }: {
        id: number;
        status: ChangeDocumentationStatus;
    }) {
        const enterpriseId = this.getParamId();
        if (status == 'RELOAD_FILE')
            this.dialog.open(ReuploadFileDialog, {
                data: { id, enterpriseId, expeditionDate: new Date().toString() },
            });
        else
            this.documentationStoreService
                .changeStatus(enterpriseId, id, {
                    status,
                    explanation: null,
                    expeditionDate: '',
                })
                .subscribe();
    }

    onChangeProgramStatus(status: EnterpriseStatus) {
        if (status === ENTERPRISE_STATUS.ENABLED)
            this.dialog.open(AcceptProgramDialogComponent, {
                data: { id: this.getParamId() },
            });
        else
            this.dialog.open(ConfirmRejectDialog, {
                data: { id: this.getParamId() },
            });
    }

    onRetryDetail() {
        this.fetchDetail(this.getParamId());
    }

    onRetryDocumentation() {
        this.fetchDocumentation(this.getParamId());
    }

    fetchCountryCallingCodes() {
        this.countryCallingCodeStoreService.fetchAll().subscribe();
    }

    fetchEnterpriseSectors() {
        this.enterpriseSectorStoreService.fetchAll().subscribe();
    }

    onRetryActivitiesHistory() {
        this.fetchActivitiesHistory(this.getParamId());
    }

    fetchBanks () {
        this.banksInformationStoreService.fetchAll().subscribe()
    }

    fetchDocumentType(){
        this.documentTypeStoreService.fetchAll(false).subscribe(data => {
            this.documentTypes = data
        })
    }

    fetchBankRegions(){
        this.bankRegionsStoreServices.fetchAll().subscribe()
    }

    loadNewDocument () {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { enterpriseId:this.getParamId(), entities: this.documentTypes }
        const dialogRef = this.dialog.open(AddDocumentDialog, dialogConfig);
        dialogRef.afterClosed().subscribe();
    }

    sendInvitation(){
        const id = this.enterprise.owner.id ? this.enterprise.owner.id : null
        if(id){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = { id: id, firstTime: true }
            const dialogRef = this.dialog.open(SendInvitationDialog, dialogConfig);
            dialogRef.afterClosed().subscribe();
        }
    }

    sendDocumentResolution(){
        const id = this.enterprise.id ? this.enterprise.id : null
        if(id){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = { id: id }
            const dialogRef = this.dialog.open(SendResolutionDialog, dialogConfig);
            dialogRef.afterClosed().subscribe();
        }
    }

    private fetchActivitiesHistory(id: number) {
        this.programStoreService.fetchActivitiesHistory(id).subscribe();
    }

    private fetchDetail(id: number) {
        this.programStoreService.fetch(id).subscribe();
    }

    private fetchDocumentation(id: number) {
        this.documentationStoreService.fetch(id).subscribe();
    }

    private fetchPlans(id: number) {
        this.financialPlanStoreService.fetchCurrentPage(id).subscribe();
    }

    private getParamId(): number {
        return parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    }

    onChangePage({ pageIndex: index, pageSize: size }: PageEvent) {
        this.financialPlanStoreService
            .changePage(this.getParamId(), { index, size })
            .subscribe();
    }

    onUpdateFilters(filters: PlanFiltersPayload) {
        this.financialPlanStoreService
            .changeFilters(this.getParamId(), filters)
            .subscribe();
    }

    private setup() {
        const detailId$ = this.activatedRoute.paramMap.pipe(
            map(paramMap => parseInt(paramMap.get('id')))
        );

        this.isSubmitting$ = detailId$.pipe(
            switchMap(id => this.programQuery.selectUIEntityUpdating(id))
        );

        this.hasLoaded$ = detailId$.pipe(
            switchMap(id => this.programQuery.selectUIEntityLoaded(id))
        );

        this.isLoadingDetail$ = detailId$.pipe(
            switchMap(id => this.programQuery.selectUIEntityLoading(id))
        );

        this.detail$ = detailId$.pipe(
            switchMap(id => this.programQuery.selectEntity(id))
        );

        this.detail$.subscribe(
            (enterprise => this.enterprise = enterprise )
        )

        this.error$ = detailId$.pipe(
            switchMap(id => this.programQuery.selectUIEntityError(id))
        );

        this.financialPlanError$ = detailId$.pipe(
            switchMap(id => this.financialPlanQuery.selectError())
        );

        this.isLoadingFinancialPlan$ = detailId$.pipe(
            switchMap(id => this.financialPlanQuery.selectLoading())
        );

        this.planEntities$ = detailId$.pipe(
            switchMap(id => this.financialPlanQuery.selectEntitiesWithUI())
        );

        this.total$ = detailId$.pipe(
            switchMap(id => this.financialPlanQuery.selectTotal())
        );

        this.filters$ = detailId$.pipe(
            switchMap(id => this.financialPlanQuery.selectFilters())
        );

        this.paginationSize$ = detailId$.pipe(
            switchMap(id => this.financialPlanQuery.selectPageSize())
        );

        this.paginationIndex$ = detailId$.pipe(
            switchMap(id => this.financialPlanQuery.selectPageIndex())
        );

        this.hasLoadedDocumentation$ = detailId$.pipe(
            switchMap(id => this.documentationQuery.selectEntityLoaded(id))
        );

        this.isLoadingDocumentation$ = detailId$.pipe(
            switchMap(id => this.documentationQuery.selectEntityLoading(id))
        );

        this.canReadEnterpriseDocumentation$.pipe(tap(permissions => {
            if (permissions) {
                this.documentationEntities$ = detailId$.pipe(
                    switchMap(id => this.documentationQuery.selectEntitiesWithUI(id))
                );
            }
        })).subscribe()

        this.documentationError$ = detailId$.pipe(
            switchMap(id => this.documentationQuery.selectEntityError(id))
        );

        this.shouldRenderActionButtons$ = detailId$.pipe(
            switchMap(id => this.programQuery.selectEntityIsPending(id))
        );

        this.shouldRenderSendInvitation$ = detailId$.pipe(
            switchMap(id => this.programQuery.selectEntityIsPendingConfirmation(id))
        );

        this.shouldRenderDocumentationActions$ = detailId$.pipe(
            switchMap(id => this.programQuery.selectEntityIsRejected(id)),
            map(isRejected => !isRejected)
        );

        this.bankRegions$ = detailId$.pipe(
            switchMap(status => this.bankRegionsQuery.selectEntities())
        )

        const isEditing$ = detailId$.pipe(
            switchMap(id => this.programQuery.selectUIEntityEditing(id))
        );

        this.shouldRenderEnterpriseForm$ = combineLatest(
            isEditing$,
            this.enterpriseSectorQuery.selectLoaded(),
            this.countryCallingCodeQuery.selectLoaded()
        ).pipe(
            auditTime(0),
            map(values => values.every(value => value))
        );

        this.hasLoadedAndEditing$ = combineLatest(
            this.hasLoaded$,
            isEditing$
        ).pipe(
            auditTime(0),
            map(([hasLoaded, isEditing]) => hasLoaded && !isEditing)
        );

        this.isDocumentLoaded$ = combineLatest(
            detailId$.pipe(
                switchMap(id => {
                    return this.programQuery.selectUIEntityNewDocument(id)
                })
            )
        ).pipe(
            map(([isDocumentLoaded]) => {
                return isDocumentLoaded
            })
        )

        const allDocumentationHasBeenApproved$ = detailId$.pipe(
            switchMap(id =>
                this.documentationQuery.selectAllDocumentationHasBeenApproved(
                    id,
                    true
                )
            )
        );

        const documentationCount$ = detailId$.pipe(
            switchMap(id =>
                this.documentationQuery.selectDocumentationCount(id)
            )
        );

        this.shouldDisableApprovalButton$ = combineLatest(
            allDocumentationHasBeenApproved$,
            documentationCount$
        ).pipe(map(([allApproved, count]) => !allApproved || !count));


        this.history$ = this.activitiesHistoryQuery.selectEntities();

        const subscription = detailId$.subscribe(id => {
            this.fetchDetail(id);
            this.fetchDocumentType();
            this.fetchActivitiesHistory(id);
            this.fetchBankRegions();
            this.shouldRenderFinancialPlanTable$.pipe(
                tap( canRender => {
                    if(canRender) this.fetchPlans(id);
                })
            ).subscribe();
            this.canReadEnterpriseDocumentation$.pipe(tap(permissions => {
                if (permissions) {
                    this.fetchDocumentation(id);
                }
            })).subscribe()
        });

        this.subscription.add(subscription);
    }
}
