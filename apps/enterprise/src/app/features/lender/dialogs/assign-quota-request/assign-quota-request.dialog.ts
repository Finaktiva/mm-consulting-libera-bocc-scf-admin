import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { LenderQuotaRequestQuery } from '../../state/lender-quota-request.query';
import { LenderQuotaRequestStoreService } from '../../state/lender-quota-request.store.service';
import { LenderQuotaRequestPayload } from '@libera/models/lender-quota-request';

@Component({
    selector: 'assign-quota-request',
    templateUrl: './assign-quota-request.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignQuotaRequestDialog {
    isSubmitting$: Observable<boolean> = this.query.selectUIEntityApproving(
        this.data.id
    );

    constructor(
        private dialogRef: MatDialogRef<AssignQuotaRequestDialog>,
        private storeService: LenderQuotaRequestStoreService,
        private query: LenderQuotaRequestQuery,
        @Inject(MAT_DIALOG_DATA)
        private data: { id: number; payload: LenderQuotaRequestPayload }
    ) {}

    onSubmit() {
        this.storeService
            .update(this.data.id, this.data.payload)
            .subscribe(() => this.dialogRef.close());
    }
}
