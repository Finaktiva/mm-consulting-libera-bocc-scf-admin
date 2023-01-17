import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { LenderQuotaRequestQuery } from '../../state/lender-quota-request.query';
import { LenderQuotaRequestStoreService } from '../../state/lender-quota-request.store.service';

@Component({
    selector: 'reject-quota-request',
    templateUrl: './reject-quota-request.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RejectQuotaRequestDialog {
    isSubmitting$: Observable<boolean> = this.query.selectUIEntityRejecting(
        this.data.id
    );

    constructor(
        private dialogRef: MatDialogRef<RejectQuotaRequestDialog>,
        private storeService: LenderQuotaRequestStoreService,
        private query: LenderQuotaRequestQuery,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {}

    onSubmit() {
        this.storeService
            .reject(this.data.id)
            .subscribe(() => this.dialogRef.close());
    }
}
