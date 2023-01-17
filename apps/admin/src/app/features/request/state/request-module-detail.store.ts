import { Injectable } from '@angular/core';
import { ChangeEnterpriseRequestStatusPayload, EnterpriseModuleRequestDetail } from '@libera/models/enterprise-request';
import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';
import produce from 'immer';

import { EnterpriseRequestUI } from './models';

const initialState: EntityStoreState<EnterpriseModuleRequestDetail> = {
    entities: {},
    error: null,
    ids: [],
    loaded: false,
    loading: false,
    uiEntities: {},
};

@Injectable({
    providedIn: 'root',
})
export class EnterpriseRequestModuleDetailStore extends EntityStore<
    EnterpriseModuleRequestDetail,
    EnterpriseRequestUI
> {
    constructor() {
        super(initialState);
    }

    createInitialUIState(): EnterpriseRequestUI {
        return {
            loading: false,
            loaded: false,
            error: null,
            update: {
                submitting: false,
                error: null,
            },
        };
    }

    updateStatus(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const entity = draft.uiEntities[id];

            if (!entity) return;

            entity.update.submitting = true;
            entity.update.error = null;
        });

        this.setState(newState);
    }

    updateStatusSuccess(
        id: number,
        payload: ChangeEnterpriseRequestStatusPayload
    ) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const entity = draft.entities[id];
            const uiEntity = draft.uiEntities[id];

            if (entity) entity.status = payload.status;

            if (uiEntity) uiEntity.update.submitting = false;
        });

        this.setState(newState);
    }

    updateStatusError(id: number, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const uiEntity = draft.uiEntities[id];
            if (!uiEntity) return;

            uiEntity.update.submitting = false;
            uiEntity.update.error = error;
        });

        this.setState(newState);
    }
}
