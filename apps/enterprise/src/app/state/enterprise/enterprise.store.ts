import { Injectable } from '@angular/core';
import { Enterprise } from '@libera/models/enterprise';
import { Store, StoreState, SubmitStoreState } from '@mediomelon/ng-core';
import produce from 'immer';

export interface EnterpriseUI {
    update: SubmitStoreState;
    request: SubmitStoreState;
}

const initialState: StoreState<Enterprise, EnterpriseUI> = {
    loaded: false,
    loading: false,
    error: null,
    state: null,
    ui: {
        update: {
            submitting: false,
            error: null,
        },
        request: {
            submitting: false,
            error: null,
        },
    },
};

@Injectable({
    providedIn: 'root',
})
export class EnterpriseStore extends Store<Enterprise, EnterpriseUI> {
    constructor() {
        super(initialState);
    }

    request() {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.ui.request.submitting = true;
            draft.ui.request.error = null;
        });

        this.setState(newState);
    }

    requestSuccess() {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.ui.request.submitting = false;
            draft.state.status = 'EVALUATION_PENDING';
        });

        this.setState(newState);
    }

    requestError(payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.ui.request.submitting = false;
            draft.ui.request.error = payload;
        });

        this.setState(newState);
    }

    update() {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.ui.update.submitting = true;
            draft.ui.update.error = null;
        });

        this.setState(newState);
    }

    updateSuccess(payload: Enterprise) {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.ui.update.submitting = false;
            draft.state = { ...draft.state, ...payload };
        });

        this.setState(newState);
    }

    updateError(payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.ui.update.submitting = false;
            draft.ui.update.error = payload;
        });

        this.setState(newState);
    }
}
