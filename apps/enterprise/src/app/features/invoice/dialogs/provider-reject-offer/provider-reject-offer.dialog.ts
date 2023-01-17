import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { InvoiceNegotiationUnionQuery } from '../../state/invoice-negotiation.union.query';
import { ProviderInvoiceStoreService } from '../../state/provider-invoice.store.service';

@Component({
    selector: 'provider-reject-offer-dialog',
    templateUrl: './provider-reject-offer.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderRejectOfferDialog {
    isSubmitting$: Observable<
        boolean
    > = this.query.selectEntityLatestNegotiationRejectingOffer(this.data.id);

    constructor(
        private dialogRef: MatDialogRef<ProviderRejectOfferDialog>,
        private query: InvoiceNegotiationUnionQuery,
        private storeService: ProviderInvoiceStoreService,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {}

    onSubmit() {
        this.storeService
            .rejectLatestNegotiationOffer(this.data.id)
            .subscribe(() => this.dialogRef.close());
    }
}
