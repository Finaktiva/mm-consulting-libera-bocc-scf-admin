import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomAttributesQuery } from '../../state/custom-attributes.query';
import { CustomAttributesStoreService } from '../../state/custom-attributes.store.service';

@Component({
    selector: 'confirm-delete-custom-attribute-dialog',
    templateUrl: './confirm-delete-custom-attribute-dialog.component.html',
    styles: [],
})
export class ConfirmDeleteCustomAttributeDialogComponent implements OnInit {
    isSubmitting$: Observable<boolean> = this.query.selectUIEntityDeleting(
        this.data.id
    );

    isConfirmed: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: { id: number },
        private query: CustomAttributesQuery,
        private storeService: CustomAttributesStoreService,
        private dialogRef: MatDialogRef<any>
    ) {}

    ngOnInit() {}

    onSubmit() {
        this.storeService
            .deleteCustomAttribute(this.data.id)
            .subscribe(() => this.dialogRef.close());
    }
}
