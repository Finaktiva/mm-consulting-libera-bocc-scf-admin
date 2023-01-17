import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnterpriseQuery, EnterpriseStoreService } from '@libera/state';

@Component({
    selector: 'accept-program-dialog',
    templateUrl: './accept-program-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcceptProgramDialogComponent {
    isSubmitting$ = this.query.selectEntityUpdatingStatus(this.data.id);

    constructor(
        public dialogRef: MatDialogRef<AcceptProgramDialogComponent>,
        private query: EnterpriseQuery,
        private storeService: EnterpriseStoreService,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {}

    onSubmit() {
        this.storeService
            .updateStatus(this.data.id, {
                explanation: null,
                status: 'ENABLED',
                expeditionDate: null
            })
            .subscribe(() => this.dialogRef.close());
    }
}
