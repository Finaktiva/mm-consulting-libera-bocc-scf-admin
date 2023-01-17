import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateProgramPayload } from '@libera/models/enterprise';
import {
    ENTERPRISE_REQUEST_STATUS,
    EnterpriseDetail,
    EnterpriseLinkRequest,
    EnterpriseRequestStatus,
} from '@libera/models/enterprise-request';
import { CodePermission } from '@libera/models/user';
import { ProfileRolePermissionsQuery } from '@libera/state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { RejectLinkDialog } from '../../dialogs/reject-link/reject-link.dialog';
import { EnterpriseRequestLinkQuery } from '../../state/request-link.query';
import { EnterpriseRequestLinkStoreService } from '../../state/request-link.store.service';

// import { ApproveLinkDialog } from '../../dialogs/approve-link/approve-link.dialog';
@Component({
    selector: 'link-detail-page',
    templateUrl: './link-detail.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestLinkDetailPage implements OnInit, OnDestroy {
    isSubmitting$: Observable<boolean>;

    hasLoaded$: Observable<boolean>;

    isLoading$: Observable<boolean>;

    error$: Observable<any>;

    status$: Observable<EnterpriseRequestStatus>;

    entity$: Observable<EnterpriseLinkRequest>;

    enterprise$: Observable<EnterpriseDetail>;

    shouldRenderRejectButton$: Observable<boolean>;

    canInviteEnterprise$: Observable<boolean>;

    shouldRenderRequest$: Observable<boolean> = this.profileQuery.hasPermission(CodePermission.READ_ENTERPRISE_LINKINGS_LIST);

    isLoadingPermission$ = this.profileQuery.selectLoading();

    subscription = new Subscription();

    ENTERPRISE_REQUEST_STATUS = ENTERPRISE_REQUEST_STATUS;

    constructor(
        private route: ActivatedRoute,
        private storeService: EnterpriseRequestLinkStoreService,
        private query: EnterpriseRequestLinkQuery,
        private dialog: MatDialog,
        private profileQuery: ProfileRolePermissionsQuery,
    ) {}

    ngOnInit() {
        this.shouldRenderRequest$.pipe(
            tap( canRender => {
                if(canRender) this.setup();
            })
        ).subscribe();
    }

    setup() {
        const id$ = this.route.paramMap.pipe(
            map(paramMap => parseInt(paramMap.get('id')))
        );

        this.isSubmitting$ = id$.pipe(
            switchMap(id => this.query.selectUIEntityInviting(id))
        );

        this.hasLoaded$ = id$.pipe(
            switchMap(id => this.query.selectUIEntityLoaded(id))
        );

        this.isLoading$ = id$.pipe(
            switchMap(id => this.query.selectUIEntityLoading(id))
        );

        this.error$ = id$.pipe(
            switchMap(id => this.query.selectUIEntityError(id))
        );

        this.status$ = id$.pipe(
            switchMap(id => this.query.selectEntityStatus(id))
        );

        this.enterprise$ = id$.pipe(
            switchMap(id => this.query.selectEntityEnterpriseRequested(id))
        );

        this.entity$ = id$.pipe(switchMap(id => this.query.selectEntity(id)));

        const isPending$ = id$.pipe(
            switchMap(id => this.query.selectEntityStatusIsPending(id))
        );

        const isPendingAccountCreation$ = id$.pipe(
            switchMap(id =>
                this.query.selectEntityEnterpriseRequestedStatusIsPendingAccountCreation(
                    id
                )
            )
        );

        this.shouldRenderRejectButton$ = isPending$;

        this.canInviteEnterprise$ = combineLatest(
            isPending$,
            isPendingAccountCreation$
        ).pipe(
            map(
                ([isPending, isPendingAccountCreation]) =>
                    isPending && isPendingAccountCreation
            )
        );

        const subscription = id$
            .pipe(switchMap(id => this.storeService.fetch(id)))
            .subscribe();

        this.subscription.add(subscription);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    fetchRequest() {
        this.storeService.fetch(this.getURLParamId()).subscribe();
    }

    onSubmit(payload: CreateProgramPayload) {
        this.storeService.invite(this.getURLParamId(), payload).subscribe();
    }

    onRejectRequest() {
        this.dialog.open(RejectLinkDialog, {
            data: {
                id: this.getURLParamId(),
            },
        });
    }

    private getURLParamId() {
        return parseInt(this.route.snapshot.paramMap.get('id'));
    }
}
