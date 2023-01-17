import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnterpriseQuery, EnterpriseStoreService } from '@libera/state';

@Component({
    selector: 'resend-invitation-dialog',
    templateUrl: './resend-invitation.dialog.html',
})
export class ResendInvitationDialog {
    isSubmitting$ = this.query.selectEntityInviting(this.data.id);

    constructor(
        private dialogRef: MatDialogRef<ResendInvitationDialog>,
        @Inject(MAT_DIALOG_DATA) private data: { id: number },
        private query: EnterpriseQuery,
        private storeService: EnterpriseStoreService
    ) {}

    onSubmit() {
        this.storeService
            .invite(this.data.id)
            .subscribe(() => this.dialogRef.close());
    }
}
