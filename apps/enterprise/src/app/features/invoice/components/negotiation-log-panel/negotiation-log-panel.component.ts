import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NegotiationLog } from '@libera/models/shared';
import { Observable } from 'rxjs';

import { NegotiationLogUnionQuery } from '../../state/negotiation-log.union.query';
import { PayerInvoiceStoreService } from '../../state/payer-invoice.store.service';

@Component({
    selector: 'negotiation-log-panel',
    templateUrl: './negotiation-log-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NegotiationLogPanelComponent implements OnInit {
    @Input() negotiationId: number;

    @Input() invoiceId: number;

    hasLoaded$: Observable<boolean>;

    isLoading$: Observable<boolean>;

    error$: Observable<any>;

    logs$: Observable<NegotiationLog[]>;

    constructor(
        private storeService: PayerInvoiceStoreService,
        private query: NegotiationLogUnionQuery
    ) {}

    ngOnInit() {
        this.fetch();

        this.hasLoaded$ = this.query.selectUIEntityLoaded(this.negotiationId);

        this.isLoading$ = this.query.selectUIEntityLoading(this.negotiationId);

        this.error$ = this.query.selectUIEntityError(this.negotiationId);

        this.logs$ = this.query.selectEntityLogs(this.negotiationId);
    }

    fetch() {
        this.storeService
            .fetchNegotiationLogs(this.negotiationId, this.invoiceId)
            .subscribe();
    }
}
