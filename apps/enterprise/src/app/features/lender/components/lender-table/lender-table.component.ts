import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuotaRequestDialog } from '../../dialogs/quota-request/quota-request.dialog';
import { LenderWithUI } from '../../state/lender.query';

@Component({
    selector: 'lender-table',
    templateUrl: './lender-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LenderTableComponent {
    @Input() entities: LenderWithUI[];

    constructor(private dialog: MatDialog) {}
    displayedColumns: string[] = [
        'enterpriseName',
        'nit',
        'fullName',
        'email',
        'actions',
    ];
    onOpenQuotaRequestDialog(id: number) {
        return this.dialog.open(QuotaRequestDialog, { data: { id } });
    }
}
