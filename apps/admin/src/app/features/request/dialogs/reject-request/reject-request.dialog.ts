import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EnterpriseRequestModuleDetailQuery } from '../../state/request-module-detail.query';
import { EnterpriseRequestModuleStoreService } from '../../state/request-module.store.service';

@Component({
    selector: 'reject-request-dialog',
    templateUrl: './reject-request.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RejectRequestDialog {
    form: FormGroup;

    isSubmitting$ = this.query.selectEntityUpdating(this.data.id);

    constructor(
        formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<RejectRequestDialog>,
        @Inject(MAT_DIALOG_DATA)
        private data: { id: number },
        private query: EnterpriseRequestModuleDetailQuery,
        private storeService: EnterpriseRequestModuleStoreService
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
