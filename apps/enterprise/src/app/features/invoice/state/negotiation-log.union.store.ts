import { Injectable } from '@angular/core';
import { NegotiationLog } from '@libera/models/shared';
import { UIState } from '@mediomelon/ng-core';
import produce from 'immer';
import { BehaviorSubject, Observable } from 'rxjs';

interface State {
    entities: {
        [id: number]: {
            id: number;
            logs: NegotiationLog[];
        };
    };
    uiEntities: {
        [id: number]: UIState;
    };
}

const initialState: State = {
    entities: {},
    uiEntities: {},
};

@Injectable({
    providedIn: 'root',
})
export class NegotiationLogUnionStore {
    private _state$ = new BehaviorSubject<State>(initialState);

    state$: Observable<State> = this._state$.asObservable();

    fetch(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id] || this.createInitialUIState();

            entity.loading = true;
            entity.error = null;

            uiEntities[id] = entity;
        });

        this.setState(newState);
    }

    fetchSuccess(id: number, payload: NegotiationLog[]) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { entities, uiEntities } = draft;
            const entity = entities[id] || this.createInitialState();
            entity.id = id;
            entity.logs = payload;

            entities[id] = entity;

            const uiEntity = uiEntities[id];

            uiEntity.loaded = true;
            uiEntity.loading = false;
        });

        this.setState(newState);
    }

    fetchError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.loading = true;
            entity.error = payload;
        });

        this.setState(newState);
    }

    createInitialState(): {
        id: number;
        logs: NegotiationLog[];
    } {
        return {
            id: null,
            logs: [],
        };
    }

    createInitialUIState(): UIState {
        return {
            error: null,
            loaded: false,
            loading: false,
        };
    }

    getState(): State {
        return this._state$.getValue();
    }

    setState(payload: State) {
        this._state$.next(payload);
    }
}
