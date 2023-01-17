import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { FundingRequestLog } from '@libera/models/lender';
import { PayerInvoiceStoreService } from '../../state/payer-invoice.store.service';
import { FundingRequestLogUnionQuery } from '../../state/funding-request-log.union.query';

@Component({
  selector: 'funding-request-log-panel',
  templateUrl: './funding-request-log-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FundingRequestLogPanelComponent implements OnInit {

  @Input() invoiceId: number;
  @Input() requestId: number;
  hasLoaded$: Observable<boolean>;

  isLoading$: Observable<boolean>;

  error$: Observable<any>;

  logs$: Observable<FundingRequestLog[]>;

  constructor(
    private storeService: PayerInvoiceStoreService,
    private query: FundingRequestLogUnionQuery
  ) { }

  ngOnInit() {

    this.storeService.fetchFundingRequestLogs(this.invoiceId, this.requestId).subscribe();

    this.hasLoaded$ = this.query.selectUIEntityLoaded(this.requestId);
    this.isLoading$ = this.query.selectUIEntityLoading(this.requestId);
    this.error$ = this.query.selectUIEntityError(this.requestId);
    this.logs$ = this.query.selectEntityLogs(this.requestId);
  }

}
