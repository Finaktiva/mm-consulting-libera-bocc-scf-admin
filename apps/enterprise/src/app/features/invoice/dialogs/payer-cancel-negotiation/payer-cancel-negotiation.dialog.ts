import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { InvoiceNegotiationUnionQuery } from '../../state/invoice-negotiation.union.query';
import { PayerInvoiceStoreService } from '../../state/payer-invoice.store.service';

@Component({
    selector: 'payer-cancel-negotiation-dialog',
    templateUrl: './payer-cancel-negotiation.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayerCancelNegotiationDialog {
    isSubmitting$: Observable<
        boolean
    > = this.query.selectEntityLatestNegotiationCancellingOffer(this.data.id);

    constructor(
        private dialogRef: MatDialogRef<PayerCancelNegotiationDialog>,
        private query: InvoiceNegotiationUnionQuery,
        private storeService: PayerInvoiceStoreService,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {}

    onSubmit() {
        this.storeService
            .cancelCurrentNegotiation(this.data.id)
            .subscribe(() => this.dialogRef.close());
    }
}
