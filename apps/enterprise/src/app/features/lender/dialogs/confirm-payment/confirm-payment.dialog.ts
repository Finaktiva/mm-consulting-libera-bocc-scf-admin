import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmPaymentFormPayload, LenderInvoiceDetail } from '@libera/models/lender';
import { Observable } from 'rxjs';

import { LenderInvoiceRequestDetailQuery } from '../../state/lender-invoice-request-detail.query';
import { LenderInvoiceRequestStoreService } from '../../state/lender-invoice-request.store.service';

@Component({
    selector: 'confirm-payment-dialog',
    templateUrl: './confirm-payment.dialog.html',
})
export class ConfirmPaymentDialog {
    isSubmitting$: Observable<boolean> = this.query.selectChangingStatus(
        this.data.id
    );

    entity$: Observable<LenderInvoiceDetail> = this.query.selectEntity(
        this.data.id
    );

    private requestId = this.query.getRequestId(this.data.id);

    constructor(
        private dialogRef: MatDialogRef<ConfirmPaymentDialog>,
        private storeService: LenderInvoiceRequestStoreService,
        private query: LenderInvoiceRequestDetailQuery,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {}

    onSubmit(payload: ConfirmPaymentFormPayload) {
        this.storeService
            .confirmPayment(this.data.id,this.requestId, payload)
            .subscribe(() => this.dialogRef.close());
    }
}
