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

import { ProviderAcceptOfferDialog } from '../../dialogs/provider-accept-offer/provider-accept-offer.dialog';
import { ProviderRejectOfferDialog } from '../../dialogs/provider-reject-offer/provider-reject-offer.dialog';
import { InvoiceNegotiationUnionQuery } from '../../state/invoice-negotiation.union.query';
import { ProviderInvoiceQuery } from '../../state/provider-invoice.query';
import { ProviderInvoiceStoreService } from '../../state/provider-invoice.store.service';
import { INVOICE_STATUS } from '@libera/models/shared';

@Component({
    selector: 'provider-negotiation-page',
    templateUrl: './provider-negotiation.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderNegotiationPage implements OnInit, OnDestroy {
    hasLoaded$: Observable<boolean>;

    isLoading$: Observable<boolean>;

    error$: Observable<boolean>;

    shouldRenderMessage$: Observable<boolean>;

    shouldRenderNegotiationOffers$: Observable<boolean>;

    shouldRenderForm$: Observable<boolean>;

    shouldRenderInfo$: Observable<boolean>;

    shouldRenderProviderOffer$: Observable<boolean>;

    shouldRenderNegotiationActions$: Observable<boolean>;

    payerOffer$: Observable<NegotiationOffer>;

    providerOffer$: Observable<NegotiationOffer>;

    isSubmitting$: Observable<boolean>;

    currencyCode$: Observable<string>;

    NEGOTIATION_STATUS = NEGOTIATION_STATUS;

    private subscription = new Subscription();

    invoiceAmount$: Observable<number>;

    INVOICE_STATUS = INVOICE_STATUS;

    hideNegotiationActions$: Observable<boolean>;

    constructor(
        private storeService: ProviderInvoiceStoreService,
        private invoiceNegotiationUnionQuery: InvoiceNegotiationUnionQuery,
        private query: ProviderInvoiceQuery,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        const id$ = this.route.parent.paramMap.pipe(
            map(paramMap => parseInt(paramMap.get('id')))
        );

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

        const invoiceStatusIsAvalible$ = id$.pipe(
            switchMap(id => this.query.selectEntityStatus(id)),
            select(status => status == INVOICE_STATUS.AVAILABLE)
        );

        this.shouldRenderMessage$ = combineLatest(
            this.hasLoaded$,
            hasNegotiations$,
            invoiceStatusIsAvalible$
        ).pipe(
            select(
                ([hasLoaded, hasNegotiations, invoiceIsAvalible]) =>
                    (hasLoaded && !hasNegotiations) || invoiceIsAvalible
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

        this.shouldRenderNegotiationActions$ = combineLatest(
            isEditing$,
            status$
        ).pipe(
            map(
                ([isEditing, status]) =>
                    !isEditing && status === 'PROVIDER_PENDING_RESPONSE'
            )
        );

        this.shouldRenderForm$ = isEditing$;

        this.shouldRenderInfo$ = isEditing$.pipe(map(isEditing => !isEditing));

        this.payerOffer$ = latestNegotiation$.pipe(
            select(negotiation => (negotiation ? negotiation.payerOffer : null))
        );

        this.providerOffer$ = latestNegotiation$.pipe(
            select(negotiation =>
                negotiation ? negotiation.providerOffer : null
            )
        );

        this.shouldRenderProviderOffer$ = combineLatest(
            isEditing$,
            this.providerOffer$
        ).pipe(map(([isEditing, offer]) => isEditing || !!offer));

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

        this.hideNegotiationActions$ = id$.pipe(
            switchMap(id =>
                this.query
                    .selectInvoiceBulkId(id)
                    .pipe(select(invoiceIdBulk => !!invoiceIdBulk))
            )
        );

        this.invoiceAmount$ = latestNegotiation$.pipe(
            select(invoice => invoice.amount)
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

    onOpenRejectOfferDialog() {
        this.dialog.open(ProviderRejectOfferDialog, { data: { id: this.id } });
    }

    onOpenAcceptOfferDialog() {
        this.dialog.open(ProviderAcceptOfferDialog, { data: { id: this.id } });
    }

    get id(): number {
        return parseInt(this.route.parent.snapshot.paramMap.get('id'));
    }
}
