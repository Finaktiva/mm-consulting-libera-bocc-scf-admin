import { Injectable } from '@angular/core';
import { ChangeDocumentationStatusPayload, EnterpriseDocumentation, EnterpriseStatus } from '@libera/models/enterprise';
import produce from 'immer';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

export interface EnterpriseDocumentationUI {
    upload: {
        submitting: boolean;
        error: any;
    };
    update: {
        submitting: boolean;
        error: any;
    };
    delete: {
        submitting: boolean;
        error: any;
    };
}

interface UIEntitiesState {
    [id: number]: EnterpriseDocumentationUI;
}

interface EnterpriseUI {
    loaded: boolean;
    loading: boolean;
    error: any;
}

interface EnterpriseUIEntitiesState {
    [id: number]: EnterpriseUI;
}

export interface State {
    entities: {
        [id: number]: EnterpriseDocumentation;
    };
    uiEntities: UIEntitiesState;
    enterpriseEntities: {
        [id: number]: {
            ids: number[];
        };
    };
    enterpriseUIEntities: EnterpriseUIEntitiesState;
}

@Injectable({
    providedIn: 'root',
})
export class EnterpriseDocumentationStore {

    private _state$ = new BehaviorSubject<State>({
        entities: {},
        uiEntities: {},
        enterpriseEntities: {},
        enterpriseUIEntities: {},
    });

    state$ = this._state$.asObservable();

    addDocumentData (enterpriseId:number) {
        const state = this.getState();
        const newState = produce(state, draft => {

        })
        this.setState(newState)
    }

    fetch(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const enterpriseUIEntity =
                draft.enterpriseUIEntities[id] || this.getInitialEnterpriseUI();
            enterpriseUIEntity.loading = true;
            enterpriseUIEntity.error = null;
            draft.enterpriseUIEntities[id] = enterpriseUIEntity;
        });

        this.setState(newState);
    }

    fetchSuccess(id: number, newEntities: EnterpriseDocumentation[]) {
        const state = this.getState();
        const newState = produce(state, draft => {
            const ids = [];
            const {
                enterpriseUIEntities,
                enterpriseEntities,
                entities,
                uiEntities,
            } = draft;
            const enterpriseUIEntity = enterpriseUIEntities[id];
            enterpriseUIEntity.loaded = true;
            enterpriseUIEntity.loading = false;
            newEntities.forEach(entity => {
                ids.push(entity.id);
                const uiEntity = this.getInitialUI();
                entities[entity.id] = entity;
                uiEntities[entity.id] = uiEntity;
            });
            enterpriseEntities[id] = {
                ids,
            };
        });
        this.setState(newState);
    }

    fetchSuccessNewDocument (id:number, newEntity: EnterpriseDocumentation) {
        const state = this.getState();
        const newState = produce(state, draft => {
            const ids = [];
            const {
                enterpriseUIEntities,
                enterpriseEntities,
                entities,
                uiEntities,
            } = draft;
            const enterpriseUIEntity = enterpriseUIEntities[id];
            enterpriseUIEntity.loaded = true;
            enterpriseUIEntity.loading = false;
            ids.push(newEntity.id);
            const uiEntity = this.getInitialUI();
            entities[newEntity.id] = newEntity;
            uiEntities[newEntity.id] = uiEntity;
            enterpriseEntities[id].ids.push(newEntity.id);
        });
        this.setState(newState);
    }

    fetchError(id: number, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const { enterpriseUIEntities } = draft;
            const enterpriseUIEntity = enterpriseUIEntities[id];
            enterpriseUIEntity.loading = false;
            enterpriseUIEntity.error = error;
        });

        this.setState(newState);
    }

    uploadFile(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const entity = draft.uiEntities[id];
            if (!entity) return;

            entity.upload.submitting = true;
            entity.upload.error = null;
        });

        this.setState(newState);
    }

    uploadFileSuccess(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const entity = draft.entities[id];
            const uiEntity = draft.uiEntities[id];

            if (!entity || !uiEntity) return;

            entity.file = payload.file;
            entity.comment = payload.explanation;
            entity.status = payload.status;
            entity.effectivenessDate = payload.effectivenessDate;
            entity.modificationDate = payload.modificationDate;
            
            uiEntity.upload.submitting = false;
        });

        this.setState(newState);
    }

    uploadFileError(id: number, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const entity = draft.uiEntities[id];
            if (!entity) return;

            entity.upload.submitting = false;
            entity.upload.error = error;
        });

        this.setState(newState);
    }

    uploadFileProvider(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const entity = draft.uiEntities[id] ? draft.uiEntities[id] : draft.uiEntities[id] = this.getInitialUI();
            if (!entity) return;

            entity.upload.submitting = true;
            entity.upload.error = null;
        });

        this.setState(newState);
    }

    uploadFileSuccessProvider(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const uiEntity = draft.uiEntities[id];

            if (!uiEntity) return;

            uiEntity.upload.submitting = false;
        });

        this.setState(newState);
    }

    uploadFileErrorProvider(id: number, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const entity = draft.uiEntities[id];
            if (!entity) return;

            entity.upload.submitting = false;
            entity.upload.error = error;
        });

        this.setState(newState);
    }

    deleteFile(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const uiEntity = draft.uiEntities[id];

            uiEntity.delete.submitting = true;
            uiEntity.delete.error = null;
        });

        this.setState(newState);
    }

    deleteFileSuccess(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const entity = draft.entities[id];
            const uiEntity = draft.uiEntities[id];

            entity.file = null;
            entity.status = 'PENDING';
            uiEntity.delete.submitting = false;
        });

        this.setState(newState);
    }

    deleteFileError(id: number, payload: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const uiEntity = draft.uiEntities[id];

            uiEntity.delete.submitting = false;
            uiEntity.delete.error = payload;
        });

        this.setState(newState);
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

    updateStatusSuccess(id: number, payload: ChangeDocumentationStatusPayload) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const entity = draft.entities[id];
            const uiEntity = draft.uiEntities[id];
            if (!entity || !uiEntity) return;

            uiEntity.update.submitting = false;
            if(payload.status != 'ACCEPTED') entity.status = payload.status;
            else if(!entity.effectiveness) entity.status = 'CURRENT'
            else {
                entity.effectivenessDate = moment( payload.expeditionDate ).add( entity.effectiveness, 'M' ).toDate().toISOString();
                if(entity.effectivenessDate) {
                    const effectiveness = moment(entity.effectivenessDate).diff(moment(moment.now(), 'x'), 'd') + 1;
                    if (effectiveness > 15)
                        entity.status = 'CURRENT';
                    else if (effectiveness > 1)
                        entity.status = 'ABOUT_TO_EXPIRE';
                    else
                        entity.status = 'EXPIRED';
                }
            }
            entity.comment = payload.explanation;
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

    uploadBasicFile(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const entity = draft.uiEntities[id] ? draft.uiEntities[id] : draft.uiEntities[id] = this.getInitialUI();
            if (!entity) return;

            entity.upload.submitting = true;
            entity.upload.error = null;
        });

        this.setState(newState);
    }

    uploadBasicFileSuccess(id: number) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const uiEntity = draft.uiEntities[id];

            if (!uiEntity) return;

            uiEntity.upload.submitting = false;
        });

        this.setState(newState);
    }

    uploadBasicFileError(id: number, error: any) {
        const state = this.getState();

        const newState = produce(state, draft => {
            const entity = draft.uiEntities[id];
            if (!entity) return;

            entity.upload.submitting = false;
            entity.upload.error = error;
        });

        this.setState(newState);
    }

    private setState(state: State) {
        this._state$.next(state);
    }

    getState() {
        return this._state$.getValue();
    }

    private getEntities() {
        return this.getState().entities;
    }

    private getInitialUI(): EnterpriseDocumentationUI {
        return {
            upload: {
                submitting: false,
                error: null,
            },
            update: {
                submitting: false,
                error: null,
            },
            delete: {
                submitting: false,
                error: null,
            },
        };
    }

    private getInitialEnterpriseUI(): EnterpriseUI {
        return {
            loaded: false,
            loading: false,
            error: null,
        };
    }
}
