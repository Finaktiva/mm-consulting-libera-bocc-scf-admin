import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BankRegions } from '@libera/models/catalog';
import { EnterpriseCreateQuery, EnterpriseStoreService } from '@libera/state';

@Component({
    selector: 'libera-create-program-dialog',
    templateUrl: './create-program.dialog.html',
    styleUrls: ['./create-program.dialog.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProgramDialog {
    isSubmitting$ = this.query.selectSubmitting();
    actionName = "Crear registro"
    constructor(
        private dialogRef: MatDialogRef<CreateProgramDialog>,
        private query: EnterpriseCreateQuery,
        private storeService: EnterpriseStoreService,
        @Inject(MAT_DIALOG_DATA) public data: { bankRegions: BankRegions[] },
    ) {}

    setActionName (value:string) {
        this.actionName = value;
    }
}
