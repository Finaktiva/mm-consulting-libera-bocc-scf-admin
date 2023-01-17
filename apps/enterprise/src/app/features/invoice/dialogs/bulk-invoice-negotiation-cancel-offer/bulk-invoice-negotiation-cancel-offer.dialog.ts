import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { PayerBulkInvoiceNegotiationDetailQuery } from '../../state/payer-bulk-invoice-negotiation-detail.query';
import { PayerBulkInvoiceNegotiationStoreService } from '../../state/payer-bulk-invoice-negotiation.store.service';

@Component({
    selector: 'bulk-invoice-negotiation-cancel-offer',
    templateUrl: './bulk-invoice-negotiation-cancel-offer.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkInvoiceNegotiationCancelOfferDialog {
    isSubmitting$: Observable<
        boolean
    > = this.query.selectUIEntityCancelingOffer(this.data.id);

    constructor(
        private dialogRef: MatDialogRef<
            BulkInvoiceNegotiationCancelOfferDialog
        >,
        @Inject(MAT_DIALOG_DATA)
        private data: { id: number },
        private query: PayerBulkInvoiceNegotiationDetailQuery,
        private storeService: PayerBulkInvoiceNegotiationStoreService
    ) {}

    onSubmit() {
        this.storeService
            .cancelOffer(this.data.id)
            .subscribe(() => this.dialogRef.close());
    }
}
