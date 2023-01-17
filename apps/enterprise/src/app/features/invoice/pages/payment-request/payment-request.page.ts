import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { PaymentRequestStoreService } from '../../state/payment-request.store.service';
import { PaymentRequestQuery } from '../../state/payment-request.query';
import { MatDialog } from '@angular/material/dialog';
import { PaymentRequestDialog } from '../../dialogs/payment-request/payment-request.dialog';
import { ProviderPayment } from '@libera/models/provider';
import { select } from 'rxjs-augmented/operators';
import { INVOICE_STATUS } from '@libera/models/shared';
import { ProviderInvoiceQuery } from '../../state/provider-invoice.query';

@Component({
    selector: 'payment-request',
    templateUrl: './payment-request.page.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentRequestPage implements OnInit {
    id$: Observable<number>;

    hasLoaded$: Observable<boolean>;

    isLoading$: Observable<boolean>;

    error$: Observable<boolean>;

    payment$: Observable<ProviderPayment>;

    shouldRenderEmptyPaymentMessage$: Observable<boolean>;

    shouldRenderPaymentButton$: Observable<boolean>;

    shouldRenderPaymentInfo$: Observable<boolean>;

    INVOICE_STATUS = INVOICE_STATUS;

    constructor(
        private route: ActivatedRoute,
        private storeService: PaymentRequestStoreService,
        private query: PaymentRequestQuery,
        private dialog: MatDialog,
        private invoiceQuery: ProviderInvoiceQuery
    ) {}

    ngOnInit() {
        this.id$ = this.route.parent.paramMap.pipe(
            map(paramMap => parseInt(paramMap.get('id')))
        );

        this.hasLoaded$ = this.id$.pipe(
            switchMap(id => this.query.selectUIEntityLoaded(id))
        );

        this.isLoading$ = this.id$.pipe(
            switchMap(id => this.query.selectUIEntityLoading(id))
        );

        this.error$ = this.id$.pipe(
            switchMap(id => this.query.selectUIEntityError(id))
        );

        this.payment$ = this.id$.pipe(
            switchMap(id => this.query.selectEntity(id))
        );

        this.shouldRenderPaymentButton$ = this.id$
            .pipe(switchMap(id => this.invoiceQuery.selectEntityStatus(id)))
            .pipe(map(status => status != INVOICE_STATUS.PAYMENT_CONFIRMED));

        this.shouldRenderEmptyPaymentMessage$ = this.payment$.pipe(
            map(payment => payment && Object.keys(payment).length == 0)
        );

        this.shouldRenderPaymentInfo$ = combineLatest(
            this.hasLoaded$,
            this.shouldRenderEmptyPaymentMessage$
        ).pipe(select(([hasLoaded, hasPayment]) => hasLoaded && !hasPayment));

        this.fetchPayment();
    }

    fetchPayment() {
        this.storeService.fetch(this.id).subscribe();
    }

    onOpenPaymentRequestDialog() {
        this.dialog.open(PaymentRequestDialog, {
            data: {
                id: this.id,
                fundingRequestId: this.query.getEntity(this.id).id,
            },
        });
    }

    get id(): number {
        return parseInt(this.route.parent.snapshot.paramMap.get('id'));
    }
}
