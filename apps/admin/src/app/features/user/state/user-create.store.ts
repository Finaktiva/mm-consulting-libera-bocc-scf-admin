import { Injectable } from '@angular/core';
import produce from 'immer';
import { BehaviorSubject } from 'rxjs';

interface State {
    submitting: boolean;
    error: any;
}

const initialState: State = {
    submitting: false,
    error: null,
};

@Injectable({
    providedIn: 'root',
})
export class UserCreateStore {
    private _state$ = new BehaviorSubject<State>(initialState);

    state = this._state$.asObservable();

    submit() {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.submitting = true;
            draft.error = null;
        });

        this.setState(newState);
    }

    submitSuccess() {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.submitting = false;
        });

        this.setState(newState);
    }

    submitError(error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            draft.submitting = false;
            draft.error = error;
        });

        this.setState(newState);
    }

    getState() {
        return this._state$.getValue();
    }

    private setState(state: State) {
        this._state$.next(state);
    }
}
