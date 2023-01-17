import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
    LenderInvoiceDetail,
    LenderInvoiceDetailEnterprise,
    LenderInvoiceStatus,
    LENDER_INVOICE_STATUS,
    PaymentDocumentation,
} from '@libera/models/lender';
import { Observable, Subscription } from 'rxjs';
import { combineLatest, map, switchMap } from 'rxjs/operators';
import { ConfirmPaymentDialog } from '../../dialogs/confirm-payment/confirm-payment.dialog';
import { RejectPaymentDialog } from '../../dialogs/reject-payment/reject-payment.dialog';
import { LenderInvoiceRequestDetailQuery } from '../../state/lender-invoice-request-detail.query';
import { LenderInvoiceRequestStoreService } from '../../state/lender-invoice-request.store.service';

@Component({
    selector: 'request-detail',
    templateUrl: './request-detail.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestDetailPage implements OnInit, OnDestroy {
    hasLoaded$: Observable<boolean>;

    isLoading$: Observable<boolean>;

    error$: Observable<any>;

    entity$: Observable<LenderInvoiceDetail>;

    status$: Observable<LenderInvoiceStatus>;

    payer$: Observable<LenderInvoiceDetailEnterprise>;

    provider$: Observable<LenderInvoiceDetailEnterprise>;

    instructions$: Observable<string>;

    documentation$: Observable<PaymentDocumentation[]>;

    shouldRenderActions$: Observable<boolean>;

    LENDER_INVOICE_STATUS = LENDER_INVOICE_STATUS;

    private subscription = new Subscription();

    constructor(
        private dialog: MatDialog,
        private storeService: LenderInvoiceRequestStoreService,
        private query: LenderInvoiceRequestDetailQuery,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const id$ = this.route.paramMap.pipe(
            map(paramMap => parseInt(paramMap.get('id')))
        );

        this.isLoading$ = id$.pipe(
            switchMap(id => this.query.selectUIEntityLoading(id))
        );

        this.hasLoaded$ = id$.pipe(
            switchMap(id => this.query.selectUIEntityLoaded(id)),
            combineLatest(this.isLoading$),
            map(([isLoaded, isLoading]) => isLoaded && !isLoading)
        );

        this.error$ = id$.pipe(
            switchMap(id => this.query.selectUIEntityError(id))
        );

        const entity$ = id$.pipe(switchMap(id => this.query.selectEntity(id)));

        this.entity$ = entity$;

        this.status$ = entity$.pipe(
            map(entity => (entity ? entity.fundStatus : null))
        );

        this.instructions$ = entity$.pipe(
            map(entity => (entity ? entity.payment.paymentInstruction : null))
        );

        this.instructions$ = entity$.pipe(
            map(entity => (entity ? entity.payment.paymentInstruction : null))
        );

        this.documentation$ = entity$.pipe(
            map(entity => (entity ? entity.payment.paymentDocumentation : []))
        );

        this.payer$ = entity$.pipe(
            map(entity => (entity ? entity.payer : null))
        );

        this.provider$ = entity$.pipe(
            map(entity => (entity ? entity.provider : null))
        );

        this.shouldRenderActions$ = this.status$.pipe(
            map(
                status =>
                    status ==
                    LENDER_INVOICE_STATUS.PENDING_LENDER_PAYMENT_CONFIRMATION
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

    onOpenRejectPaymentDialog() {
        this.dialog.open(RejectPaymentDialog, { data: { id: this.id } });
    }

    onOpenConfirmPaymentDialog() {
        this.dialog.open(ConfirmPaymentDialog, { data: { id: this.id } });
    }

    fetch() {
        this.storeService.fetch(this.id).subscribe();
    }

    get id(): number {
        return parseInt(this.route.snapshot.paramMap.get('id'));
    }
}
