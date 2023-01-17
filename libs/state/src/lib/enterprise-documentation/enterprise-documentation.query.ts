import { Injectable } from '@angular/core';
import { EnterpriseDocumentation } from '@libera/models/enterprise';
import { StateWithUI } from '@libera/models/ui';
import { combineLatest, Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { auditTime } from 'rxjs/operators';

import { EnterpriseDocumentationStore, EnterpriseDocumentationUI } from './enterprise-documentation.store';

export interface EnterpriseDocumentationWithUI
    extends StateWithUI<EnterpriseDocumentation, EnterpriseDocumentationUI> {}

@Injectable({
    providedIn: 'root',
})
export class EnterpriseDocumentationQuery {
    constructor(private store: EnterpriseDocumentationStore) {}

    selectEntitiesMap() {
        return this.store.state$.pipe(select(state => state.entities));
    }

    selectEntitiesWithUI(
        id: number
    ): Observable<EnterpriseDocumentationWithUI[]> {
        return combineLatest(
            this.selectEnterpriseDocumentationIds(id),
            this.selectEntities(),
            this.selectUIEntities()
        ).pipe(
            auditTime(0),
            select(([ids, entities, uiEntities]) => {
                return ids.map(id => ({
                    state: entities[id],
                    ui: uiEntities[id],
                }));
            })
        );
    }

    selectEnterpriseDocumentationIds(id: number) {
        return this.selectEnterpriseEntity(id).pipe(
            select(state => (state ? state.ids : []))
        );
    }

    selectEnterpriseEntity(id: number) {
        return this.selectEnterpriseEntities().pipe(select(state => state[id]));
    }

    selectEntityLoaded(id: number) {
        return this.selectEnterpriseUIEntity(id).pipe(
            select(state => (state ? state.loaded : false))
        );
    }

    selectEntityLoading(id: number) {
        return this.selectEnterpriseUIEntity(id).pipe(
            select(state => (state ? state.loading : false))
        );
    }

    selectEntityError(id: number) {
        return this.selectEnterpriseUIEntity(id).pipe(
            select(state => (state ? state.error : null))
        );
    }

    selectEnterpriseUIEntity(id: number) {
        return this.selectEnterpriseUIEntities().pipe(
            select(state => state[id])
        );
    }

    selectUIEntity(id: number) {
        return this.selectUIEntities().pipe(select(state => state[id]));
    }

    selectUpdating(id: number) {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.update.submitting : false))
        );
    }

    selectUploading(id: number) {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.upload.submitting : false))
        );
    }

    selectDocumentationCount(id: number) {
        return this.selectEnterpriseDocumentationIds(id).pipe(
            select(ids => (ids ? ids.length : 0))
        );
    }

    selectAllDocumentationHasBeenApproved(id: number, skipFinancialStatements?:boolean) {
        return combineLatest(
            this.selectEnterpriseDocumentationIds(id),
            this.selectEntities()
        ).pipe(
            auditTime(0),
            select(([ids, entities]) => ids.map(id => entities[id])),
            select(entities =>
                (skipFinancialStatements)?
                entities.filter(entity => entity.type.code != 'FINANCIAL_STATEMENTS_DEBTOR').every(entity => entity.status == 'CURRENT'):
                entities.every(entity => entity.status == 'CURRENT')
            )
        );
    }

    getEnterpriseLoaded(id: number) {
        const enterpriseUIEntity = this.store.getState().enterpriseUIEntities[
            id
        ];
        return enterpriseUIEntity ? enterpriseUIEntity.loaded : false;
    }

    getEnterpriseError(id: number) {
        const enterpriseUIEntity = this.store.getState().enterpriseUIEntities[
            id
        ];
        return enterpriseUIEntity ? enterpriseUIEntity.error : null;
    }

    getEntityMap() {
        return this.store.getState().entities;
    }

    private selectEntities() {
        return this.store.state$.pipe(select(state => state.entities));
    }

    private selectUIEntities() {
        return this.store.state$.pipe(select(state => state.uiEntities));
    }

    private selectEnterpriseEntities() {
        return this.store.state$.pipe(
            select(state => state.enterpriseEntities)
        );
    }

    private selectEnterpriseUIEntities() {
        return this.store.state$.pipe(
            select(state => state.enterpriseUIEntities)
        );
    }
}
