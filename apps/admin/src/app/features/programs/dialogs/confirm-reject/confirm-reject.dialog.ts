import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnterpriseQuery, EnterpriseStoreService } from '@libera/state';

@Component({
    selector: 'confirm-reject-dialog',
    templateUrl: './confirm-reject.dialog.html',
    styleUrls: ['./confirm-reject.dialog.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmRejectDialog {
    isSubmitting$ = this.query.selectEntityUpdatingStatus(this.data.id);

    constructor(
        private dialogRef: MatDialogRef<ConfirmRejectDialog>,
        private query: EnterpriseQuery,
        private storeService: EnterpriseStoreService,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {}

    onSubmit(explanation: string) {
        this.storeService
            .updateStatus(this.data.id, { status: 'REJECTED', explanation, expeditionDate:'2022-06-02' })
            .subscribe(() => this.dialogRef.close());
    }
}
