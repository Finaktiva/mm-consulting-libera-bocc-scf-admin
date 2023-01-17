import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdjustmentRequestPayload } from '@libera/models/lender';
import { Observable } from 'rxjs';
import { LinkedLenderQuery } from '../../state/linked-lender.query';
import { LinkedLenderStoreService } from '../../state/linked-lender.store.service';

@Component({
    selector: 'update-quota-dialog',
    templateUrl: './update-quota-dialog.component.html',
})
export class UpdateQuotaDialogComponent implements OnInit {
    isSubmitting$: Observable<
        boolean
    > = this.linkedLenderQuery.selectRequestingState(this.data.id);

    constructor(
        public dialogRef: MatDialogRef<any>,
        private linkedLenderQuery: LinkedLenderQuery,
        private linkedLenderStoreService: LinkedLenderStoreService,
        @Inject(MAT_DIALOG_DATA) private data: { id: any }
    ) {}

    ngOnInit() {}

    onSubmit(payload: AdjustmentRequestPayload) {
        this.linkedLenderStoreService
            .requestQuotaAdjustment(this.data.id, payload)
            .subscribe(() => this.dialogRef.close());
    }
}
