import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CustomAttributeQuery } from '../../state/custom-attribute.query';
import { CustomAttributeStoreService } from '../../state/custom-attribute.store.service';

@Component({
    selector: 'custom-attribute-confirm-delete',
    templateUrl: './custom-attribute-confirm-delete.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAttributeConfirmDeleteDialog {
    isSubmitting$ = this.query.selectUIEntityDeleting(this.data.id);

    isChecked: boolean = false;

    constructor(
        private dialogRef: MatDialogRef<CustomAttributeConfirmDeleteDialog>,
        private query: CustomAttributeQuery,
        private storeService: CustomAttributeStoreService,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {}

    onSubmit() {
        this.storeService
            .delete(this.data.id)
            .subscribe(() => this.dialogRef.close());
    }
}
