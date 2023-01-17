import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import { BankRegions } from '@libera/models/catalog';
import { Enterprise, ProgramFiltersPayload, ProgramStatus } from '@libera/models/enterprise';
import { RouterService } from '@libera/shared';
import { EnterpriseQuery, EnterpriseStoreService, EnterpriseUI, ProfileRolePermissionsQuery, UserRoleUI } from '@libera/state';
import { StateWithUI } from '@mediomelon/ng-core';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BankRegionsQuery } from '@libera/state'

import { CreateProgramDialog } from '../../dialogs/create-program-dialog/create-program.dialog';
import { ResendInvitationDialog } from '../../dialogs/resend-invitation-dialog/resend-invitation.dialog';
import { BankRegionsStoreServices } from '../../../../../../../../libs/state/src/lib/bank-regions/bank-regions.store.service';
import { CodePermission } from '@libera/models/user';
@Component({
    selector: 'program-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPage implements OnInit, OnDestroy {
    entities$: Observable<StateWithUI<Enterprise, EnterpriseUI>[]>;

    canReadEnterpriseList$ = this.profileQuery.hasPermission(CodePermission.READ_ENTERPRISE_LIST);
    canCreateEnterprise$ = this.profileQuery.hasPermission(CodePermission.CREATE_ENTERPRISE);

    error$: Observable<any>;

    isLoading$: Observable<boolean>;

    total$: Observable<number>;

    filters$: Observable<ProgramFiltersPayload>;

    paginationSize$: Observable<number>;

    paginationIndex$: Observable<number>;

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    bankRegions$: Observable<BankRegions[]>;

    private subscription = new Subscription();

    constructor(
        private query: EnterpriseQuery,
        private storeService: EnterpriseStoreService,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
        private routerService: RouterService,
        private location: Location,
        private router: Router,
        private bankRegionsQuery: BankRegionsQuery,
        private bankRegionsStoreServices: BankRegionsStoreServices,
        private profileQuery: ProfileRolePermissionsQuery,
    ) {}

    ngOnInit() {
        const status$ = this.activatedRoute.queryParamMap.pipe(
            map(queryParamMap => queryParamMap.get('status') as ProgramStatus)
        );

        this.isLoading$ = status$.pipe(
            switchMap(status => this.query.selectLoading())
        );
        this.error$ = status$.pipe(
            switchMap(status => this.query.selectError())
        );
        this.total$ = status$.pipe(
            switchMap(status => this.query.selectTotal())
        );
        this.bankRegions$ = status$.pipe(
            switchMap(status => this.bankRegionsQuery.selectEntities())
        )

        this.canCreateEnterprise$.pipe(tap(permissions => {
            if(permissions){
                this.subscription.add(this.bankRegionsStoreServices.fetchAll().subscribe())
            }
        })).subscribe()
        
        this.canReadEnterpriseList$.pipe(tap(permissions => {
            if (permissions) {
                this.filters$ = status$.pipe(
                    switchMap(status => this.query.selectFilters())
                );
                this.paginationSize$ = status$.pipe(
                    switchMap(status => this.query.selectPageSize())
                );
                this.paginationIndex$ = status$.pipe(
                    switchMap(status => this.query.selectPageIndex())
                );
                this.entities$ = status$.pipe(
                    switchMap(status => this.query.selectEntitiesWithUI())
                );
                this.subscription.add(
                    status$
                        .pipe(
                            switchMap(status =>
                                this.storeService.fetchCurrentPage(status)
                            )
                        )
                        .subscribe()
                );
            }
        })).subscribe()
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onUpdateFilters(filters: ProgramFiltersPayload) {
        this.router.navigateByUrl('/programs')
        this.storeService
            .changeFilters(filters, this.getStatusFromActivatedRoute())
            .subscribe();
    }

    onUpdateFilterStatus(status: ProgramStatus) {
        if (status){
            const navigationExtras: NavigationExtras = {
                queryParams: { status },
                relativeTo: this.activatedRoute
            }
            const url = this
                .router
                .createUrlTree(['/programs'], navigationExtras)
                .toString();

            this.router.navigateByUrl(url);
        }
        this.storeService
            .fetchCurrentPage(status)
            .subscribe();
    }

    onChangePage({ pageIndex: index, pageSize: size }: PageEvent) {
        this.storeService
            .changePage({ index, size }, this.getStatusFromActivatedRoute())
            .subscribe();
    }

    onRetry() {
        this.storeService
            .fetchCurrentPage(this.getStatusFromActivatedRoute())
            .subscribe();
    }

    onAddProgram() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        let subBankRegions = this.bankRegions$.subscribe(data => {
            dialogConfig.data = {
                bankRegions: data
            }
        })
        const dialogRef = this.dialog.open(CreateProgramDialog,dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result != 'cancel'){
                this.goDocumentation(result.id)
                subBankRegions.unsubscribe()
            }
          });
    }

    goDocumentation(id) {
        this.router.navigateByUrl('/programs/'+id);
    }

    onResendInvitation(id: number) {
        this.dialog.open(ResendInvitationDialog, { data: { id } });
    }

    private getStatusFromActivatedRoute() {
        return this.activatedRoute.snapshot.queryParamMap.get(
            'status'
        ) as ProgramStatus;
    }
}
