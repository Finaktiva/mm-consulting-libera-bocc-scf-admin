import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { EnterpriseCreateQuery, EnterpriseStoreService } from '@libera/state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';

@Component({
    selector: 'delete-document-dialog',
    templateUrl: './delete-document-dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DeleteDocumentDialog extends FormBase implements OnInit {

    isSubmitting$ = this.query.selectSubmitting();
    
    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<DeleteDocumentDialog>,
        private query: EnterpriseCreateQuery,
        private storeService: EnterpriseStoreService,
        @Inject(MAT_DIALOG_DATA) private data: { idFile: number }
    ) {
        super()
        this.form = formBuilder.group({
            confirm: [true, Validators.required],
        })
    }

    onChangeConfirm () {
        const currentValue = this.form.get("confirm").value;
        this.form.get("confirm").patchValue(!currentValue);
    }

    shouldDisable(): boolean {
        return this.form.get("confirm").value
    }
    
    ngOnInit(): void {
    }
}