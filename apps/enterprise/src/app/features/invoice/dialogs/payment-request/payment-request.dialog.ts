import {
    Component,
    OnInit,
    Inject,
    ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentRequestQuery } from '../../state/payment-request.query';
import { PaymentRequestStoreService } from '../../state/payment-request.store.service';
import { CreatePaymentRequestQuery } from '../../state/create-payment-request.query';
import { Observable } from 'rxjs';
import { ProviderPayment } from '@libera/models/provider';
import { ProviderInvoiceQuery } from '../../state/provider-invoice.query';

@Component({
    selector: 'payment-request',
    templateUrl: './payment-request.dialog.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentRequestDialog implements OnInit {
    payment$: Observable<ProviderPayment>;
    isSubmittingForm$ = this.querySubmit.selectSubmitting();
    currencyCode$: Observable<string>;

    constructor(
        private dialogRef: MatDialogRef<PaymentRequestDialog>,
        private query: PaymentRequestQuery,
        private storeService: PaymentRequestStoreService,
        private querySubmit: CreatePaymentRequestQuery,
        private queryInvoice: ProviderInvoiceQuery,
        @Inject(MAT_DIALOG_DATA)
        private data: { id: number; fundingRequestId: number }
    ) {}

    ngOnInit() {
        this.payment$ = this.query.selectEntity(this.data.id);
        this.currencyCode$ = this.queryInvoice.selectEntityCurrencyCode(
            this.data.id
        );
    }

    onSubmit() {
        this.storeService
            .createRequestPayment(this.data.id, this.data.fundingRequestId)
            .subscribe(() => this.dialogRef.close());
    }
}
