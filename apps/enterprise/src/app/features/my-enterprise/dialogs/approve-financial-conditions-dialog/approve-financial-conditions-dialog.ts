import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';
import { UserRolesService } from 'libs/state/src/lib/user-roles';
import { EnterpriseFinancialPlanStoreService } from '@libera/state';

@Component({
    selector: 'approve-financial-conditions-dialog',
    templateUrl: './approve-financial-conditions-dialog.html',
})
export class ApproveFinancialDialog extends FormBase implements OnInit {
    isSubmitting$ = false
    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ApproveFinancialDialog>,
        private storeServices: UserRolesService,
        private storeService: EnterpriseFinancialPlanStoreService,
        @Inject(MAT_DIALOG_DATA) public data: { action: string, idPlan: number },
    ) {
        super()
        this.form = formBuilder.group({
            confirm: [false, Validators.required],
            comment: [null, Validators.required],
        })
    }

    ngOnInit(): void {
        if(this.data.action === 'APPROVE') this.form.get('comment').disable()
    }

    onChangeConfirm () {
        const currentValue = this.form.get("confirm").value;
        this.form.get("confirm").patchValue(!currentValue);
    }

    onSubmit() {
        if(this.form.get("confirm").value && this.form.valid){
            const comments = this.form.get("comment").value
            this.storeService.approveFinancialPlan(this.data.idPlan,this.data.action,comments).subscribe(()=> {
                this.dialogRef.close({action:this.data.action})
            },error => {
                this.dialogRef.close()
            })
        }
    }
}
