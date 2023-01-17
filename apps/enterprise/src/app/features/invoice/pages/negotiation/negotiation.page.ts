import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
    InvoiceNegotiation,
    NEGOTIATION_STATUS,
    NegotiationOffer,
    NegotiationPayload,
} from '@libera/models/shared';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { map, switchMap } from 'rxjs/operators';

import { PayerAcceptOfferDialog } from '../../dialogs/payer-accept-offer/payer-accept-offer.dialog';
import { PayerCancelNegotiationDialog } from '../../dialogs/payer-cancel-negotiation/payer-cancel-negotiation.dialog';
import { PayerRejectOfferDialog } from '../../dialogs/payer-reject-offer/payer-reject-offer.dialog';
import { InvoiceNegotiationUnionQuery } from '../../state/invoice-negotiation.union.query';
import { PayerInvoiceQuery } from '../../state/payer-invoice.query';
import { PayerInvoiceStoreService } from '../../state/payer-invoice.store.service';
import { INVOICE_STATUS } from '@libera/models/shared';

@Component({
    selector: 'negotiation-page',
    templateUrl: './negotiation.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NegotiationPage implements OnInit, OnDestroy {
    id$: Observable<number>;

    hasLoaded$: Observable<boolean>;

    isLoading$: Observable<boolean>;

    error$: Observable<boolean>;

    shouldRenderEmptyNegotiationsMessage$: Observable<boolean>;

    shouldRenderNegotiationOffers$: Observable<boolean>;

    shouldRenderForm$: Observable<boolean>;

    shouldRenderInfo$: Observable<boolean>;

    shouldRenderNegotiationActions$: Observable<boolean>;

    shouldRenderProviderOffer$: Observable<boolean>;

    shouldRenderCancelButton$: Observable<boolean>;

    entities$: Observable<InvoiceNegotiation[]>;

    payerOffer$: Observable<NegotiationOffer>;

    providerOffer$: Observable<NegotiationOffer>;

    isSubmitting$: Observable<boolean>;

    currencyCode$: Observable<string>;

    shouldRenderCancelledNegotiationMessage$: Observable<boolean>;

    shouldRenderNegotiationList$: Observable<boolean>;

    NEGOTIATION_STATUS = NEGOTIATION_STATUS;

    INVOICE_STATUS = INVOICE_STATUS;

    private subscription = new Subscription();

    invoiceAmount$: Observable<number>;

    invoiceHasBulkNegotiationId$: Observable<boolean>;

    constructor(
        private dialog: MatDialog,
        private storeService: PayerInvoiceStoreService,
        private invoiceNegotiationUnionQuery: InvoiceNegotiationUnionQuery,
        private query: PayerInvoiceQuery,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const id$ = this.route.parent.paramMap.pipe(
            map(paramMap => parseInt(paramMap.get('id')))
        );

        this.id$ = id$;

        this.hasLoaded$ = id$.pipe(
            switchMap(id =>
                this.invoiceNegotiationUnionQuery.selectEntityLoaded(id)
            )
        );

        this.isLoading$ = id$.pipe(
            switchMap(id =>
                this.invoiceNegotiationUnionQuery.selectEntityLoading(id)
            )
        );

        this.error$ = id$.pipe(
            switchMap(id =>
                this.invoiceNegotiationUnionQuery.selectEntityError(id)
            )
        );

        const hasNegotiations$ = id$.pipe(
            switchMap(id =>
                this.invoiceNegotiationUnionQuery.selectEntityIds(id)
            ),
            select(ids => ids.length > 0)
        );

        this.shouldRenderEmptyNegotiationsMessage$ = combineLatest(
            this.hasLoaded$,
            hasNegotiations$
        ).pipe(
            select(
                ([hasLoaded, hasNegotiations]) => hasLoaded && !hasNegotiations
            )
        );

        this.shouldRenderNegotiationList$ = combineLatest(
            this.hasLoaded$,
            hasNegotiations$
        ).pipe(
            select(
                ([hasLoaded, hasNegotiations]) => hasLoaded && hasNegotiations
            )
        );

        const latestNegotiation$: Observable<InvoiceNegotiation> = id$.pipe(
            switchMap(id =>
                this.invoiceNegotiationUnionQuery.selectEntityLatestNegotiation(
                    id
                )
            )
        );

        this.isSubmitting$ = id$.pipe(
            switchMap(id =>
                this.invoiceNegotiationUnionQuery.selectEntityLatestNegotiationSubmittingOffer(
                    id
                )
            )
        );

        const isEditing$ = id$.pipe(
            switchMap(id =>
                this.invoiceNegotiationUnionQuery.selectEntityLatestNegotiationEditingOffer(
                    id
                )
            )
        );

        const status$ = id$.pipe(
            switchMap(id =>
                this.invoiceNegotiationUnionQuery.selectEntityLatestNegotiationStatus(
                    id
                )
            )
        );

        this.shouldRenderCancelButton$ = status$.pipe(
            map(status => status == 'PROVIDER_PENDING_RESPONSE')
        );

        this.shouldRenderNegotiationActions$ = combineLatest(
            isEditing$,
            status$
        ).pipe(
            map(
                ([isEditing, status]) =>
                    !isEditing && status === 'PAYER_PENDING_RESPONSE'
            )
        );

        this.shouldRenderForm$ = isEditing$;

        this.shouldRenderInfo$ = isEditing$.pipe(map(isEditing => !isEditing));

        this.entities$ = id$.pipe(
            switchMap(id =>
                this.invoiceNegotiationUnionQuery.selectEntityNegotiations(id)
            )
        );

        this.payerOffer$ = latestNegotiation$.pipe(
            select(negotiation => (negotiation ? negotiation.payerOffer : null))
        );

        this.invoiceAmount$ = latestNegotiation$.pipe(
            select(invoice => invoice.amount)
        );

        const invoiceStatusIsAvalible$ = id$.pipe(
            switchMap(id => this.query.selectEntityStatus(id)),
            select(status => status == INVOICE_STATUS.AVAILABLE)
        );

        const negotiationStatusIsCancel$ = status$.pipe(
            select(status => status == NEGOTIATION_STATUS.CANCELLED)
        );

        this.shouldRenderCancelledNegotiationMessage$ = combineLatest(
            invoiceStatusIsAvalible$,
            negotiationStatusIsCancel$
        ).pipe(select(([isAvalible, isCancel]) => isAvalible || isCancel));

        this.providerOffer$ = latestNegotiation$.pipe(
            select(negotiation =>
                negotiation ? negotiation.providerOffer : null
            )
        );

        this.shouldRenderProviderOffer$ = this.providerOffer$.pipe(
            select(offer => !!offer)
        );

        this.shouldRenderNegotiationOffers$ = combineLatest(
            this.hasLoaded$,
            this.payerOffer$,
            this.providerOffer$,
            invoiceStatusIsAvalible$
        ).pipe(
            select(
                ([hasLoaded, payerOffer, providerOffer, isAvalible]) =>
                    hasLoaded &&
                    (!!payerOffer || !!providerOffer) &&
                    !isAvalible
            )
        );

        this.currencyCode$ = id$.pipe(
            switchMap(id => this.query.selectEntityCurrencyCode(id))
        );

        this.invoiceHasBulkNegotiationId$ = id$.pipe(
            switchMap(id => this.query.selectEntityHasBulkNegotiationId(id)),
            map(bulkNegotiationId => bulkNegotiationId != null)
        );

        const subscription = id$
            .pipe(switchMap(id => this.storeService.fetchNegotiations(id)))
            .subscribe();

        this.subscription.add(subscription);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    fetchNegotiations() {
        this.storeService.fetchNegotiations(this.id).subscribe();
    }

    onSubmitOffer(payload: NegotiationPayload) {
        this.storeService
            .updateLatestNegotiationOffer(this.id, payload)
            .subscribe();
    }

    onCounterOffer() {
        this.storeService.editLatestNegotiationOffer(this.id);
    }

    onCancelOffer() {
        this.storeService.closeLatestNegotiationOffer(this.id);
    }

    onOpenCancelNegotiationDialog() {
        this.dialog.open(PayerCancelNegotiationDialog, {
            data: { id: this.id },
        });
    }

    onOpenRejectOfferDialog() {
        this.dialog.open(PayerRejectOfferDialog, { data: { id: this.id } });
    }

    onOpenAcceptOfferDialog() {
        this.dialog.open(PayerAcceptOfferDialog, { data: { id: this.id } });
    }

    get id(): number {
        return parseInt(this.route.parent.snapshot.paramMap.get('id'));
    }

    trackBy(index: number, item: InvoiceNegotiation) {
        return item ? item.id : undefined;
    }
}
