import { Injectable } from '@angular/core';
import { Enterprise } from '@libera/models/enterprise';
import { EntityListQuery } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';

import { EnterpriseStore, EnterpriseUI } from './enterprise.store';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseQuery extends EntityListQuery<Enterprise, EnterpriseUI> {
    constructor(private store: EnterpriseStore) {
        super(store);
    }

    selectUIEntityNewDocument (id:number):Observable<any> {
        return this.selectUIEntity(id).pipe(
            select(entity => {
                return (entity.newDocument.comment ? false : true)
            })
        );
    }

    selectUIEntityEditing(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.editing : false))
        );
    }

    selectUIEntityUpdating(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.update.submitting : false))
        );
    }

    selectEntityIsRejected(id: number): Observable<boolean> {
        return this.selectEntity(id).pipe(
            select(entity => (entity ? entity.status == 'REJECTED' : false))
        );
    }

    selectEntityIsPending(id: number): Observable<boolean> {
        return this.selectEntity(id).pipe(
            select(entity =>
                entity ? entity.status == 'EVALUATION_PENDING' : false
            )
        );
    }

    selectEntityIsPendingConfirmation(id: number): Observable<boolean> {
        return this.selectEntity(id).pipe(
            select(entity =>
                entity ? entity.status == 'PENDING_ACCOUNT_CONFIRMATION' : false
            )
        );
    }

    selectEntityInviting(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => entity.invite.submitting)
        );
    }

    selectEntityUpdatingStatus(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => entity.status.submitting)
        );
    }
}
