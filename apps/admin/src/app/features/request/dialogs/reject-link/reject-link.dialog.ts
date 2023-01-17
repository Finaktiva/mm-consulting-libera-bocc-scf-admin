import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EnterpriseRequestLinkQuery } from '../../state/request-link.query';
import { EnterpriseRequestLinkStoreService } from '../../state/request-link.store.service';

@Component({
    selector: 'reject-link-dialog',
    templateUrl: './reject-link.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RejectLinkDialog {
    form: FormGroup;

    isSubmitting$ = this.query.selectUIEntityUpdating(this.data.id);

    constructor(
        formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<RejectLinkDialog>,
        @Inject(MAT_DIALOG_DATA)
        private data: { id: number },
        private query: EnterpriseRequestLinkQuery,
        private storeService: EnterpriseRequestLinkStoreService
    ) {
        this.form = formBuilder.group({
            explanation: ['', Validators.required],
        });
    }

    onSave() {
        this.onSubmit(false);
    }

    onSend() {
        this.onSubmit(true);
    }

    private onSubmit(sendEmail: boolean) {
        const { explanation } = this.form.value;
        this.storeService
            .changeStatus(this.data.id, {
                status: 'REJECTED',
                explanation,
                sendEmail,
            })
            .subscribe(() => this.dialogRef.close());
    }
}
