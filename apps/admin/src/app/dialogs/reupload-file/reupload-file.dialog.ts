import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnterpriseDocumentationQuery, EnterpriseDocumentationStoreService } from '@libera/state';

@Component({
    selector: 'reupload-file',
    templateUrl: './reupload-file.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReuploadFileDialog {
    isSubmitting$ = this.query.selectUpdating(this.data.id);

    constructor(
        private dialogRef: MatDialogRef<ReuploadFileDialog>,
        @Inject(MAT_DIALOG_DATA)
        private data: { id: number; enterpriseId: number; expeditionDate: string },
        private query: EnterpriseDocumentationQuery,
        private documentationStoreService: EnterpriseDocumentationStoreService
    ) {}

    onSubmit(explanation: string) {
        const { id, enterpriseId, expeditionDate } = this.data;

        this.documentationStoreService
            .changeStatus(enterpriseId, id, {
                explanation,
                status: 'RELOAD_FILE',
                expeditionDate: expeditionDate,
            })
            .subscribe(() => this.dialogRef.close());
    }
}
