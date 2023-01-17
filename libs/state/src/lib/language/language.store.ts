import { Injectable } from '@angular/core';
import { Language } from '@libera/models/catalog';
import { EntityStore, EntityStoreState, UIState } from '@mediomelon/ng-core';
import produce from 'immer';

const initialState: EntityStoreState<Language, UIState> = {
    entities: {},
    error: null,
    ids: [],
    loaded: false,
    loading: false,
    uiEntities: {},
};

@Injectable({
    providedIn: 'root',
})
export class LanguageStore extends EntityStore<Language, UIState> {
    constructor() {
        super(initialState, 'code');
    }

    updateLanguage(language: Language) {
        const state = this.getState();
        const newState = produce(state, draft => {
            const { entities } = draft;
            entities[language.code] = language;
        });
        this.setState(newState);
    }
}
