import { Injectable } from '@angular/core';
import { SubmitStore, SubmitStoreState } from '@mediomelon/ng-core';
import produce from 'immer';

export interface SelectLanguageState extends SubmitStoreState {
    create: SubmitStoreState;
    fetch: SubmitStoreState;
}

const initialState: SelectLanguageState = {
    error: null,
    submitting: false,
    create: {
        error: null,
        submitting: false,
    },
    fetch: {
        error: null,
        submitting: false,
    },
};

@Injectable({
    providedIn: 'root',
})
export class SelectLanguageStore extends SubmitStore<SelectLanguageState> {
    constructor() {
        super(initialState);
    }

    selectState() {
        return this.state$;
    }

    create() {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { create } = draft;

            create.submitting = true;
            create.error = null;
        });

        this.setState(newState);
    }

    createSuccess() {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { create } = draft;

            create.submitting = false;
        });

        this.setState(newState);
    }

    createError(error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { create } = draft;

            create.submitting = false;
            create.error = error;
        });

        this.setState(newState);
    }

    fetch() {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { fetch } = draft;

            fetch.submitting = true;
            fetch.error = null;
        });

        this.setState(newState);
    }

    fetchSuccess() {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { fetch } = draft;

            fetch.submitting = false;
        });

        this.setState(newState);
    }

    fetchError(error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { fetch } = draft;

            fetch.submitting = false;
            fetch.error = error;
        });

        this.setState(newState);
    }
}
