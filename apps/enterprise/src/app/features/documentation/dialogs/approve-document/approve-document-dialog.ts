import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { EnterpriseCreateQuery, EnterpriseDocumentationStoreService, EnterpriseStoreService } from '@libera/state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';
import { SafeResourceUrl, DomSanitizer  } from '@angular/platform-browser';
import { ChangeDocumentationStatus } from '@libera/models/enterprise';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'approve-document-dialog',
    templateUrl: './approve-document-dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ApproveDocumentDialog extends FormBase implements OnInit {
    isSubmitting$ = this.query.selectSubmitting();
    url: SafeResourceUrl;
    actionName = this.data.action;
    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ApproveDocumentDialog>,
        private query: EnterpriseCreateQuery,
        private storeService: EnterpriseStoreService,
        public sanitizer: DomSanitizer,
        private documentationStoreService: EnterpriseDocumentationStoreService,
        private activatedRoute: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) private data: { idFile: number, action:'accept' | 'decline', file:string }
    ) {
        super()
        this.form = formBuilder.group({
            date: [null, Validators.required],
            comments: [null, Validators.required],
        })
    }
    
    ngOnInit(): void {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.file);
    }

    onChangeDocumentationStatus () {
        if (!this.form.valid) return;
        const action = this.data.action === 'accept' ? 'ACCEPTED' : 'REJECTED'
        const enterpriseId = this.getParamId();
        const comments = this.form.get("comments").value;
        const date = this.form.get("date").value;
        this.documentationStoreService
            .changeStatus(enterpriseId, this.data.idFile, {
                status: action,
                explanation: comments,
                expeditionDate: date
            })
            .subscribe();
    }

    private getParamId(): number {
        return parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    }
}
