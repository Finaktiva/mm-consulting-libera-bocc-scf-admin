import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuotaRequest } from '@libera/models/lender-quota-request';
import { Observable } from 'rxjs';
import { LenderQuotaRequestQuery } from '../../state/lender-quota-request.query';
import { LenderQuotaRequestStoreService } from '../../state/lender-quota-request.store.service';

@Component({
    selector: 'quota-request',
    templateUrl: './quota-request.dialog.html',
    styles: [],
})
export class QuotaRequestDialog {
    isSubmitting$: Observable<boolean> = this.query.selectQuotaSubmitting(
        this.data.id
    );

    constructor(
        private dialogRef: MatDialogRef<QuotaRequestDialog>,
        private query: LenderQuotaRequestQuery,
        private storeService: LenderQuotaRequestStoreService,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {}

    onSubmit(payload: QuotaRequest) {
        this.storeService
            .createQuotaRequest(this.data.id, payload)
            .subscribe(() => this.dialogRef.close());
    }
}
