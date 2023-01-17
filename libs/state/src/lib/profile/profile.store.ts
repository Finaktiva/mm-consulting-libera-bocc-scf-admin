import { Injectable } from '@angular/core';
import { Profile } from '@libera/models/profile';
import { Store, StoreState, SubmitStoreState } from '@mediomelon/ng-core';
import produce from 'immer';

export interface ProfileUI {
    update: SubmitStoreState;
}

const initialState: StoreState<Profile, ProfileUI> = {
    loaded: false,
    loading: false,
    error: null,
    state: null,
    ui: {
        update: {
            submitting: false,
            error: null,
        },
    },
};

@Injectable({
    providedIn: 'root',
})
export class ProfileStore extends Store<Profile, ProfileUI> {
    constructor() {
        super(initialState);
    }

    update() {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.ui.update.submitting = true;
            draft.ui.update.error = null;
        });

        this.setState(newState);
    }

    updateSuccess(payload: Profile) {
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
