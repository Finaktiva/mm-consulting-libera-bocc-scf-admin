import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';

@Component({
    selector: 'send-documentation-dialog',
    templateUrl: './send-documentation.dialog.html',
})
export class SendDocumentationDialog extends FormBase implements OnInit {
    isSubmitting$ = false
    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<SendDocumentationDialog>,
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
            this.dialogRef.close(true);
    }
}
