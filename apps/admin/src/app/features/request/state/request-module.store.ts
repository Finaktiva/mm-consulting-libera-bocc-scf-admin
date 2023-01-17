import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import {
    ChangeEnterpriseRequestStatusPayload,
    EnterpriseModuleRequest,
    EnterpriseRequestPaginationFilters,
} from '@libera/models/enterprise-request';
import { EntityListStore, EntityListStoreState, UIState } from '@mediomelon/ng-core';
import produce from 'immer';

const initialState: EntityListStoreState<
    EnterpriseModuleRequest,
    UIState,
    EnterpriseRequestPaginationFilters
> = {
    entities: {},
    error: null,
    ids: [],
    loaded: false,
    loading: false,
    pagination: {
        total: null,
        page: {
            index: 0,
            size: DEFAULT_PAGE_SIZE,
        },
        filters: {
            filter_by: null,
            q: null,
            status: null,
        },
    },
    uiEntities: {},
};

@Injectable({
    providedIn: 'root',
})
export class EnterpriseRequestModuleStore extends EntityListStore<
    EnterpriseModuleRequest
> {
    constructor() {
        super(initialState, 'requestId');
    }

    updateStatusSuccess(
        id: number,
        payload: ChangeEnterpriseRequestStatusPayload
    ) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const entity = draft.entities[id];

            if (entity) entity.status = payload.status;
        });

        this.setState(newState);
    }
}
