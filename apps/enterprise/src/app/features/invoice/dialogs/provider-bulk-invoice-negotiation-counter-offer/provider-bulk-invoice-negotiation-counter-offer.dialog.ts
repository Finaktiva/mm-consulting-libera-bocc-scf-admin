import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BulkInvoiceNegotiationCounterOfferPayload, Invoice } from '@libera/models/bulk-invoice-negotiation';
import { Observable } from 'rxjs';

import { ProviderBulkInvoiceNegotiationDetailQuery } from '../../state/provider-bulk-invoice-negotiation-detail.query';
import { ProviderBulkInvoiceNegotiationStoreService } from '../../state/provider-bulk-invoice-negotiation.store.service';

@Component({
    selector: 'provider-bulk-invoice-negotiation-counter-offer',
    templateUrl:
        './provider-bulk-invoice-negotiation-counter-offer.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderBulkInvoiceNegotiationCounterOfferDialog {
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
            ProviderBulkInvoiceNegotiationCounterOfferDialog
        >,
        @Inject(MAT_DIALOG_DATA) private data: { id: number },
        private storeService: ProviderBulkInvoiceNegotiationStoreService,
        private query: ProviderBulkInvoiceNegotiationDetailQuery
    ) {}

    onSubmit(payload: BulkInvoiceNegotiationCounterOfferPayload) {
        this.storeService
            .makeCounterOffer(this.data.id, payload)
            .subscribe(() => this.dialogRef.close());
    }
}
