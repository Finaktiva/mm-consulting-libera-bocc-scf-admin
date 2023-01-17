import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BasicFinancialPlan, Enterprise } from '@libera/models/enterprise';
import { DetailFinancialConditionsDialog } from '../../dialogs/detail-financial-conditions-dialog/detail-financial-conditions.dialog';

@Component({
    selector: 'financial-conditions-table',
    templateUrl: './financial-conditions-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialConditionsTableComponent {
    @Input() entities: BasicFinancialPlan[];

    constructor(
        private dialog: MatDialog,
    ) { }

    displayedColumns: string[] = [
        'provider',
        'identification_number',
        'modality',
        'description',
        'summary',
        'status',
    ];

    showDetail(id: number, status: string){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { planId: id, status }
        const dialogRef = this.dialog.open(DetailFinancialConditionsDialog, dialogConfig);
        dialogRef.afterClosed().subscribe();
    }
}
