import { Injectable } from '@angular/core';
import { SubmitStore, SubmitStoreState } from '@mediomelon/ng-core';

const initialState: SubmitStoreState = {
    submitting: false,
    error: null,
};

@Injectable({
    providedIn: 'root',
})
export class ProviderCreateStore extends SubmitStore {
    constructor() {
        super(initialState);
    }
}
