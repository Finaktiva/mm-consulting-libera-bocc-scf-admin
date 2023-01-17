import { Injectable } from '@angular/core';
import { NegotiationLog } from '@libera/models/shared';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { tap } from 'rxjs/operators';

import { NegotiationLogUnionStore } from './negotiation-log.union.store';

@Injectable({
    providedIn: 'root',
})
export class NegotiationLogUnionQuery {
    constructor(private store: NegotiationLogUnionStore) {}

    selectEntityLogs(id: number): Observable<NegotiationLog[]> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.logs : []))
        );
    }

    selectEntity(id: number) {
        return this.selectEntitiesMap().pipe(
            select(entities => entities[id] || null)
        );
    }

    selectUIEntityLoaded(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.loaded : false))
        );
    }

    selectUIEntityLoading(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.loading : false))
        );
    }

    selectUIEntityError(id: number): Observable<any> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.error : null))
        );
    }

    selectEntitiesMap() {
        return this.selectState().pipe(select(state => state.entities));
    }

    selectUIEntitiesMap() {
        return this.selectState().pipe(select(state => state.uiEntities));
    }

    selectUIEntity(id: number) {
        return this.selectUIEntitiesMap().pipe(
            select(entities => entities[id] || null)
        );
    }

    getUIEntity(id: number) {
        const { uiEntities } = this.getState();
        return uiEntities[id] || null;
    }

    shouldFetchEntity(id: number) {
        const entity = this.getUIEntity(id);

        return entity ? !entity.loaded || !!entity.error : false;
    }

    private selectState() {
        return this.store.state$;
    }

    private getState() {
        return this.store.getState();
    }
}
