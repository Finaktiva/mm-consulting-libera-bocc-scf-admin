import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';
import { UserRole } from '@libera/models/user';
import { UserRolesService } from 'libs/state/src/lib/user-roles';
import { RoleStatus } from "@libera/models/role"

@Component({
    selector: 'enabled-role-dialog',
    templateUrl: './enabled-role.dialog.html',
})
export class EnabledRoleDialog extends FormBase implements OnInit {
    isSubmitting$ = false
    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<EnabledRoleDialog>,
        private storeServices: UserRolesService,
        @Inject(MAT_DIALOG_DATA) public data: { rol: UserRole },
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
        if (this.form.get("confirm").value){
            const newStatus: RoleStatus = (this.data.rol.status === 'DISABLED')?'ENABLED':'DISABLED'
            this.storeServices.updateRoleStatus(this.data.rol, newStatus).subscribe(() => {
                this.dialogRef.close()
            });
        }
    }
}
