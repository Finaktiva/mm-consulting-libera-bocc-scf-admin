import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UserQuery } from '../../state/user.query';
import { UserStoreService } from '../../state/user.store.service';

@Component({
    selector: 'delete-user-dialog',
    templateUrl: './delete-user.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteUserDialog {
    isSubmitting$ = this.query.selectEntityDeleting(this.data.id);

    isSure: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: { id: number },
        private storeService: UserStoreService,
        private query: UserQuery,
        private dialogRef: MatDialogRef<DeleteUserDialog>
    ) {}

    onSubmit() {
        this.storeService
            .delete(this.data.id)
            .subscribe(() => this.dialogRef.close());
    }
}
