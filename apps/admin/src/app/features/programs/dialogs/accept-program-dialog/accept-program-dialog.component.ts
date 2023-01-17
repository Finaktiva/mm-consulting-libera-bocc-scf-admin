import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnterpriseQuery, EnterpriseStoreService } from '@libera/state';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';

@Component({
    selector: 'accept-program-dialog',
    templateUrl: './accept-program-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcceptProgramDialogComponent extends FormBase {
    isSubmitting$ = this.query.selectEntityUpdatingStatus(this.data.id);

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<AcceptProgramDialogComponent>,
        private query: EnterpriseQuery,
        private storeService: EnterpriseStoreService,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
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
            this.storeService
                .updateStatus(this.data.id, {
                    explanation: null,
                    status: 'ENABLED',
                    expeditionDate:''
                })
                .subscribe(() => this.dialogRef.close());
    }
}
