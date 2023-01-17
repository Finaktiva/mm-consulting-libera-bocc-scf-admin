import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NegotiationPayload } from '@libera/models/shared';
import { Observable } from 'rxjs';

import { PayerInvoiceQuery } from '../../state/payer-invoice.query';
import { PayerInvoiceStoreService } from '../../state/payer-invoice.store.service';

@Component({
    selector: 'negotiation-dialog',
    templateUrl: './negotiation.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NegotiationDialog {
    isSubmitting$: Observable<boolean> = this.query.selectUIEntityNegotiating(
        this.data.id
    );

    constructor(
        private dialogRef: MatDialogRef<NegotiationDialog>,
        private query: PayerInvoiceQuery,
        private storeService: PayerInvoiceStoreService,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {}

    onSubmit(payload: NegotiationPayload) {
        this.storeService
            .negotiate(this.data.id, payload)
            .subscribe(() => this.dialogRef.close());
    }
}
