import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { InvoiceStatus, INVOICE_STATUS } from '@libera/models/shared';
import { LENDER_INVOICE_STATUS } from '@libera/models/lender';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { delay, map, switchMap } from 'rxjs/operators';
import { FundingRequestDialog } from '../../dialogs/funding-request/funding-request.dialog';
import { NegotiationDialog } from '../../dialogs/negotiation/negotiation.dialog';
import { PayerInvoiceQuery } from '../../state/payer-invoice.query';
import { PayerInvoiceStoreService } from '../../state/payer-invoice.store.service';
import { FundingRequestQuery } from '../../state/funding-request.query';

@Component({
    selector: 'invoice-layout',
    templateUrl: './invoice.layout.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceLayout implements OnInit, OnDestroy {
    hasLoaded$: Observable<boolean>;

    isLoading$: Observable<boolean>;

    error$: Observable<any>;

    status$: Observable<InvoiceStatus>;

    invoiceNumber$: Observable<string>;

    shouldDisableNegotiateButton$: Observable<boolean>;

    shouldDisableRequestPaymentButton$: Observable<boolean>;

    shouldRenderPaymentTab$: Observable<boolean>;

    INVOICE_STATUS = INVOICE_STATUS;

    LENDER_INVOICE_STATUS = LENDER_INVOICE_STATUS;

    private subscription = new Subscription();

    constructor(
        private storeService: PayerInvoiceStoreService,
        private query: PayerInvoiceQuery,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private dialog: MatDialog,
        private FundingRequestQuery: FundingRequestQuery
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

        const entity$ = id$.pipe(switchMap(id => this.query.selectEntity(id)));

        this.status$ = entity$.pipe(
            select(entity => (entity ? entity.status : null))
        );

        this.invoiceNumber$ = entity$.pipe(
            select(entity => (entity ? entity.invoiceNumber : null))
        );

        this.shouldDisableNegotiateButton$ = id$.pipe(
            switchMap(id =>
                combineLatest(
                    this.hasLoaded$,
                    this.query.selectEntityHasProvider(id),
                    this.query.selectEntityStatus(id)
                )
            ),
            map(
                ([hasLoaded, hasProvider, status]) =>
                    !hasLoaded ||
                    !hasProvider ||
                    (status != 'LOADED' && status != 'AVAILABLE')
            )
        );

        this.shouldDisableRequestPaymentButton$ = id$.pipe(
            switchMap(id =>
                combineLatest(
                    this.hasLoaded$,
                    this.query.selectEntityHasProvider(id),
                    this.query.selectEntityHasLender(id),
                    this.query.selectEntityStatus(id)
                )
            ),
            map(
                ([hasLoaded, hasProvider, hasLender, status]) =>
                    !hasLoaded ||
                    !hasProvider ||
                    !hasLender ||
                    (status == INVOICE_STATUS.FUNDING_FINISHED ||
                        status == INVOICE_STATUS.FUNDING_IN_PROGRESS ||
                        status == INVOICE_STATUS.PAYMENT_CONFIRMED)
            )
        );
        this.shouldRenderPaymentTab$ = id$.pipe(
            switchMap(id => this.query.selectEntityStatus(id)),
            map(
                status =>
                    status == INVOICE_STATUS.FUNDING_FINISHED ||
                    status == INVOICE_STATUS.FUNDING_IN_PROGRESS ||
                    status == INVOICE_STATUS.PAID ||
                    status == INVOICE_STATUS.PAYMENT_CONFIRMED
            )
        );

        const sub1 = id$
            .pipe(switchMap(id => this.storeService.fetch(id)))
            .subscribe();

        //dumb hack
        const sub2 = this.hasLoaded$
            .pipe(delay(0))
            .subscribe(() => this.cdr.detectChanges());

        this.subscription.add(sub1).add(sub2);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    fetchInvoice() {
        this.storeService.fetch(this.id).subscribe();
    }

    onOpenNegotiationDialog() {
        const id = this.id;
        this.dialog.open(NegotiationDialog, { data: { id } });
    }

    get id(): number {
        return parseInt(this.route.snapshot.paramMap.get('id'));
    }

    onOpenRequestPaymentDialog() {
        const id = this.id;
        this.dialog.open(FundingRequestDialog, { data: { id } });
    }
}
