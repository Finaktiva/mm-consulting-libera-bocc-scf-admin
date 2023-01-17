import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { InvoiceNegotiationUnionQuery } from '../../state/invoice-negotiation.union.query';
import { PayerInvoiceStoreService } from '../../state/payer-invoice.store.service';

@Component({
    selector: 'payer-accept-offer-dialog',
    templateUrl: './payer-accept-offer.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayerAcceptOfferDialog {
    isSubmitting$: Observable<
        boolean
    > = this.query.selectEntityLatestNegotiationAcceptingOffer(this.data.id);

    constructor(
        private dialogRef: MatDialogRef<PayerAcceptOfferDialog>,
        private query: InvoiceNegotiationUnionQuery,
        private storeService: PayerInvoiceStoreService,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {}

    onSubmit() {
        this.storeService
            .acceptLatestNegotiationOffer(this.data.id)
            .subscribe(() => this.dialogRef.close());
    }
}
