import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LenderQuotaRequestPayload } from '@libera/models/lender-quota-request';
import { Observable } from 'rxjs';

import { LenderQuotaRequestQuery } from '../../state/lender-quota-request.query';
import { LenderQuotaRequestStoreService } from '../../state/lender-quota-request.store.service';

@Component({
    selector: 'update-quota-request',
    templateUrl: './update-quota-request.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateQuotaRequestDialog {
    isSubmitting$: Observable<boolean> = this.query.selectUIEntityUpdating(
        this.data.id
    );

    constructor(
        private dialogRef: MatDialogRef<UpdateQuotaRequestDialog>,
        private storeService: LenderQuotaRequestStoreService,
        private query: LenderQuotaRequestQuery,
        @Inject(MAT_DIALOG_DATA)
        private data: { id: number; payload: LenderQuotaRequestPayload }
    ) {}

    onSubmit() {
        const { id, payload } = this.data;

        this.storeService
            .update(id, payload)
            .subscribe(() => this.dialogRef.close());
    }
}
