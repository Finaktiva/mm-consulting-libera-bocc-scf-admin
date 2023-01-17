import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BulkInvoiceNegotiationFormValue } from '@libera/models/bulk-invoice-negotiation';
import { PayerInvoice } from '@libera/models/payer';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { BulkInvoiceNegotiationSubmitQuery } from '../../state/bulk-invoice-negotiation.submit.query';
import { PayerBulkInvoiceNegotiationStoreService } from '../../state/payer-bulk-invoice-negotiation.store.service';
import { BulkInvoiceNegotiationConfirmationDialog } from './bulk-invoice-negotiation-confirmation.dialog';

@Component({
    selector: 'payer-invoice-bulk-negotiation',
    templateUrl: './payer-invoice-bulk-negotiation.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayerInvoiceBulkNegotiationDialog {
    isSubmitting$ = this.query.selectSubmitting();

    constructor(
        @Inject(MAT_DIALOG_DATA) public invoices: PayerInvoice[],
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<PayerInvoiceBulkNegotiationDialog>,
        private query: BulkInvoiceNegotiationSubmitQuery,
        private storeService: PayerBulkInvoiceNegotiationStoreService
    ) {}

    onSubmit(payload: BulkInvoiceNegotiationFormValue) {
        const confirmed$: Observable<boolean> = this.dialog
            .open(BulkInvoiceNegotiationConfirmationDialog, { data: payload })
            .afterClosed();

        confirmed$
            .pipe(
                filter(confirmed => confirmed),
                switchMap(() => this.storeService.bulkCreate(payload))
            )
            .subscribe(() => this.dialogRef.close());
    }
}
