import { Injectable } from '@angular/core';
import { EnterpriseModule, EnterpriseModuleName } from '@libera/models/enterprise';
import { EntityQuery } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { EnterpriseModuleStore, EnterpriseModuleUI } from './enterprise-module.store';
import { select } from 'rxjs-augmented/operators';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseModuleQuery extends EntityQuery<
    EnterpriseModule,
    EnterpriseModuleUI
> {
    constructor(private store: EnterpriseModuleStore) {
        super(store);
    }

    selectEnabledEntities() {
        return this.selectEntities().pipe(
            map(entities =>
                entities.filter(entity => entity.status == 'ENABLED')
            ),
            distinctUntilChanged()
        );
    }

    selectEntitiesWithUIExcludingAdmin() {
        return this.selectEntitiesWithUI().pipe(
            map(entities =>
                entities.filter(entity => entity.state.name != 'ADMIN')
            ),
            distinctUntilChanged()
        );
    }

    selectCanRequestModule() {
        return this.selectEntities().pipe(
            select(entities => entities ? entities.every(entity => entity.status != 'VALIDATING_REQUEST') : false)
        )
    }

    selectUIEntityUploadingFile(
        name: EnterpriseModuleName
    ): Observable<boolean> {
        return this.selectUIEntity(name).pipe(
            map(entity => (entity ? entity.uploadFile.submitting : false)),
            distinctUntilChanged()
        );
    }

    selectUIEntityUploadFileError(name: EnterpriseModuleName): Observable<any> {
        return this.selectUIEntity(name).pipe(
            map(entity => (entity ? entity.uploadFile.error : null)),
            distinctUntilChanged()
        );
    }

    selectUIEntityDeletingFile(
        name: EnterpriseModuleName
    ): Observable<boolean> {
        return this.selectUIEntity(name).pipe(
            map(entity => (entity ? entity.deleteFile.submitting : false)),
            distinctUntilChanged()
        );
    }

    selectUIEntityRequestingModuleActivation(
        name: EnterpriseModuleName
    ): Observable<boolean> {
        return this.selectUIEntity(name).pipe(
            map(entity =>
                entity ? entity.requestActivation.submitting : false
            ),
            distinctUntilChanged()
        );
    }

    selectUIEntityFile(
        name: EnterpriseModuleName
    ): Observable<{
        id: number;
        name: string;
        url: string;
    }> {
        return this.selectUIEntity(name).pipe(
            map(entity => (entity ? entity.file : null)),
            distinctUntilChanged()
        );
    }
}
