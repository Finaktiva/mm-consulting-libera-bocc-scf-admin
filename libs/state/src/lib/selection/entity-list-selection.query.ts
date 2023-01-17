import { EntityListQuery } from '@mediomelon/ng-core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { combineLatest, map, tap, withLatestFrom } from 'rxjs/operators';

import { EntityListSelectionStore, SelectionUIState } from './entity-list-selection.store';

export class EntityListSelectionQuery<
    E = any,
    UI extends SelectionUIState = any,
    F = any
> extends EntityListQuery<E, UI, F> {
    constructor(protected store: EntityListSelectionStore) {
        super(store);
    }

    hasCurrentPageSelection(): Observable<boolean> {
        return this.currentIdsIntersection().pipe(
            map(selection => !!selection.length)
        );
    }

    hasSelection(): Observable<boolean> {
        return this.store
            .currentSelection()
            .pipe(map(selection => !!selection.length));
    }

    selectCurrentSelection(): Observable<E[]> {
        return this.store.currentSelection().pipe(
            withLatestFrom(this.selectEntitiesMap()),
            map(([ids, entities]) =>
                ids.length ? ids.map(id => entities[id]) : []
            )
        );
    }

    currentIdsIntersection() {
        return this.selectIds().pipe(
            combineLatest(this.store.currentSelection()),
            select(([ids, selection]) =>
                ids.filter(id => selection.indexOf(id) != -1)
            )
        );
    }

    getSelectedEntities() {
        // const entities = this.get
    }
}
