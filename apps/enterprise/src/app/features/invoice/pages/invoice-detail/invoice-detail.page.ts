import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    AvailableEnterprise,
    EnterpriseCustomAttribute,
} from '@libera/models/enterprise';
import { PayerInvoice } from '@libera/models/payer';
import { Enterprise, INVOICE_STATUS } from '@libera/models/shared';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PayerInvoiceQuery } from '../../state/payer-invoice.query';
import { PayerInvoiceStoreService } from '../../state/payer-invoice.store.service';

@Component({
    selector: 'invoice-detail-page',
    templateUrl: './invoice-detail.page.html',
    styleUrls: ['./invoice-detail.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceDetailPage implements OnInit {
    hasLoaded$: Observable<boolean>;

    isLoading$: Observable<boolean>;

    error$: Observable<any>;

    entity$: Observable<PayerInvoice>;

    hasCustomAttributes$: Observable<boolean>;

    customAttributes$: Observable<EnterpriseCustomAttribute[]>;

    isSubmittingProvider$: Observable<boolean>;

    isEditingProvider$: Observable<boolean>;

    shouldRenderChangeProviderButton$: Observable<boolean>;

    shouldRenderProviderInfo$: Observable<boolean>;

    shouldRenderProviderAlert$: Observable<boolean>;

    provider$: Observable<Enterprise>;

    isSubmittingLender$: Observable<boolean>;

    isEditingLender$: Observable<boolean>;

    shouldRenderChangeLenderButton$: Observable<boolean>;

    shouldRenderLenderInfo$: Observable<boolean>;

    shouldRenderLenderAlert$: Observable<boolean>;

    lender$: Observable<Enterprise>;

    constructor(
        private storeService: PayerInvoiceStoreService,
        private query: PayerInvoiceQuery,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const id$ = this.route.paramMap.pipe(
            map(paramMap => parseInt(paramMap.get('id')))
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

        this.entity$ = id$.pipe(switchMap(id => this.query.selectEntity(id)));

        this.hasCustomAttributes$ = id$.pipe(
            switchMap(id => this.query.selectEntityHasCustomAttributes(id))
        );

        this.customAttributes$ = id$.pipe(
            switchMap(id => this.query.selectEntityCustomAttributes(id))
        );

        this.isSubmittingProvider$ = id$.pipe(
            switchMap(id => this.query.selectUIEntityUpdatingProvider(id))
        );

        const editingProvider$ = id$.pipe(
            switchMap(id => this.query.selectUIEntityEditingProvider(id))
        );

        const status$ = id$.pipe(
            switchMap(id => this.query.selectEntityStatus(id))
        );

        const hasProvider$ = id$.pipe(
            switchMap(id => this.query.selectEntityHasProvider(id))
        );

        this.shouldRenderChangeProviderButton$ = combineLatest(
            editingProvider$,
            status$
        ).pipe(
            map(
                ([isEditing, status]) =>
                    !isEditing && (status == 'AVAILABLE' || status == 'LOADED')
            )
        );

        this.isEditingProvider$ = editingProvider$;

        this.shouldRenderProviderInfo$ = combineLatest(
            hasProvider$,
            editingProvider$
        ).pipe(
            map(
                ([hasProvider, editingProvider]) =>
                    hasProvider && !editingProvider
            )
        );

        this.shouldRenderProviderAlert$ = combineLatest(
            hasProvider$,
            editingProvider$
        ).pipe(
            map(
                ([hasProvider, editingProvider]) =>
                    !hasProvider && !editingProvider
            )
        );

        this.provider$ = id$.pipe(
            switchMap(id => this.query.selectEntityProvider(id))
        );

        this.isSubmittingLender$ = id$.pipe(
            switchMap(id => this.query.selectUIEntityUpdatingLender(id))
        );

        const editingLender$ = id$.pipe(
            switchMap(id => this.query.selectUIEntityEditingLender(id))
        );

        const hasLender$ = id$.pipe(
            switchMap(id => this.query.selectEntityHasLender(id))
        );

        this.shouldRenderChangeLenderButton$ = combineLatest(
            editingLender$,
            status$
        ).pipe(
            map(
                ([isEditing, status]) =>
                    !isEditing &&
                    (status == INVOICE_STATUS.AVAILABLE ||
                        status == INVOICE_STATUS.LOADED ||
                        status == INVOICE_STATUS.NEGOTIATION_FINISHED)
            )
        );

        this.isEditingLender$ = editingLender$;

        this.shouldRenderLenderInfo$ = combineLatest(
            hasLender$,
            editingLender$
        ).pipe(
            map(([hasLender, editingLender]) => hasLender && !editingLender)
        );

        this.shouldRenderLenderAlert$ = combineLatest(
            hasLender$,
            editingLender$
        ).pipe(
            map(([hasLender, editingLender]) => !hasLender && !editingLender)
        );

        this.lender$ = id$.pipe(
            switchMap(id => this.query.selectEntityLender(id))
        );
    }

    onSubmitProvider({ id }: AvailableEnterprise) {
        this.storeService.updateProvider(this.id, id).subscribe();
    }

    onEditProvider() {
        this.storeService.editProvider(this.id);
    }

    onCancelProvider() {
        this.storeService.cancelProvider(this.id);
    }

    get id(): number {
        return parseInt(this.route.snapshot.paramMap.get('id'));
    }

    onSubmitLender({ id }: AvailableEnterprise) {
        this.storeService.updateLender(this.id, id).subscribe();
    }

    onEditLender() {
        this.storeService.editLender(this.id);
    }

    onCancelLender() {
        this.storeService.cancelLender(this.id);
    }
}
