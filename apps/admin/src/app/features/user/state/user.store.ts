import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import { User, UserStatus } from '@libera/models/user';
import { EntityListStore, EntityListStoreState, SubmitStoreState, UIState } from '@mediomelon/ng-core';
import produce from 'immer';

export interface UserUI extends UIState {
    update: SubmitStoreState;
    delete: SubmitStoreState;
    invite: SubmitStoreState;
    patchStatus: SubmitStoreState;
}

const initialState: EntityListStoreState<User, UserUI> = {
    entities: {},
    uiEntities: {},
    loaded: false,
    loading: false,
    error: null,
    ids: [],
    pagination: {
        page: {
            index: 0,
            size: DEFAULT_PAGE_SIZE,
        },
        total: null,
    },
};

@Injectable({
    providedIn: 'root',
})
export class UserStore extends EntityListStore<User, UserUI> {
    constructor() {
        super(initialState);
    }

    createInitialUIState(): UserUI {
        return {
            loaded: false,
            loading: false,
            error: null,
            update: {
                submitting: false,
                error: null,
            },
            delete: {
                submitting: false,
                error: null,
            },
            invite: {
                submitting: false,
                error: null,
            },
            patchStatus: {
                submitting: false,
                error: null,
            },
        };
    }

    patchStatus(id: number, status: UserStatus) {
        const state = this.getState();

        const newState = produce<EntityListStoreState<User, UserUI>>(
            state,
            draft => {
                const { entities, uiEntities } = draft;
                const entity = entities[id];
                const uiEntity = uiEntities[id];

                entity.status = status;
                uiEntity.patchStatus.submitting = true;
                uiEntity.patchStatus.error = null;
            }
        );

        this.setState(newState);
    }

    patchStatusSuccess(id: number) {
        const state = this.getState();

        const newState = produce<EntityListStoreState<User, UserUI>>(
            state,
            draft => {
                const { uiEntities } = draft;
                const uiEntity = uiEntities[id];

                uiEntity.patchStatus.submitting = false;
            }
        );

        this.setState(newState);
    }

    patchStatusError(id: number, status: UserStatus, payload: any) {
        const state = this.getState();

        const newState = produce<EntityListStoreState<User, UserUI>>(
            state,
            draft => {
                const { entities, uiEntities } = draft;
                const entity = entities[id];
                const uiEntity = uiEntities[id];

                entity.status = status;
                uiEntity.patchStatus.submitting = false;
                uiEntity.patchStatus.error = payload;
            }
        );

        this.setState(newState);
    }

    invite(id: number) {
        const state = this.getState();

        const newState = produce<EntityListStoreState<User, UserUI>>(
            state,
            draft => {
                const { uiEntities } = draft;
                if (uiEntities[id] == null && uiEntities[id] == undefined)
                    uiEntities[id] = this.createInitialUIState();

                const entity = uiEntities[id];
                entity.invite.submitting = true;
                entity.invite.error = null;
            }
        );

        this.setState(newState);
    }

    inviteSuccess(id: number) {
        const state = this.getState();

        const newState = produce<EntityListStoreState<User, UserUI>>(
            state,
            draft => {
                const { uiEntities } = draft;
                const entity = uiEntities[id];

                entity.invite.submitting = false;
            }
        );

        this.setState(newState);
    }

    inviteError(id: number, error: any) {
        const state = this.getState();

        const newState = produce<EntityListStoreState<User, UserUI>>(
            state,
            draft => {
                const { uiEntities } = draft;
                const entity = uiEntities[id];

                entity.invite.submitting = false;
                entity.invite.error = error;
            }
        );

        this.setState(newState);
    }

    delete(id: number) {
        const state = this.getState();

        const newState = produce<EntityListStoreState<User, UserUI>>(
            state,
            draft => {
                const { uiEntities } = draft;
                const entity = uiEntities[id];

                entity.delete.submitting = true;
                entity.delete.error = null;
            }
        );

        this.setState(newState);
    }

    deleteError(id: number, error: any) {
        const state = this.getState();

        const newState = produce<EntityListStoreState<User, UserUI>>(
            state,
            draft => {
                const { uiEntities } = draft;
                const entity = uiEntities[id];

                entity.delete.submitting = false;
                entity.delete.error = error;
            }
        );

        this.setState(newState);
    }

    update(id: number) {
        const state = this.getState();

        const newState = produce<EntityListStoreState<User, UserUI>>(
            state,
            draft => {
                const { uiEntities } = draft;
                const entity = uiEntities[id];

                entity.update.submitting = true;
                entity.update.error = null;
            }
        );

        this.setState(newState);
    }

    updateSuccess(id: number, payload: User) {
        const state = this.getState();

        const newState = produce<EntityListStoreState<User, UserUI>>(
            state,
            draft => {
                const { entities, uiEntities } = draft;
                const uiEntity = uiEntities[id];

                uiEntity.update.submitting = false;
                entities[id] = { ...entities[id], ...payload };
            }
        );

        this.setState(newState);
    }

    updateError(id: number, error: any) {
        const state = this.getState();

        const newState = produce<EntityListStoreState<User, UserUI>>(
            state,
            draft => {
                const { uiEntities } = draft;
                const uiEntity = uiEntities[id];

                uiEntity.update.submitting = false;
                uiEntity.update.error = error;
            }
        );

        this.setState(newState);
    }
}
