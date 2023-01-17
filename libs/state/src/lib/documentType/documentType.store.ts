import { Injectable } from '@angular/core';
import { DocumentType } from '@libera/models/catalog';
import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';

const initialState: EntityStoreState<DocumentType> = {
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
export class DocumentTypeStore extends EntityStore<DocumentType> {
    constructor() {
        super(initialState);
    }
}