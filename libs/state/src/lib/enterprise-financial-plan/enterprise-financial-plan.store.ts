import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import { PlanFiltersPayload } from '@libera/models/catalog';
import { BasicFinancialPlan } from '@libera/models/enterprise';
import { EntityListStore, EntityListStoreState } from '@mediomelon/ng-core';
import produce from 'immer';

export interface FinancialPlanUI {
    loaded: boolean;
    loading: boolean;
    error: any;
    editing: boolean;
    update: {
        submitting: boolean;
        error: any;
    };
    create: {
        submitting: boolean;
        error: any;
    };
    status: {
        submitting: boolean;
        error: any;
    };
}

const initialState: EntityListStoreState<
    BasicFinancialPlan,
    FinancialPlanUI,
    PlanFiltersPayload
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
export class EnterpriseFinancialPlanStore extends EntityListStore<BasicFinancialPlan, FinancialPlanUI> {
    constructor() {
        super(initialState);
    }

    toggleEditing(id: number) {
        const state = this.getState();

        const newState = produce<EntityListStoreState<BasicFinancialPlan, FinancialPlanUI>>(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.editing = !entity.editing;
        });

        this.setState(newState);
    }

    invite(id: number) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<BasicFinancialPlan, FinancialPlanUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.create.submitting = true;
            entity.create.error = null;
        });

        this.setState(newState);
    }

    inviteSuccess(id: number) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<BasicFinancialPlan, FinancialPlanUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.create.submitting = false;
        });

        this.setState(newState);
    }

    inviteError(id: number, error: any) {
        const state = this.getState();

        const newState = produce<
            EntityListStoreState<BasicFinancialPlan, FinancialPlanUI>
        >(state, draft => {
            const { uiEntities } = draft;
            const entity = uiEntities[id];

            entity.create.submitting = false;
            entity.create.error = error;
        });

        this.setState(newState);
    }

    updateFinancialConditionSuccess(payload: any, idPlan: number){
        const state = this.getState();

        const newState = produce<EntityListStoreState<BasicFinancialPlan, FinancialPlanUI>>(
            state,
            draft => {
                const { entities, uiEntities } = draft;
                const uiEntity = uiEntities[idPlan];
                const planState = payload.status
                entities[idPlan] = { ...entities[idPlan], status: planState };
            }
        );
        this.setState(newState);
    }

    createInitialUIState(): FinancialPlanUI {
        return {
            loaded: false,
            loading: false,
            error: null,
            editing: false,
            update: {
                submitting: false,
                error: null,
            },
            create: {
                submitting: false,
                error: null,
            },
            status: {
                submitting: false,
                error: null,
            }
        };
    }
}
