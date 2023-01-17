import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LENDER_INVOICE_STATUS, LenderFundingRequest } from '@libera/models/lender';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { map, switchMap, tap } from 'rxjs/operators';

import { InvoiceFundingRequestUnionQuery } from '../../state/invoice-funding-request.union.query';
import { PayerInvoiceQuery } from '../../state/payer-invoice.query';
import { PayerInvoiceStoreService } from '../../state/payer-invoice.store.service';

@Component({
    selector: 'funding-request',
    templateUrl: './funding-request.page.html',
    styles: [],
})
export class FundingRequestPage implements OnInit, OnDestroy {

    id$: Observable<number>;

    hasLoaded$: Observable<boolean>;

    isLoading$: Observable<boolean>;

    error$: Observable<boolean>;

    shouldRenderMessage$: Observable<boolean>;

    shouldRenderFunding$: Observable<boolean>;

    entities$: Observable<LenderFundingRequest[]>;

    date$: Observable<string>;

    amount$: Observable<number>;

    currencyCode$: Observable<string>;

    LENDER_INVOICE_STATUS = LENDER_INVOICE_STATUS;

    private subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private storeService: PayerInvoiceStoreService,
        private invoiceFundingRequestUnionQuery: InvoiceFundingRequestUnionQuery,
        private query: PayerInvoiceQuery
    ) { }

    ngOnInit() {
        this.id$ = this.route.parent.paramMap.pipe(
            map(paramMap => parseInt(paramMap.get('id')))
        );

        this.hasLoaded$ = this.id$.pipe(
            switchMap(id =>
                this.invoiceFundingRequestUnionQuery.selectEntityLoaded(id)
            )
        );

        this.isLoading$ = this.id$.pipe(
            switchMap(id =>
                this.invoiceFundingRequestUnionQuery.selectEntityLoading(id)
            )
        );

        this.error$ = this.id$.pipe(
            switchMap(id =>
                this.invoiceFundingRequestUnionQuery.selectEntityError(id)
            )
        );

        const hasFunding$ = this.id$.pipe(
            switchMap(id =>
                this.invoiceFundingRequestUnionQuery.selectEntityIds(id)
            ),
            select(ids => ids.length > 0)
        );

        this.shouldRenderMessage$ = combineLatest(
            this.hasLoaded$,
            hasFunding$
        ).pipe(select(([hasLoaded, hasFunding]) => hasLoaded && !hasFunding));

        this.shouldRenderFunding$ = combineLatest(
            this.hasLoaded$,
            hasFunding$
        ).pipe(select(([hasLoaded, hasFunding]) => hasLoaded && hasFunding));

        const latestFunding$: Observable<LenderFundingRequest> = this.id$.pipe(
            switchMap(id =>
                this.invoiceFundingRequestUnionQuery.selectEntityLatestFundingRequest(
                    id
                )
            )
        );

        this.entities$ = this.id$.pipe(
            switchMap(id =>
                this.invoiceFundingRequestUnionQuery.selectEntityFundingRequest(
                    id
                )
            )
        );

        this.amount$ = latestFunding$.pipe(
            select(funding => (funding ? funding.amount : null))
        );

        this.date$ = latestFunding$.pipe(
            select(funding => (funding ? funding.expectedPaymentDate : null))
        );

        this.currencyCode$ = this.id$.pipe(
            switchMap(id => this.query.selectEntityCurrencyCode(id))
        );

        const subscription = this.id$
            .pipe(switchMap(id => this.storeService.fetchFundingRequest(id)))
            .subscribe();

        this.subscription.add(subscription);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    fetchFunding() {
        this.storeService.fetchFundingRequest(this.id).subscribe();
    }

    get id(): number {
        return parseInt(this.route.parent.snapshot.paramMap.get('id'));
    }
}
