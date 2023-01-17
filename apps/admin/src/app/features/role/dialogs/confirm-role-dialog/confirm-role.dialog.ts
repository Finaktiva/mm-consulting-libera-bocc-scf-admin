import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnterpriseStoreService, UserRolesService } from '@libera/state';
import { UserQuery } from '../../../user/state/user.query';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';
import { UserRole } from '@libera/models/user';

@Component({
    selector: 'confirm-role-dialog',
    templateUrl: './confirm-role.dialog.html',
})
export class ConfirmRoleDialog extends FormBase {
    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ConfirmRoleDialog>,
        private rolesStoreService: UserRolesService,
        @Inject(MAT_DIALOG_DATA) public data: { payload: any, action: string, role: UserRole },
    ) {
        super()
        this.form = formBuilder.group({
            confirm: [false, Validators.required],
        })
    }

    onChangeConfirm () {
        const currentValue = this.form.get("confirm").value;
        this.form.get("confirm").patchValue(!currentValue);
    }

    onSubmit() {
        if (this.form.get("confirm").value)
            (this.data.action === 'CREATE')
                ? this.rolesStoreService.create(this.data.payload).subscribe(() => this.dialogRef.close(false))
                : this.rolesStoreService.update(this.data.role, this.data.payload).subscribe(() => this.dialogRef.close(false));
    }
}
