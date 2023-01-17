import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserStoreService } from '../../../user/state/user.store.service';
import { UserQuery } from '../../../user/state/user.query';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';

@Component({
    selector: 'send-invitation-dialog',
    templateUrl: './send-invitation.dialog.html',
})
export class SendInvitationDialog extends FormBase implements OnInit {
    isSubmitting$ = false
    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<SendInvitationDialog>,
        @Inject(MAT_DIALOG_DATA) private data: { id: number, firstTime: boolean },
        private query: UserQuery,
        private storeService: UserStoreService
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
            this.storeService
                .invite(this.data.id, true, this.data.firstTime)
                .subscribe(() => this.dialogRef.close());
    }
}
