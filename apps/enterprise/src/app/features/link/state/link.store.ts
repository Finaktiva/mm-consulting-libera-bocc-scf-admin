import { Injectable } from '@angular/core';
import { EnterpriseProviderTokenStatus, EnterpriseProviderTokenVerification } from '@libera/models/enterprise';
import { Store, StoreState, SubmitStoreState } from '@mediomelon/ng-core';
import produce from 'immer';

export interface LinkUI {
    confirm: SubmitStoreState;
}

const initialState: StoreState<EnterpriseProviderTokenVerification, LinkUI> = {
    loaded: false,
    loading: false,
    error: null,
    state: null,
    ui: {
        confirm: {
            submitting: false,
            error: null,
        },
    },
};

@Injectable({
    providedIn: 'root',
})
export class LinkStore extends Store<
    EnterpriseProviderTokenVerification,
    LinkUI
> {
    constructor() {
        super(initialState);
    }

    confirm() {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.ui.confirm.submitting = true;
            draft.ui.confirm.error = null;
        });

        this.setState(newState);
    }

    confirmSuccess() {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.ui.confirm.submitting = false;
        });

        this.setState(newState);
    }

    confirmError(payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.ui.confirm.submitting = false;
            draft.ui.confirm.error = payload;
        });

        this.setState(newState);
    }
}
