import { Injectable } from '@angular/core';
import { EntityQuery } from '@mediomelon/ng-core';
import {
    PaymentRequestStore,
    InvoicePaymentRequestUI,
} from './payment-request.store';
import { ProviderPayment } from '@libera/models/provider';

@Injectable({ providedIn: 'root' })
export class PaymentRequestQuery extends EntityQuery<
    ProviderPayment,
    InvoicePaymentRequestUI
> {
    constructor(private store: PaymentRequestStore) {
        super(store);
    }

    shouldFetch(id: number) {
        return this.getUIEntityError(id) || !this.getUIEntityLoaded(id);
    }
}
