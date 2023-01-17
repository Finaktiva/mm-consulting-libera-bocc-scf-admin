import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { InvoiceNegotiationUnionQuery } from '../../state/invoice-negotiation.union.query';
import { PayerInvoiceStoreService } from '../../state/payer-invoice.store.service';

@Component({
    selector: 'payer-reject-offer-dialog',
    templateUrl: './payer-reject-offer.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayerRejectOfferDialog {
    isSubmitting$: Observable<
        boolean
    > = this.query.selectEntityLatestNegotiationRejectingOffer(this.data.id);

    constructor(
        private dialogRef: MatDialogRef<PayerRejectOfferDialog>,
        private query: InvoiceNegotiationUnionQuery,
        private storeService: PayerInvoiceStoreService,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {}

    onSubmit() {
        this.storeService
            .rejectLatestNegotiationOffer(this.data.id)
            .subscribe(() => this.dialogRef.close());
    }
}
