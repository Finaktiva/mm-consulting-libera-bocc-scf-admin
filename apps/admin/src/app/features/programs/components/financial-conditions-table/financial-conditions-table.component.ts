import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BasicFinancialPlan, Enterprise, ENTERPRISE_MODULES, ENTERPRISE_STATUS } from '@libera/models/enterprise';
import { DetailFinancialConditionsDialog } from '../../dialogs/detail-financial-conditions-dialog/detail-financial-conditions.dialog';

@Component({
    selector: 'financial-conditions-table',
    templateUrl: './financial-conditions-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialConditionsTableComponent {
    @Input() entities: BasicFinancialPlan[];
    @Input() detail: Enterprise;

    constructor(
        private dialog: MatDialog,
    ) { }

    displayedColumns: string[] = [
        'modality',
        'summary',
        'observation',
        'validity',
        'status',
        'comments',
    ];

    ENTERPRISE_STATUS = ENTERPRISE_STATUS;

    ENTERPRISE_MODULES = ENTERPRISE_MODULES;

    shouldRenderMenu({ status }: Enterprise) {
        return status ? true:false;
    }

    showDetail(id: number, status: string){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { payer: this.detail, planId: id, status }
        const dialogRef = this.dialog.open(DetailFinancialConditionsDialog, dialogConfig);
        dialogRef.afterClosed().subscribe();
    }
}
