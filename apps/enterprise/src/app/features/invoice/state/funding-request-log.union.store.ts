import { Injectable } from '@angular/core';
import { FundingRequestLog } from '@libera/models/lender';
import { UIState } from '@mediomelon/ng-core';
import { BehaviorSubject, Observable } from 'rxjs';
import produce from 'immer';

interface State {
  entities: {
    [id: number]: {
      id: number;
      logs: FundingRequestLog[];
    };
  };
  uiEntities: {
    [id: number]: UIState;
  };
}

const initialState: State = {
  entities: {},
  uiEntities: {}
}

@Injectable({
  providedIn: 'root',
})

export class FundingRequestLogUnionStore {
  private _state$ = new BehaviorSubject<State>(initialState);

  state$: Observable<State> = this._state$.asObservable();

  createInitialState(): {
    id: number;
    logs: FundingRequestLog[];
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

  fetchSuccess(id: number, payload: FundingRequestLog[]) {
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
}