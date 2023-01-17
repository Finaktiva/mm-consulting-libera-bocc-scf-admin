import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { EnterpriseCreateQuery, EnterpriseDocumentationStoreService, EnterpriseStoreService } from '@libera/state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'delete-document-dialog',
    templateUrl: './delete-document-dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DeleteDocumentDialog extends FormBase implements OnInit {

    isLoadingDocument = false;
    isSubmitting$ = this.query.selectSubmitting();
    
    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<DeleteDocumentDialog>,
        private query: EnterpriseCreateQuery,
        private storeService: EnterpriseStoreService,
        private documentationStoreService: EnterpriseDocumentationStoreService,
        @Inject(MAT_DIALOG_DATA) public data: { idFile: number, enterpriseId:number, description: string }
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
        return (this.form.get("confirm").value || this.isLoadingDocument)
    }

    deleteFile () {
        this.isLoadingDocument = true;
        if(this.data.enterpriseId)
            this.documentationStoreService
                .deleteFile(this.data.enterpriseId, this.data.idFile)
                .subscribe(() => {
                    this.dialogRef.close();
                    this.isLoadingDocument = false;
                }, (error) => {
                    this.dialogRef.close();
                    this.isLoadingDocument = false;
                })
        else
            this.documentationStoreService
                .deleteFileEnterprise(this.data.idFile)
                .subscribe(() => {
                    this.dialogRef.close();
                    this.isLoadingDocument = false;
                }, (error) => {
                    this.dialogRef.close();
                    this.isLoadingDocument = false;
                })
    }
    
    ngOnInit(): void {
    }
}