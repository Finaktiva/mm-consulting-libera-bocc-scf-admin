import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import { CreateProgramPayload } from '@libera/models/enterprise';
import {
    ChangeEnterpriseRequestStatusPayload,
    EnterpriseLinkRequest,
    EnterpriseRequestPaginationFilters,
} from '@libera/models/enterprise-request';
import { EntityListStore, EntityListStoreState, SubmitStoreState, UIState } from '@mediomelon/ng-core';
import produce from 'immer';

import { EnterpriseRequestUI } from './models';

export interface EnterpriseLinkRequestUI extends UIState {
    invite: SubmitStoreState;
    update: SubmitStoreState;
}

const initialState: EntityListStoreState<
    EnterpriseLinkRequest,
    EnterpriseLinkRequestUI,
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
export class EnterpriseRequestLinkStore extends EntityListStore<
    EnterpriseLinkRequest,
    EnterpriseLinkRequestUI,
    EnterpriseRequestPaginationFilters
> {
    constructor() {
        super(initialState, 'requestId');
    }

    createInitialUIState(): EnterpriseLinkRequestUI {
        return {
            loading: false,
            loaded: false,
            error: null,
            invite: {
                submitting: false,
                error: null,
            },
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

    invite(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const entity = draft.uiEntities[id];

            if (!entity) return;

            entity.invite.submitting = true;
            entity.invite.error = null;
        });

        this.setState(newState);
    }

    inviteSuccess(
        id: number,
        {
            name,
            firstSurname,
            secondSurname,
            nit,
            enterpriseName,
            email,
        }: CreateProgramPayload
    ) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const uiEntity = draft.uiEntities[id];

            if (uiEntity) uiEntity.invite.submitting = false;

            if (draft.entities[id])
                draft.entities[id].enterpriseRequested = {
                    ...draft.entities[id].enterpriseRequested,
                    status: 'INCOMPLETE_ACCOUNT',
                    enterpriseName,
                    email,
                    nit,
                    owner: {
                        name,
                        firstSurname,
                        secondSurname,
                    },
                };
        });

        this.setState(newState);
    }

    inviteError(id: number, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const uiEntity = draft.uiEntities[id];
            if (!uiEntity) return;

            uiEntity.invite.submitting = false;
            uiEntity.invite.error = error;
        });

        this.setState(newState);
    }
}
