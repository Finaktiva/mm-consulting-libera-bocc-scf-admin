import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { EnterpriseCreateQuery, EnterpriseDocumentationQuery, EnterpriseDocumentationStoreService } from '@libera/state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';
import { Subscription } from 'rxjs';
import { NgEzFileInputDirective, NgEzValidators } from '@ngez/core';

@Component({
    selector: 'upload-proof-pricing-dialog',
    templateUrl: './upload-proof-pricing-dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UploadProofPricingDialog extends FormBase implements OnInit {
    isUploading$ = this.enterpriseDocumentationQuery.selectUploading(0);
    isSubmitting$ = this.query.selectSubmitting();
    isLoadingDocument = false;
    private subscription: Subscription;
    @ViewChild(NgEzFileInputDirective, {static: false}) fileInput: NgEzFileInputDirective;
    isDeletingFile: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<UploadProofPricingDialog>,
        private query: EnterpriseCreateQuery,
        private documentationStoreService: EnterpriseDocumentationStoreService,
        private enterpriseDocumentationQuery: EnterpriseDocumentationQuery,
        private changeDetectorRef: ChangeDetectorRef, 
        @Inject(MAT_DIALOG_DATA) public data: { id: number, file: File },
    ) {
        super()
        this.form = formBuilder.group({
            file: [null, [NgEzValidators.fileType('.pdf, image/jpg, image/jpeg')]],
        })
    }

    ngOnInit(): void {
        this.form.get("file").patchValue(this.data.file);
        this.subscription = this.form.get("file").valueChanges.subscribe((value) =>{
            const fileField = this.form.get("file");
            if(this.isLoadingDocument){
                this.isLoadingDocument = false;
                return;
            }
            if (!this.form.valid) return;
            this.onUploadFile();
            fileField.disable({emitEvent: false})
            fileField.enable({emitEvent: false});
        });
    }

    onSubmit(): void {
        if (!this.form.valid) return;
        this.dialogRef.close(this.form.value.file);
    }

    onUploadFile() {
        this.isLoadingDocument = true;
        this.documentationStoreService
            .uploadBasicFile(
                this.data.id,
                this.form.get("file").value,
            )
            .subscribe(
                (res) => {
                    this.isLoadingDocument = false;
                },
                (error) => {
                    this.isLoadingDocument = false;
                }
            );
    }

    deleteFile(){
        this.isLoadingDocument = true;
        this.fileInput.clear();
        this.isDeletingFile = true;
        setTimeout( () => {
            this.isDeletingFile = false;
            this.changeDetectorRef.detectChanges();
        }, 0);
    }
}
