import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
    ChangeDocumentationStatus,
    DocumentationFilePayload,
    Enterprise,
    EnterpriseDocumentation,
} from '@libera/models/enterprise';
import {
    EnterpriseDocumentationQuery,
    EnterpriseDocumentationStoreService,
    EnterpriseQuery,
    EnterpriseStoreService,
} from '@libera/state';
import { StateWithUI } from '@mediomelon/ng-core';
import { ReuploadFileDialog } from 'apps/admin/src/app/dialogs/reupload-file/reupload-file.dialog';
import { EnterpriseDocumentationUI } from 'libs/state/src/lib/enterprise-documentation/enterprise-documentation.store';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { auditTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { ApproveModuleDialog } from '../../dialogs/approve-module/approve-module.dialog';
import { RejectRequestDialog } from '../../dialogs/reject-request/reject-request.dialog';
import { EnterpriseRequestModuleDetailQuery } from '../../state/request-module-detail.query';
import { EnterpriseRequestModuleStoreService } from '../../state/request-module.store.service';

@Component({
    selector: 'module-detail-page',
    templateUrl: './module-detail.page.html',
    styleUrls: ['./module-detail.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestModuleDetailPage implements OnInit {
    hasLoadedDocumentation$: Observable<boolean>;

    isLoadingDocumentation$: Observable<boolean>;

    documentationError$: Observable<any>;

    documentationEntities$: Observable<
        StateWithUI<EnterpriseDocumentation, EnterpriseDocumentationUI>[]
    >;

    hasLoadedEnterprise$: Observable<boolean>;

    isLoadingEnterprise$: Observable<boolean>;

    enterpriseError$: Observable<any>;

    enterprise$: Observable<Enterprise>;

    hasLoaded$: Observable<boolean>;

    isLoading$: Observable<boolean>;

    error$: Observable<any>;

    shouldRenderActionButtons$: Observable<boolean>;

    shouldDisableApproveModuleButton$: Observable<boolean>;

    shouldDisableRejectButton$: Observable<boolean>;

    private subscription = new Subscription();

    constructor(
        private documentationStoreService: EnterpriseDocumentationStoreService,
        private documentationQuery: EnterpriseDocumentationQuery,
        private requestQuery: EnterpriseRequestModuleDetailQuery,
        private requestStoreService: EnterpriseRequestModuleStoreService,
        private enterpriseQuery: EnterpriseQuery,
        private enterpriseStoreService: EnterpriseStoreService,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        const id$ = this.route.paramMap.pipe(
            map(paramMap => paramMap.get('id')),
            map(id => parseInt(id))
        );

        this.hasLoaded$ = id$.pipe(
            switchMap(id => this.requestQuery.selectUIEntityLoaded(id))
        );

        this.isLoading$ = id$.pipe(
            switchMap(id => this.requestQuery.selectUIEntityLoading(id))
        );

        this.error$ = id$.pipe(
            switchMap(id => this.requestQuery.selectUIEntityError(id))
        );

        const entity$ = id$.pipe(
            switchMap(id => this.requestQuery.selectEntity(id))
        );

        const hasLoadedAndEntity$ = combineLatest(this.hasLoaded$, entity$);

        this.hasLoadedEnterprise$ = hasLoadedAndEntity$.pipe(
            switchMap(([hasLoaded, entity]) => {
                if (!hasLoaded) return of(false);

                return this.enterpriseQuery.selectUIEntityLoaded(
                    entity.enterpriseRequester.id
                );
            })
        );

        this.isLoadingEnterprise$ = hasLoadedAndEntity$.pipe(
            switchMap(([hasLoaded, entity]) => {
                if (!hasLoaded) return of(false);

                return this.enterpriseQuery.selectUIEntityLoading(
                    entity.enterpriseRequester.id
                );
            })
        );

        this.enterpriseError$ = hasLoadedAndEntity$.pipe(
            switchMap(([hasLoaded, entity]) => {
                if (!hasLoaded) return of(null);

                return this.enterpriseQuery.selectUIEntityError(
                    entity.enterpriseRequester.id
                );
            })
        );

        this.enterprise$ = hasLoadedAndEntity$.pipe(
            switchMap(([hasLoaded, entity]) => {
                if (!hasLoaded) return of(null);

                return this.enterpriseQuery.selectEntity(
                    entity.enterpriseRequester.id
                );
            })
        );

        this.hasLoadedDocumentation$ = hasLoadedAndEntity$.pipe(
            auditTime(0),
            switchMap(([hasLoaded, entity]) => {
                if (!hasLoaded) return of(false);
                return this.documentationQuery.selectEntityLoaded(
                    entity.enterpriseRequester.id
                );
            }),
            distinctUntilChanged()
        );

        this.isLoadingDocumentation$ = hasLoadedAndEntity$.pipe(
            auditTime(0),
            switchMap(([hasLoaded, entity]) => {
                if (!hasLoaded) return of(false);
                return this.documentationQuery.selectEntityLoading(
                    entity.enterpriseRequester.id
                );
            }),
            distinctUntilChanged()
        );

        this.documentationError$ = hasLoadedAndEntity$.pipe(
            auditTime(0),
            switchMap(([hasLoaded, entity]) => {
                if (!hasLoaded) return of(null);
                return this.documentationQuery.selectEntityError(
                    entity.enterpriseRequester.id
                );
            }),
            distinctUntilChanged()
        );

        this.documentationEntities$ = hasLoadedAndEntity$.pipe(
            auditTime(0),
            switchMap(([hasLoaded, entity]) => {
                if (!hasLoaded) return of([]);
                return this.documentationQuery.selectEntitiesWithUI(
                    entity.enterpriseRequester.id
                );
            }),
            distinctUntilChanged()
        );

        const allDocumentationHasBeenApproved$ = hasLoadedAndEntity$.pipe(
            auditTime(0),
            switchMap(([hasLoaded, entity]) => {
                if (!hasLoaded) return of(false);

                return this.documentationQuery.selectAllDocumentationHasBeenApproved(
                    entity.enterpriseRequester.id
                );
            }),
            distinctUntilChanged()
        );

        const documentationCount$ = hasLoadedAndEntity$.pipe(
            auditTime(0),
            switchMap(([hasLoaded, entity]) => {
                if (!hasLoaded) return of(0);

                return this.documentationQuery.selectDocumentationCount(
                    entity.enterpriseRequester.id
                );
            }),
            distinctUntilChanged()
        );

        this.shouldRenderActionButtons$ = id$.pipe(
            switchMap(id => this.requestQuery.selectEntityIsPending(id))
        );

        const isUpdatingRequestStatus$ = id$.pipe(
            switchMap(id => this.requestQuery.selectEntityUpdating(id))
        );

        this.shouldDisableApproveModuleButton$ = combineLatest(
            isUpdatingRequestStatus$,
            allDocumentationHasBeenApproved$,
            documentationCount$
        ).pipe(
            map(
                ([isSubmitting, allApproved, count]) =>
                    isSubmitting || !allApproved || !count
            )
        );

        this.shouldDisableRejectButton$ = isUpdatingRequestStatus$;

        const subscription = id$.subscribe(id => this.fetchRequest(id));

        this.subscription.add(subscription);
    }

    onUploadFile({ id, file }: DocumentationFilePayload) {
        this.documentationStoreService
            .uploadFile(this.getEnterpriseId(), id, file, '', '')
            .subscribe();
    }

    onChangeDocumentationStatus({
        id,
        status,
    }: {
        id: number;
        status: ChangeDocumentationStatus;
    }) {
        if (status == 'RELOAD_FILE')
            this.dialog.open(ReuploadFileDialog, {
                data: { id, enterpriseId: this.getEnterpriseId(), expeditionDate: new Date().toString() },
            });
        else
            this.documentationStoreService
                .changeStatus(this.getEnterpriseId(), id, {
                    status,
                    explanation: null,
                    expeditionDate: '',
                })
                .subscribe();
    }

    onAcceptRequest() {
        this.dialog.open(ApproveModuleDialog, {
            data: {
                id: this.getUrlParamId(),
            },
        });
    }

    onRejectRequest() {
        this.dialog.open(RejectRequestDialog, {
            data: {
                id: this.getUrlParamId(),
            },
        });
    }

    onRetryRequest() {
        this.fetchRequest(this.getUrlParamId());
    }

    onRetryDocumentation() {
        this.fetchDocumentation(this.getEnterpriseId());
    }

    onRetryEnterprise() {
        this.fetchEnterprise(this.getEnterpriseId());
    }

    private fetchRequest(id: number) {
        this.requestStoreService
            .fetch(id)
            .pipe(map(entity => entity.enterpriseRequester.id))
            .subscribe(id => {
                this.fetchEnterprise(id);
                this.fetchDocumentation(id);
            });
    }

    private fetchDocumentation(id: number) {
        this.documentationStoreService.fetch(id).subscribe();
    }

    private fetchEnterprise(id: number) {
        this.enterpriseStoreService.fetch(id).subscribe();
    }

    private getUrlParamId(): number {
        return this.route.snapshot.params.id;
    }

    private getEnterpriseId() {
        const id = this.getUrlParamId();
        const entity = this.requestQuery.getEntity(id);
        return entity.enterpriseRequester.id;
    }
}
