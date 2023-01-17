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
    Output,
} from '@angular/core';
import {
    LENDER_QUOTA_REQUEST_RATE,
    LENDER_QUOTA_REQUEST_STATUS,
    LENDER_QUOTA_REQUEST_TYPE,
    LenderQuotaRequestPayload,
} from '@libera/models/lender-quota-request';

import { LenderQuotaRequestWithUI } from '../../state/lender-quota-request.query';

@Component({
    selector: 'lender-quota-request-table',
    templateUrl: './lender-quota-request-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./lender-quota-request-table.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            ),
        ]),
    ],
})
export class LenderQuotaRequestTableComponent {
    @Input() entities: LenderQuotaRequestWithUI[];

    @Output() toggle = new EventEmitter<number>();

    @Output() assign = new EventEmitter();

    @Output() reject = new EventEmitter<number>();

    @Output() update = new EventEmitter();

    displayedColumns: string[] = [
        'payer',
        'nit',
        'requestedQuota',
        'creationDate',
        'requestType',
        'comment',
        'status',
    ];

    LENDER_QUOTA_REQUEST_STATUS = LENDER_QUOTA_REQUEST_STATUS;

    LENDER_QUOTA_REQUEST_TYPE = LENDER_QUOTA_REQUEST_TYPE;

    LENDER_QUOTA_REQUEST_RATE = LENDER_QUOTA_REQUEST_RATE;

    expandedEntity: LenderQuotaRequestWithUI = null;

    onToggle(entity: LenderQuotaRequestWithUI) {
        const { id, status } = entity.state;
        if (status == 'APPROVED' || status == 'REJECTED') return;

        this.toggle.emit(id);
    }

    onAssign(id: number, payload: LenderQuotaRequestPayload) {
        this.assign.emit({ id, payload });
    }

    onReject(id: number) {
        this.reject.emit(id);
    }

    onSubmit(id: number, payload: LenderQuotaRequestPayload) {
        this.update.emit({ id, payload });
    }

    trackBy(index: number, item: LenderQuotaRequestWithUI) {
        return item ? item.state.id : undefined;
    }
}
