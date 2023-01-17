import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EnterpriseRequestModuleDetailQuery } from '../../state/request-module-detail.query';
import { EnterpriseRequestModuleStoreService } from '../../state/request-module.store.service';

@Component({
    selector: 'approve-module-dialog',
    templateUrl: './approve-module.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproveModuleDialog {
    isSubmitting$ = this.query.selectEntityUpdating(this.data.id);

    constructor(
        private dialogRef: MatDialogRef<ApproveModuleDialog>,
        @Inject(MAT_DIALOG_DATA)
        private data: { id: number },
        private query: EnterpriseRequestModuleDetailQuery,
        private storeService: EnterpriseRequestModuleStoreService
    ) {}

    onSubmit() {
        this.storeService
            .changeStatus(this.data.id, {
                status: 'ACCEPTED',
                explanation: null,
                sendEmail: false,
            })
            .subscribe(() => this.dialogRef.close());
    }
}
