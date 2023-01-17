import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BulkInvoiceNegotiationCounterOfferPayload, Invoice } from '@libera/models/bulk-invoice-negotiation';
import { Observable } from 'rxjs';

import { PayerBulkInvoiceNegotiationDetailQuery } from '../../state/payer-bulk-invoice-negotiation-detail.query';
import { PayerBulkInvoiceNegotiationStoreService } from '../../state/payer-bulk-invoice-negotiation.store.service';

@Component({
    selector: 'payer-bulk-invoice-negotiation-counter-offer',
    templateUrl: './payer-bulk-invoice-negotiation-counter-offer.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayerBulkInvoiceNegotiationCounterOfferDialog {
    isSubmitting$: Observable<
        boolean
    > = this.query.selectUIEntityMakingCounterOffer(this.data.id);

    invoices$: Observable<Invoice[]> = this.query.selectEntityInvoices(
        this.data.id
    );

    quota$: Observable<number> = this.query.selectEntityLenderAvailableQuota(
        this.data.id
    );

    constructor(
        private dialogRef: MatDialogRef<
            PayerBulkInvoiceNegotiationCounterOfferDialog
        >,
        @Inject(MAT_DIALOG_DATA) private data: { id: number },
        private storeService: PayerBulkInvoiceNegotiationStoreService,
        private query: PayerBulkInvoiceNegotiationDetailQuery
    ) {}

    onSubmit(payload: BulkInvoiceNegotiationCounterOfferPayload) {
        this.storeService
            .makeCounterOffer(this.data.id, payload)
            .subscribe(() => this.dialogRef.close());
    }
}
