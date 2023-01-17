import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import { Enterprise, EnterpriseStatus, ProgramFiltersPayload, SaveNewDocument, UpdateModulesProductsPayload } from '@libera/models/enterprise';
import { EntityListStore, EntityListStoreState } from '@mediomelon/ng-core';
import produce from 'immer';

export interface EnterpriseUI {
    loaded: boolean;
    loading: boolean;
    error: any;
    editing: boolean;
    update: {
        submitting: boolean;
        error: any;
    };
    invite: {
        submitting: boolean;
        error: any;
    };
    status: {
        submitting: boolean;
        error: any;
    };
    newDocument: {
        documentType:string;
        documentTypeDescription:string;
        timeType:string;
        effectiveness:string;
        comment:string;
    };
    documentationResolution: {
        submitting: boolean,
        error: any,
    }
}

const initialState: EntityListStoreState<
    Enterprise,
    EnterpriseUI,
    ProgramFiltersPayload
> = {
    entities: {},
    uiEntities: {},
    loaded: false,
    loading: false,
    error: null,
    ids: [],
    pagination: {
        filters: {
            filter_by: null,
            q: null,
            documentType: null,
            module: null
        },
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
export class EnterpriseStore extends EntityListStore<Enterprise, EnterpriseUI> {
    constructor() {
        super(initialState);
    }

    invite(id: number) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.invite.submitting = true;
            entity.invite.error = null;
        });

        this.setState(newState);
    }

    inviteSuccess(id: number) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.invite.submitting = false;
        });

        this.setState(newState);
    }

    inviteError(id: number, error: any) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.invite.submitting = false;
            entity.invite.error = error;
        });

        this.setState(newState);
    }

    update(id: number) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.update.submitting = true;
            entity.update.error = null;
        });

        this.setState(newState);
    }

    updateSuccess(id: number, payload: Enterprise) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities, entities } = draft;

            const entity = entities[id];
            const uiEntity = uiEntities[id];

            uiEntity.editing = false;
            uiEntity.update.submitting = false;
            entities[id] = {
                ...entity,
                ...payload,
                owner: { ...entity.owner, ...payload.owner },
            };
        });

        this.setState(newState);
    }

    updateError(id: number, error: any) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.status.submitting = false;
            entity.status.error = error;
        });

        this.setState(newState);
    }

    updateStatus(id: number) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            // entity.status.submitting = true;
            // entity.status.error = null;
        });

        this.setState(newState);
    }

    updateStatusSuccess(id: number, status: EnterpriseStatus) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities, entities } = draft;

            const entity = entities[id];
            const uiEntity = uiEntities[id];

            uiEntity.status.submitting = false;
            entity.status = status;
        });

        this.setState(newState);
    }

    updateStatusError(id: number, error: any) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.status.submitting = false;
            entity.status.error = error;
        });

        this.setState(newState);
    }

    updateModulesProducts(id: number) {
        const state = this.getState();
        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];
            entity.update.submitting = true;
            entity.update.error = null;
        });

        this.setState(newState);
    }

    updateModulesProductsSuccess(id: number, payload: UpdateModulesProductsPayload) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities, entities } = draft;

            const entity = entities[id];
            const uiEntity = uiEntities[id];

            uiEntity.update.submitting = false;
            entity.productType = payload.productType;
            entity.relationshipManager = payload.relationshipManager;
            entity.sales = payload.sales;
            entity.salesCut = payload.salesCut;
            entities[id] = {
                ...entity,
                ...payload,
                owner: { ...entity.owner, ...payload.owner },
                phone: { ...entity.phone, ...payload.phone },
                bankRegion: { ...entity.bankRegion, ...payload.bankRegion }
            };
        });

        this.setState(newState);
    }

    updateModulesProductsError(id: number, error: any) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.update.submitting = false;
            entity.update.error = error;
        });

        this.setState(newState);
    }
    
    toggleEditing(id: number) {
        const state = this.getState();

        const newState = produce<EntityListStoreState<Enterprise, EnterpriseUI>>(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.editing = !entity.editing;
        });

        this.setState(newState);
    }

    addDocument (id:number, documentData:SaveNewDocument) {
        const state = this.getState();
        const newState = produce(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];
            entity.newDocument = documentData;
        });
        this.setState(newState);
    }

    documentationResolution(id: number) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.documentationResolution.submitting = true;
            entity.documentationResolution.error = null;
        });

        this.setState(newState);
    }

    documentationResolutionSuccess(id: number) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.documentationResolution.submitting = false;
        });

        this.setState(newState);
    }

    documentationResolutionError(id: number, error: any) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.documentationResolution.submitting = false;
            entity.documentationResolution.error = error;
        });

        this.setState(newState);
    }

    fetchEnterprisesBasicInfo(id: number){
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.loading = true;
            entity.error = null;
        });

        this.setState(newState);
    }

    fetchEnterprisesBasicInfoSuccess(id: number){
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.loading = false;
        });

        this.setState(newState);
    }

    fetchEnterprisesBasicInfoError(id: number, error: any){
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<Enterprise, EnterpriseUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.loading = false;
            entity.error = error;
        });

        this.setState(newState);
    }

    createInitialUIState(): EnterpriseUI {
        return {
            loaded: false,
            loading: false,
            error: null,
            editing: false,
            update: {
                submitting: false,
                error: null,
            },
            invite: {
                submitting: false,
                error: null,
            },
            status: {
                submitting: false,
                error: null,
            },
            newDocument: {
                comment:'',
                documentType:'',
                documentTypeDescription:'',
                effectiveness:'',
                timeType:''
            },
            documentationResolution: {
                submitting: false,
                error: null,
            }
        };
    }
}
