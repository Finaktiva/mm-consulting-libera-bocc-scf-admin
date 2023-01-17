import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { EnterpriseCreateQuery, EnterpriseDocumentationStoreService, EnterpriseStoreService } from '@libera/state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';
import { SafeResourceUrl, DomSanitizer  } from '@angular/platform-browser';
import { ChangeDocumentationStatus } from '@libera/models/enterprise';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'approve-document-dialog',
    templateUrl: './approve-document-dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ApproveDocumentDialog extends FormBase implements OnInit {
    isSubmitting$ = this.query.selectSubmitting();
    url: SafeResourceUrl;
    actionName = this.data.action;
    isLoadingDocument = false;
    maxDate = moment(new Date()).format('YYYY-MM-DD')
    date: string;
    enterpriseId: number;
    action: ChangeDocumentationStatus;
    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ApproveDocumentDialog>,
        private query: EnterpriseCreateQuery,
        private storeService: EnterpriseStoreService,
        public sanitizer: DomSanitizer,
        private documentationStoreService: EnterpriseDocumentationStoreService,
        private activatedRoute: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) public data: { enterpriseId: number, idFile: number, action:'accept' | 'decline', file:string, description: string, date: Date, comment: string }
    ) {
        super()
        this.form = formBuilder.group({
            expeditionDate: [null, Validators.required],
            explanation: [null, [Validators.required, Validators.maxLength(500)]],
        })
    }
    
    ngOnInit(): void {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.file);
        this.enterpriseId = this.getParamId();
        this.action = this.data.action === 'accept' ? 'ACCEPTED' : 'REJECTED'
        if(this.action == 'ACCEPTED'){
            this.form.get('explanation').clearValidators();
            this.form.get('explanation').updateValueAndValidity();
        }
        this.date = moment(this.data.date).add(1,'d').format('YYYY-MM-DD');
        this.form.get('expeditionDate').patchValue(this.date);
        this.form.get("explanation").patchValue(this.data.comment);
    }

    onSubmit () {        
        this.onChangeDocumentationStatus()
    }

    onChangeDocumentationStatus () {
        this.isLoadingDocument = true
        if (!this.form.valid) {
            this.isLoadingDocument = false
            return;
        }
        const date = this.form.get("expeditionDate").value;
        const explanation = this.form.get("explanation").value;
        this.documentationStoreService
            .changeStatus(this.data.enterpriseId, this.data.idFile, {
                status: this.action,
                explanation: explanation ? explanation : '',
                expeditionDate: date,
            })
            .subscribe(
                () => { this.dialogRef.close(); this.isLoadingDocument = false }
            );
    }

    private getParamId(): number {
        return parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    }
}
