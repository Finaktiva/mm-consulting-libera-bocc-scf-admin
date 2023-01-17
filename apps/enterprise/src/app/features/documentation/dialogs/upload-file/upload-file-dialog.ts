import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { EnterpriseCreateQuery, EnterpriseDocumentationStoreService, EnterpriseStoreService } from '@libera/state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';
import { Subscription } from 'rxjs';
import { DocumentationFilePayload } from '@libera/models/enterprise';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'upload-file-dialog',
    templateUrl: './upload-file-dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UploadFileDialog extends FormBase implements OnInit {
    isSubmitting$ = this.query.selectSubmitting();
    private subscription: Subscription;
    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<UploadFileDialog>,
        private query: EnterpriseCreateQuery,
        private storeService: EnterpriseStoreService,
        private documentationStoreService: EnterpriseDocumentationStoreService,
        private activatedRoute: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) private data: { idFile: number }
    ) {
        super()
        this.form = formBuilder.group({
            expeditionDate: [null, Validators.required],
            comments: [null, Validators.required],
            file: [null, Validators.required],
        })
    }
    
    ngOnInit(): void {
        this.subscription = this.form.valueChanges.subscribe(() => {
            const file = this.form.get("file").value
            const { idFile } = this.data;
            this.onUploadFile({ file, id:Number(idFile) })
        });
    }

    onUploadFile({ id, file }: DocumentationFilePayload) {
        this.documentationStoreService
            .uploadFile(this.getParamId(), id, file, '', '')
            .subscribe();
    }

    private getParamId(): number {
        return parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    }

}