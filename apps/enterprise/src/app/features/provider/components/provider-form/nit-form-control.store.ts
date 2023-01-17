import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface State {
    loaded: boolean;
    loading: boolean;
    error: any;
}

const initialState: State = {
    loaded: false,
    loading: false,
    error: null,
};

@Injectable()
export class NitFormControlStore {
    private _state$ = new BehaviorSubject<State>(initialState);

    state$ = this._state$.asObservable();

    fetch() {
        const state: State = {
            loaded: false,
            loading: true,
            error: null,
        };

        this.setState(state);
    }

    fetchSuccess() {
        const state = this.getState();

        this.setState({ ...state, loaded: true, loading: false });
    }

    fetchError(payload: any) {
        const state = this.getState();

        this.setState({ ...state, loading: false, error: payload });
    }

    getState(): State {
        return this._state$.getValue();
    }

    private setState(state: State) {
        this._state$.next(state);
    }
}
