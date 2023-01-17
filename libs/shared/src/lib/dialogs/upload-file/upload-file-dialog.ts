import { ChangeDetectionStrategy, Component, OnInit, Inject, ViewChild } from '@angular/core';
import { EnterpriseCreateQuery, EnterpriseDocumentationStoreService, EnterpriseStoreService } from '@libera/state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';
import { Subscription } from 'rxjs';
import { EnterpriseStatus } from '@libera/models/enterprise';
import { ActivatedRoute } from '@angular/router';
import { isValidDate } from "../../validators/index"
import * as moment from 'moment';
import { NgEzFileInputDirective, NgEzValidators } from '@ngez/core';

@Component({
    selector: 'upload-file-dialog',
    templateUrl: './upload-file-dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UploadFileDialog extends FormBase implements OnInit {
    isSubmitting$ = this.query.selectSubmitting();
    fileName = ''
    isLoadingDocument = false;
    private subscription: Subscription;
    maxDate = moment(new Date()).format('YYYY-MM-DD')
    @ViewChild(NgEzFileInputDirective, { static: true }) fileInput: NgEzFileInputDirective;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<UploadFileDialog>,
        private query: EnterpriseCreateQuery,
        private storeService: EnterpriseStoreService,
        private documentationStoreService: EnterpriseDocumentationStoreService,
        private activatedRoute: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) public data: { idFile: number, enterpriseId:number, description: string, admin: boolean, enterpriseStatus: EnterpriseStatus, isUpdate: true, comment: string }
    ) {
        super()
        this.form = formBuilder.group({
            expeditionDate: [null, [Validators.required, isValidDate]],
            explanation: [null, Validators.maxLength(500)],
            file: [null, [Validators.required, NgEzValidators.fileType('.pdf')]],
        })
    }
    
    ngOnInit(): void {
        this.subscription = this.form.get("file").valueChanges.subscribe((value) =>{
            this.form.get("explanation").disable();
            this.fileName = value ? value.name : '';
            this.form.get("explanation").enable();
        });
        this.form.get("explanation").patchValue(this.data.comment)
    }

    onSubmit(): void {
        if (!this.form.valid) return;
        this.onUploadFile()
    }

    onUploadFile() {
        this.isLoadingDocument = true;
        if(this.data.enterpriseId)
            this.documentationStoreService
                .uploadFile(
                    this.data.enterpriseId,
                    this.data.idFile, 
                    this.form.get("file").value,
                    this.form.get("explanation").value,
                    this.form.get("expeditionDate").value,
                    this.data.isUpdate
                )
                .subscribe(
                    () => { 
                        this.dialogRef.close() 
                        this.isLoadingDocument = false;
                    },
                    (error) => {
                        this.isLoadingDocument = false;
                    }
                );
        else
            this.documentationStoreService
                .uploadFileEnterprise(
                    this.data.idFile, 
                    this.form.get("file").value,
                    this.form.get("explanation").value,
                    this.form.get("expeditionDate").value,
                    this.data.isUpdate
                )
                .subscribe(
                    () => { 
                        this.dialogRef.close() 
                        this.isLoadingDocument = false;
                    },
                    (error) => {
                        this.isLoadingDocument = false;
                    }
                );
    }
    
}