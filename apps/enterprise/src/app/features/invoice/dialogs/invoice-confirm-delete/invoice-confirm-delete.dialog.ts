import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PayerInvoiceQuery } from '../../state/payer-invoice.query';
import { PayerInvoiceStoreService } from '../../state/payer-invoice.store.service';

@Component({
    selector: 'invoice-confirm-delete-dialog',
    templateUrl: './invoice-confirm-delete.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class invoiceConfirmDeleteDialog {
    isSubmitting$ = this.query.selectUIEntityDeleting(this.data.id);

    isChecked: boolean = false;

    constructor(
        private dialogRef: MatDialogRef<invoiceConfirmDeleteDialog>,
        private query: PayerInvoiceQuery,
        private storeService: PayerInvoiceStoreService,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {}

    onSubmit() {
        this.storeService
            .delete(this.data.id)
            .subscribe(() => this.dialogRef.close());
    }
}
