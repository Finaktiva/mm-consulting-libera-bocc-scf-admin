import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LenderInvoiceDetail } from '@libera/models/lender';
import { Observable } from 'rxjs';

import { LenderInvoiceRequestDetailQuery } from '../../state/lender-invoice-request-detail.query';
import { LenderInvoiceRequestStoreService } from '../../state/lender-invoice-request.store.service';

@Component({
    selector: 'reject-payment-dialog',
    templateUrl: './reject-payment.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RejectPaymentDialog {
    isSubmitting$: Observable<boolean> = this.query.selectChangingStatus(
        this.data.id
    );

    entity$: Observable<LenderInvoiceDetail> = this.query.selectEntity(
        this.data.id
    );

    reason: string = '';

    private requestId = this.query.getRequestId(this.data.id);

    constructor(
        private dialogRef: MatDialogRef<RejectPaymentDialog>,
        private storeService: LenderInvoiceRequestStoreService,
        private query: LenderInvoiceRequestDetailQuery,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {}

    onSubmit() {
        this.storeService
            .rejectPayment(this.data.id,this.requestId, this.reason)
            .subscribe(() => this.dialogRef.close());
    }
}
