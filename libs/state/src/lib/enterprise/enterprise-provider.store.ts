import { Injectable } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import { EnterpriseProvider, EnterpriseProviderFilterPayload } from '@libera/models/enterprise';
import { EntityListStore, EntityListStoreState } from '@mediomelon/ng-core';

export interface EnterpriseProviderUI {
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
    EnterpriseProvider,
    EnterpriseProviderUI,
    EnterpriseProviderFilterPayload
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
            status: null
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
export class EnterpriseProviderStore extends EntityListStore<EnterpriseProvider, EnterpriseProviderUI> {
    constructor() {
        super(initialState);
    }
}