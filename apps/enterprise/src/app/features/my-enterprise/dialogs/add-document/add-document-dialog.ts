import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { AuthenticationQuery, EnterpriseCreateQuery, EnterpriseDocumentationQuery, EnterpriseDocumentationStoreService, EnterpriseStoreService } from '@libera/state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { DocumentType } from '@libera/models/catalog';

@Component({
    selector: 'add-document-dialog',
    templateUrl: './add-document-dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AddDocumentDialog extends FormBase implements OnInit {
    enterpriseId = this.authenticationQuery.getEnterpriseId();
    isSubmitting$ = this.query.selectSubmitting();
    isLoading$ = this.documentationQuery.selectEntityLoading(this.enterpriseId);
    isShowEffectiveness = false;
    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<AddDocumentDialog>,
        private query: EnterpriseCreateQuery,
        private storeService: EnterpriseStoreService,
        private documentationStoreService: EnterpriseDocumentationStoreService,
        private documentationQuery: EnterpriseDocumentationQuery,
        private authenticationQuery: AuthenticationQuery,
        @Inject(MAT_DIALOG_DATA) public data: { entities: DocumentType[] }
    ) {
        super()
        this.form = formBuilder.group({
            documentType: [null, Validators.required],
            documentTypeDescription: [null, Validators.maxLength(100)],
            timeType: [{value: null, disabled: true}, Validators.required],
            effectiveness: [null, [Validators.maxLength(3), Validators.minLength(1)]],
            comment: [null, Validators.maxLength(500)],
        })
    }

    ngOnInit(): void {
    }
    
    closeModal () {
        this.dialogRef.close()
    }

    onSubmit(): void {
        if (!this.form.valid) return;
        this.documentationStoreService
            .saveNewDocumentEnterprise(this.form.getRawValue())
            .subscribe(() => this.dialogRef.close(true),
            (error) => this.dialogRef.close(false));
    }

    changeDocumentType (document) {
        this.form.get('effectiveness').enable();
        this.form.get('timeType').enable();
        this.isShowEffectiveness = false;
        this.resetValues();
        this.data.entities.forEach( doc =>{
            if (document == doc.code){
                let timeType = 'undefined';
                let effectiveness = '';
                if (doc.effectiveness) {
                    timeType = 'defined';
                    effectiveness = doc.effectiveness.toString();
                }
                this.form.get('timeType').patchValue(timeType);
                this.form.get('effectiveness').patchValue(effectiveness);
                this.changeTimeType({value: timeType})
                if(document != 'OTHER_DOCUMENTS'){
                    this.isShowEffectiveness = true;
                    this.form.get('effectiveness').disable();
                    this.form.get('timeType').disable();
                }
                return
            }
        })  
    }

    changeTimeType({ value }) {
        if (value === 'defined') this.form.get("effectiveness").setValidators([Validators.required]);
        else this.form.get("effectiveness").clearValidators();
        this.form.get("effectiveness").updateValueAndValidity();
    }

    validateTime (value:string) {
        if (
            value.charAt(value.length - 1) !== "1" &&
            value.charAt(value.length - 1) !== "2" &&
            value.charAt(value.length - 1) !== "3" &&
            value.charAt(value.length - 1) !== "4" &&
            value.charAt(value.length - 1) !== "5" &&
            value.charAt(value.length - 1) !== "6" &&
            value.charAt(value.length - 1) !== "7" &&
            value.charAt(value.length - 1) !== "8" &&
            value.charAt(value.length - 1) !== "9" &&
            value.charAt(value.length - 1) !== "0"
        ) this.form.get("validity").patchValue(value.slice(0, value.length - 1))
    }

    resetValues(){
        this.form.get('documentTypeDescription').patchValue('')
        this.form.get('timeType').patchValue('')
        this.form.get('effectiveness').patchValue('')
        this.form.get('comment').patchValue('')
        this.form.markAsUntouched();
    }
}