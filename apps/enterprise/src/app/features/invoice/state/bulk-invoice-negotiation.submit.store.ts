import { Injectable } from '@angular/core';
import { SubmitStore, SubmitStoreState } from '@mediomelon/ng-core';

const intialState: SubmitStoreState = {
    submitting: false,
    error: null,
};

@Injectable({
    providedIn: 'root',
})
export class BulkInvoiceNegotiationSubmitStore extends SubmitStore {
    constructor() {
        super(intialState);
    }
}
