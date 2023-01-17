import { Component, Input } from '@angular/core';
import { ENTERPRISE_TYPE } from '@libera/models/enterprise';
import { PayerWithUI } from '../../state/payer.query';

@Component({
    selector: 'payer-table',
    templateUrl: './payer-table.component.html',
    styleUrls: ['./payer-table.component.scss'],
})
export class PayerTableComponent {
    @Input() entities: PayerWithUI[];

    ENTERPRISE_TYPE = ENTERPRISE_TYPE;

    displayedColumns = ['enterpriseName', 'nit', 'sector', 'enterpriseType'];
}
