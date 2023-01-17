import { Injectable } from '@angular/core';
import { EnterpriseModule, EnterpriseModuleName } from '@libera/models/enterprise';
import { EntityStore, EntityStoreState, SubmitStoreState, UIState } from '@mediomelon/ng-core';
import produce from 'immer';

export interface EnterpriseModuleUI extends UIState {
    requestActivation: SubmitStoreState;
    uploadFile: SubmitStoreState;
    deleteFile: SubmitStoreState;
    file: {
        id: number;
        name: string;
        url: string;
    };
}

const initialState: EntityStoreState<EnterpriseModule> = {
    entities: {},
    uiEntities: {},
    error: null,
    ids: [],
    loaded: false,
    loading: false,
};

@Injectable({
    providedIn: 'root',
})
export class EnterpriseModuleStore extends EntityStore<
    EnterpriseModule,
    EnterpriseModuleUI
> {
    constructor() {
        super(initialState, 'name');
    }

    uploadFile(name: EnterpriseModuleName) {
        const state = this.getState();

        const newState = produce<
            EntityStoreState<EnterpriseModule, EnterpriseModuleUI>
        >(state, draft => {
            const { uiEntities } = draft;

            const uiEntity = uiEntities[name];

            uiEntity.uploadFile.submitting = true;
            uiEntity.uploadFile.error = null;
        });

        this.setState(newState);
    }

    uploadFileSuccess(
        name: EnterpriseModuleName,
        payload: { id: number; name: string; url: string }
    ) {
        const state = this.getState();

        const newState = produce<
            EntityStoreState<EnterpriseModule, EnterpriseModuleUI>
        >(state, draft => {
            const { uiEntities } = draft;

            const uiEntity = uiEntities[name];

            uiEntity.uploadFile.submitting = false;
            uiEntity.file = payload;
        });

        this.setState(newState);
    }

    uploadFileError(name: EnterpriseModuleName, payload: any) {
        const state = this.getState();

        const newState = produce<
            EntityStoreState<EnterpriseModule, EnterpriseModuleUI>
        >(state, draft => {
            const { uiEntities } = draft;

            const uiEntity = uiEntities[name];

            uiEntity.uploadFile.submitting = false;
            uiEntity.uploadFile.error = payload;
        });

        this.setState(newState);
    }

    deleteFile(name: EnterpriseModuleName) {
        const state = this.getState();

        const newState = produce<
            EntityStoreState<EnterpriseModule, EnterpriseModuleUI>
        >(state, draft => {
            const { uiEntities } = draft;

            const uiEntity = uiEntities[name];

            uiEntity.deleteFile.submitting = true;
            uiEntity.deleteFile.error = null;
        });

        this.setState(newState);
    }

    deleteFileSuccess(name: EnterpriseModuleName) {
        const state = this.getState();

        const newState = produce<
            EntityStoreState<EnterpriseModule, EnterpriseModuleUI>
        >(state, draft => {
            const { uiEntities } = draft;

            const uiEntity = uiEntities[name];

            uiEntity.deleteFile.submitting = false;
            uiEntity.file = null;
        });

        this.setState(newState);
    }

    deleteFileError(name: EnterpriseModuleName, payload: any) {
        const state = this.getState();

        const newState = produce<
            EntityStoreState<EnterpriseModule, EnterpriseModuleUI>
        >(state, draft => {
            const { uiEntities } = draft;

            const uiEntity = uiEntities[name];

            uiEntity.deleteFile.submitting = false;
            uiEntity.deleteFile.error = payload;
        });

        this.setState(newState);
    }

    requestActivation(name: EnterpriseModuleName) {
        const state = this.getState();

        const newState = produce<
            EntityStoreState<EnterpriseModule, EnterpriseModuleUI>
        >(state, draft => {
            const { uiEntities } = draft;

            const uiEntity = uiEntities[name];

            uiEntity.requestActivation.submitting = true;
            uiEntity.requestActivation.error = null;
        });

        this.setState(newState);
    }

    requestActivationSuccess(name: EnterpriseModuleName) {
        const state = this.getState();

        const newState = produce<
            EntityStoreState<EnterpriseModule, EnterpriseModuleUI>
        >(state, draft => {
            const { entities, uiEntities } = draft;

            const entity = entities[name];
            const uiEntity = uiEntities[name];

            entity.status = 'VALIDATING_REQUEST';
            uiEntity.requestActivation.submitting = false;
        });

        this.setState(newState);
    }

    requestActivationError(name: EnterpriseModuleName, payload: any) {
        const state = this.getState();

        const newState = produce<
            EntityStoreState<EnterpriseModule, EnterpriseModuleUI>
        >(state, draft => {
            const { uiEntities } = draft;

            const uiEntity = uiEntities[name];

            uiEntity.requestActivation.submitting = false;
            uiEntity.requestActivation.error = payload;
        });

        this.setState(newState);
    }

    createInitialUIState(): EnterpriseModuleUI {
        const submitState: SubmitStoreState = {
            submitting: false,
            error: null,
        };

        return {
            loaded: false,
            loading: false,
            error: null,
            file: null,
            deleteFile: submitState,
            requestActivation: submitState,
            uploadFile: submitState,
        };
    }
}
