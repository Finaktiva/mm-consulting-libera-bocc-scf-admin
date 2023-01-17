import { Injectable } from '@angular/core';
import { AuthenticationQuery, EnterpriseDocumentationQuery as Query } from '@libera/state';
import { combineLatest } from 'rxjs';
import { select } from 'rxjs-augmented/operators';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseDocumentationQuery {
    constructor(
        private query: Query,
        private authenticationQuery: AuthenticationQuery
    ) {}

    selectEnterpriseHasInvalidDocumentation(isEnterprise?: boolean) {
        return combineLatest(
            this.query.selectEnterpriseDocumentationIds(
                this.authenticationQuery.getEnterpriseId()
            ),
            this.query.selectEntitiesMap()
        ).pipe(
            select(([ids, entities]) => ids.map(id => entities[id])),
            select(entities =>
                entities.some(entity => isEnterprise ? entity.type.required && !entity.file && entity.type.code != "ENTAILMENT_FORM":entity.type.required && !entity.file)
            )
        );
    }

    selectEnterpriseHasEmptyDocumentation() {
        return combineLatest(
            this.query.selectEnterpriseDocumentationIds(
                this.authenticationQuery.getEnterpriseId()
            ),
            this.query.selectEntitiesMap()
        ).pipe(
            select(([ids, entities]) => ids.map(id => entities[id])),
            select(entities =>
                entities.some(entity => !entity.type.required && !entity.file)
            )
        );
    }

    selectEntityLoading() {
        return this.query.selectEntityLoading(
            this.authenticationQuery.getEnterpriseId()
        );
    }

    selectEntityError() {
        return this.query.selectEntityError(
            this.authenticationQuery.getEnterpriseId()
        );
    }

    selectEntitiesWithUI() {
        return this.query.selectEntitiesWithUI(
            this.authenticationQuery.getEnterpriseId()
        );
    }
}
