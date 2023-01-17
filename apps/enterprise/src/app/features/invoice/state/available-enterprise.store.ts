import { Injectable } from '@angular/core';
import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';
import { AvailableEnterprise } from '@libera/models/enterprise';

const initialState: EntityStoreState<AvailableEnterprise> = {
    entities: {},
    error: null,
    ids: [],
    loaded: false,
    loading: false,
    uiEntities: {},
};

@Injectable()
export class AvailableEnterpriseStore extends EntityStore<AvailableEnterprise> {
    constructor() {
        super(initialState);
    }
}
