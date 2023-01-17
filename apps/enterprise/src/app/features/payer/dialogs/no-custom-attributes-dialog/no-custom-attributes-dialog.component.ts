import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'no-custom-attributes-dialog',
    templateUrl: './no-custom-attributes-dialog.component.html',
    styles: [],
})
export class NoCustomAttributesDialogComponent {
    constructor(private dialogRef: MatDialogRef<any>) {}

    onClose() {
        this.dialogRef.close();
    }
}
