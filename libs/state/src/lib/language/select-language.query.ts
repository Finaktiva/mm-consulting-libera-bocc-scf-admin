import { Injectable } from '@angular/core';
import { SubmitQuery } from '@mediomelon/ng-core';
import { SelectLanguageStore } from './select-language.store';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SelectLanguageQuery extends SubmitQuery {
    constructor(private store: SelectLanguageStore) {
        super(store);
    }

    selectCreating() {
        return this.store
            .selectState()
            .pipe(map(state => state.create.submitting));
    }

    selectFetching() {
        return this.store
            .selectState()
            .pipe(map(state => state.fetch.submitting));
    }
}
