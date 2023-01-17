import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnterpriseStoreService } from '@libera/state';
import { UserQuery } from '../../../user/state/user.query';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';

@Component({
    selector: 'send-resolution-dialog',
    templateUrl: './send-resolution.dialog.html',
})
export class SendResolutionDialog extends FormBase implements OnInit {
    isSubmitting$ = false
    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<SendResolutionDialog>,
        @Inject(MAT_DIALOG_DATA) private data: { id: number },
        private enterpiseStoreService: EnterpriseStoreService
    ) {
        super()
        this.form = formBuilder.group({
            confirm: [false, Validators.required],
        })
    }

    ngOnInit(): void {
        
    }

    onChangeConfirm () {
        const currentValue = this.form.get("confirm").value;
        this.form.get("confirm").patchValue(!currentValue);
    }

    onSubmit() {
        if (this.form.get("confirm").value)
            this.enterpiseStoreService
                .sendDocumentationResolution(this.data.id)
                .subscribe(() => this.dialogRef.close());
    }
}
