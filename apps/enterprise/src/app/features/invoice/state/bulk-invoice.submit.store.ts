import { Injectable } from '@angular/core';
import { SubmitStore, SubmitStoreState } from '@mediomelon/ng-core';

const initialState: SubmitStoreState = {
    error: null,
    submitting: false,
};

@Injectable({
    providedIn: 'root',
})
export class BulkInvoiceSubmitStore extends SubmitStore {
    constructor() {
        super(initialState);
    }
}
