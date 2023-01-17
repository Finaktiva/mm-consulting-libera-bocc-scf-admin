import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ONLY_NUMBER_REGEX } from '@libera/constants';
import { EnterpriseBasicInfo } from '@libera/models/enterprise';

@Component({
    selector: 'sales-table',
    templateUrl: './sales-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesTableComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { entities: EnterpriseBasicInfo[] },
        ) {}

    displayedColumns: string[] = [
        'enterpriseName',
        'sale',
        'salesCut',
    ];

    formatSaleCut(salesCut){
        return salesCut.match(ONLY_NUMBER_REGEX).join('').slice(0,6);
    }
}
