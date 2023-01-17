import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BulkInvoiceNegotiationOffer, Invoice } from '@libera/models/bulk-invoice-negotiation';
import { NegotiationStatus } from '@libera/models/shared';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import {
    BulkInvoiceNegotiationAcceptOfferDialog,
} from '../../dialogs/bulk-invoice-negotiation-accept-offer/bulk-invoice-negotiation-accept-offer.dialog';
import {
    BulkInvoiceNegotiationRejectOfferDialog,
} from '../../dialogs/bulk-invoice-negotiation-reject-offer/bulk-invoice-negotiation-reject-offer.dialog';
import {
    ProviderBulkInvoiceNegotiationCounterOfferDialog,
} from '../../dialogs/provider-bulk-invoice-negotiation-counter-offer/provider-bulk-invoice-negotiation-counter-offer.dialog';
import { ProviderBulkInvoiceNegotiationDetailQuery } from '../../state/provider-bulk-invoice-negotiation-detail.query';
import { ProviderBulkInvoiceNegotiationStoreService } from '../../state/provider-bulk-invoice-negotiation.store.service';

@Component({
    selector: 'provider-bulk-invoice-negotiation-detail',
    templateUrl: './provider-bulk-invoice-negotiation-detail.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderBulkInvoiceNegotiationDetailPage
    implements OnInit, OnDestroy {
    hasLoaded$: Observable<boolean>;

    isLoading$: Observable<boolean>;

    error$: Observable<any>;

    folio$: Observable<string>;

    status$: Observable<NegotiationStatus>;

    provider$: Observable<string>;

    lender$: Observable<string>;

    // availableQuota$: Observable<number>;

    total$: Observable<number>;

    invoices$: Observable<Invoice[]>;

    hasPayerOffer$: Observable<boolean>;

    payerOffer$: Observable<BulkInvoiceNegotiationOffer>;

    hasProviderOffer$: Observable<boolean>;

    providerOffer$: Observable<BulkInvoiceNegotiationOffer>;

    length$: Observable<number>;

    shouldRenderAcceptOfferButton$: Observable<boolean>;

    shouldRenderCounterOfferButton$: Observable<boolean>;

    shouldRenderRejectOfferButton$: Observable<boolean>;

    private subscription = new Subscription();

    constructor(
        private dialog: MatDialog,
        private query: ProviderBulkInvoiceNegotiationDetailQuery,
        private storeService: ProviderBulkInvoiceNegotiationStoreService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const id$: Observable<number> = this.route.paramMap.pipe(
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

        this.folio$ = id$.pipe(
            switchMap(id => this.query.selectEntityFolio(id))
        );

        this.status$ = id$.pipe(
            switchMap(id => this.query.selectEntityNegotiationStatus(id))
        );

        const isPendingProviderResponse$ = this.status$.pipe(
            map(status => status == 'PROVIDER_PENDING_RESPONSE')
        );

        this.shouldRenderAcceptOfferButton$ = isPendingProviderResponse$;
        this.shouldRenderCounterOfferButton$ = isPendingProviderResponse$;
        this.shouldRenderRejectOfferButton$ = isPendingProviderResponse$;

        this.provider$ = id$.pipe(
            switchMap(id => this.query.selectEntityProvider(id))
        );

        this.lender$ = id$.pipe(
            switchMap(id => this.query.selectEntityLender(id))
        );

        // this.availableQuota$ = id$.pipe(
        //     switchMap(id => this.query.selectEntityLenderAvailableQuota(id))
        // );

        this.invoices$ = id$.pipe(
            switchMap(id => this.query.selectEntityInvoices(id))
        );

        this.length$ = id$.pipe(
            switchMap(id => this.query.selectEntityInvoiceLength(id))
        );

        this.total$ = id$.pipe(
            switchMap(id => this.query.selectEntityTotalAmount(id))
        );

        this.hasPayerOffer$ = id$.pipe(
            switchMap(id => this.query.selectEntityHasPayerOffer(id))
        );

        this.payerOffer$ = id$.pipe(
            switchMap(id => this.query.selectEntityPayerOffer(id))
        );

        this.hasProviderOffer$ = id$.pipe(
            switchMap(id => this.query.selectEntityHasProviderOffer(id))
        );

        this.providerOffer$ = id$.pipe(
            switchMap(id => this.query.selectEntityProviderOffer(id))
        );

        const subscription = id$
            .pipe(switchMap(id => this.storeService.fetch(id)))
            .subscribe();

        this.subscription.add(subscription);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onOpenAcceptOfferDialog() {
        const id: number = parseInt(this.route.snapshot.paramMap.get('id'));
        this.dialog.open(BulkInvoiceNegotiationAcceptOfferDialog, {
            data: { id, type: 'PROVIDER' },
        });
    }

    onOpenRejectOfferDialog() {
        const id: number = parseInt(this.route.snapshot.paramMap.get('id'));
        this.dialog.open(BulkInvoiceNegotiationRejectOfferDialog, {
            data: { id, type: 'PROVIDER' },
        });
    }

    onOpenCounterOfferDialog() {
        const id: number = parseInt(this.route.snapshot.paramMap.get('id'));
        this.dialog.open(ProviderBulkInvoiceNegotiationCounterOfferDialog, {
            data: { id },
        });
    }

    fetch() {
        const id: number = parseInt(this.route.snapshot.paramMap.get('id'));
        this.storeService.fetch(id).subscribe();
    }
}
