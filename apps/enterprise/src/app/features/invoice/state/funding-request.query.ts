import { Injectable } from "@angular/core";
import { EntityQuery } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { FundingRequestStore, InvoiceFundingRequestUI } from './funding-request.store';
import { LenderInvoiceFundingRequest, LenderInvoiceStatus, LenderFundingRequest } from '@libera/models/lender';

@Injectable({
  providedIn: 'root',
})

export class FundingRequestQuery extends EntityQuery<
LenderFundingRequest,
InvoiceFundingRequestUI
>{
  constructor(private store: FundingRequestStore) {
    super(store);
  }

  selectEntitiesMap() {
    return super.selectEntitiesMap();
  }

  selectEntityFundingRequest(id: number): Observable<boolean> {
    return this.selectUIEntity(id).pipe(
      select(entity => (entity ? entity.fundingRequest.submitting : false))
    );
  }

  selectEntityStatus(id: number): Observable<LenderInvoiceStatus> {
    return this.selectEntity(id).pipe(
      select(entity => (entity ? entity.status : null))
    );
  }
}