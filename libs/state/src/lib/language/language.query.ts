import { Injectable } from '@angular/core';
import { LocalStorageService } from '@libera/api';
import { LANGUAGE_KEY } from '@libera/constants';
import { Language } from '@libera/models/catalog';
import { EntityQuery, UIState } from '@mediomelon/ng-core';
import { map } from 'rxjs/operators';
import { LanguageStore } from './language.store';

@Injectable({
    providedIn: 'root',
})
export class LanguageQuery extends EntityQuery<Language, UIState> {
    constructor(store: LanguageStore, private localStore: LocalStorageService) {
        super(store);
    }

    getSelectedLanguage() {
        return this.localStore
            .selectItem<Language>(LANGUAGE_KEY)
            .pipe(map(language => language.code));
    }
}
