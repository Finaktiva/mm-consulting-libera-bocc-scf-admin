import { Injectable } from '@angular/core';
import {
    SubmitStoreState,
    UIState,
    EntityStore,
    EntityStoreState,
} from '@mediomelon/ng-core';
import { ProviderPayment } from '@libera/models/provider';
export interface InvoicePaymentRequestUI extends UIState {
    paymentRequest: SubmitStoreState;
}

const initialState: EntityStoreState<
    ProviderPayment,
    InvoicePaymentRequestUI
> = {
    entities: {},
    error: null,
    ids: [],
    loaded: false,
    loading: false,
    uiEntities: {},
};

@Injectable({
    providedIn: 'root',
})
export class PaymentRequestStore extends EntityStore<
    ProviderPayment,
    InvoicePaymentRequestUI
> {
    constructor() {
        super(initialState);
    }

    createInitialUIState(): InvoicePaymentRequestUI {
        return {
            loaded: false,
            loading: false,
            error: null,
            paymentRequest: {
                error: null,
                submitting: false,
            },
        };
    }
}
