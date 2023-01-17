import { Injectable } from "@angular/core";
import { LenderFundingRequest } from '@libera/models/lender';
import { EntityStore, EntityStoreState, SubmitStoreState, UIState } from '@mediomelon/ng-core';
import produce from 'immer';
export interface InvoiceFundingRequestUI extends UIState {
  fundingRequest: SubmitStoreState;
}

const initialState: EntityStoreState<
  LenderFundingRequest,
  InvoiceFundingRequestUI>
  = {
  entities: {},
  error: null,
  ids: [],
  loaded: false,
  loading: false,
  uiEntities: {},
};

@Injectable({
  providedIn: 'root'
})

export class FundingRequestStore extends EntityStore<
LenderFundingRequest,
InvoiceFundingRequestUI
>{
  constructor() {
    super(initialState);
  }

  createInitialUIState(): InvoiceFundingRequestUI {
    return {
      loaded: false,
      loading: false,
      error: null,
      fundingRequest: {
        error: null,
        submitting: false,
      },
    };
  }

  fundingRequest(id: number) {
    this.setState(initialState);

    const state = this.getState();

    const newState = produce(state, draft => {
      const { uiEntities } = draft;
      const uiEntity = uiEntities[id];

      uiEntity.fundingRequest.submitting = true;
      uiEntity.fundingRequest.error = null;
    });

    this.setState(newState);
  }

  fundingRequestSuccess(id: number) {
    const state = this.getState();
    const newState = produce(state, draft => {
      const { uiEntities } = draft;
      const uiEntity = uiEntities[id];

      uiEntity.fundingRequest.submitting = false;
    });
    this.setState(newState);
  }

  fundingRequestError(id: number, payload: any) {
    const state = this.getState();

    const newState = produce(state, draft => {
      const { uiEntities } = draft;
      const uiEntity = uiEntities[id];

      uiEntity.fundingRequest.submitting = false;
      uiEntity.fundingRequest.error = payload;
    });
    this.setState(newState);
  }
}