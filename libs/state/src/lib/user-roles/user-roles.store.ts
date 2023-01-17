import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import { RoleStatus } from '@libera/models/role';
import { UserRole, UserRoleUpdatePayload } from '@libera/models/user';
import { EntityListStore, EntityListStoreState, SubmitStoreState } from '@mediomelon/ng-core';
import produce from 'immer';

const initialState: EntityListStoreState<UserRole, UserRoleUI> = {
    entities: {},
    uiEntities: {},
    error: null,
    ids: [],
    loaded: false,
    loading: false,
    pagination: {
        page: {
            index: 0,
            size: DEFAULT_PAGE_SIZE,
        },
        total: null,
    },
};

export interface UserRoleUI {
    loaded: boolean;
    loading: boolean;
    error: any;
    update: SubmitStoreState;
    delete: SubmitStoreState;
    invite: SubmitStoreState;
    patchStatus: SubmitStoreState;
}

@Injectable({
    providedIn: 'root',
})
export class UserRoleStore extends EntityListStore<UserRole, UserRoleUI> {
    constructor() {
        super(initialState);
    }

    createInitialUIState(): UserRoleUI {
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

    update(role: UserRole) {
        const state = this.getState();
        const newState = produce<
            EntityListStoreState<UserRole, UserRoleUI>
        >(state, draft => {
            const { uiEntities } = draft;
            
            const entity = uiEntities[role.id]
            entity.update.submitting = true;
            entity.update.error = null;
        });

        this.setState(newState);
    }

    updateSuccess(role: UserRole, payload: UserRoleUpdatePayload) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<UserRole, UserRoleUI>
        >(state, draft => {
            const { entities, uiEntities } = draft;
            const uiEntity = uiEntities[role.id];

            const currentDate = new Date(Date.now());
            uiEntity.update.submitting = false;
            entities[role.id] = { ...entities[role.id], ...payload, modificationDate: currentDate.toISOString() };
        });

        this.setState(newState);
    }

    updateError(role: UserRole, error: any) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<UserRole, UserRoleUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[role.id];

            entity.update.submitting = false;
            entity.update.error = error;
        });

        this.setState(newState);
    }

    updateRoleStatusSuccess(status: RoleStatus, payload: UserRole) {
        const state = this.getState();

        const newState = produce<EntityListStoreState<UserRole, UserRoleUI>>(
            state,
            draft => {
                const { entities, uiEntities } = draft;
                const uiEntity = uiEntities[payload.id];

                entities[payload.id] = { ...entities[payload.id], status };
            }
        );
        this.setState(newState);
    }
}