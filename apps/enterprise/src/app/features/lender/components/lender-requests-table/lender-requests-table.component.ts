import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {
    LENDER_QUOTA_REQUEST_RATE,
    LENDER_QUOTA_REQUEST_STATUS,
    LENDER_QUOTA_REQUEST_TYPE,
} from '@libera/models/lender-quota-request';
import { LenderQuotaRequestWithUI } from '../../state/lender-requests.store';

@Component({
    selector: 'lender-requests-table',
    templateUrl: './lender-requests-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*', padding: '10px 0' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            ),
        ]),
    ],
    styleUrls: ['./lender-requests-table.component.scss'],
})
export class LenderRequestsTableComponent implements OnInit {
    @Input() entities: LenderQuotaRequestWithUI[];

    @Output() updateStatus = new EventEmitter();

    LENDER_QUOTA_REQUEST_TYPE = LENDER_QUOTA_REQUEST_TYPE;
    LENDER_QUOTA_REQUEST_STATUS = LENDER_QUOTA_REQUEST_STATUS;
    LENDER_QUOTA_REQUEST_RATE = LENDER_QUOTA_REQUEST_RATE;

    expandedEntityId: number | null;

    displayedColumns: string[] = [
        'lender',
        'nit',
        'requestedQuota',
        'grantedQuota',
        'rateType',
        'rate',
        'creationDate',
        'requestType',
        'payerComments',
        'lenderComments',
        'status',
    ];

    constructor() {}

    ngOnInit() {}

    onAccept(id: number) {
        this.updateStatus.emit({
            id,
            status: LENDER_QUOTA_REQUEST_STATUS.APPROVED,
        });
    }

    onReject(id: number) {
        this.updateStatus.emit({
            id,
            status: LENDER_QUOTA_REQUEST_STATUS.REJECTED,
        });
    }

    onSelectRow(entityId: number) {
        if (entityId == this.expandedEntityId) {
            this.expandedEntityId = null;
        } else {
            this.expandedEntityId = entityId;
        }
    }
}
