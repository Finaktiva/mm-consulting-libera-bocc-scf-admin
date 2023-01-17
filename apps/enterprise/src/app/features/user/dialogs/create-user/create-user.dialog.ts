import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EnterpriseUserPayload } from '@libera/models/enterprise';
import { EnterpriseModuleQuery } from 'apps/enterprise/src/app/state/enterprise-modules/enterprise-module.query';
import {
    EnterpriseModuleStoreService,
} from 'apps/enterprise/src/app/state/enterprise-modules/enterprise-module.store.service';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { CreateUserFacade } from '../../store/facades/create.facade';

@Component({
    selector: 'create-user-dialog',
    templateUrl: './create-user.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserDialog implements OnInit, OnDestroy {
    hasLoaded$ = this.enterpriseModuleQuery.selectLoaded();

    isLoading$ = combineLatest(
        this.enterpriseModuleQuery.selectLoading(),
        this.createUserFacade.isSubmitting$
    ).pipe(map(values => values.includes(true)));

    isSubmitting$ = this.createUserFacade.isSubmitting$;

    error$ = this.enterpriseModuleQuery.selectError();

    modules$ = this.enterpriseModuleQuery.selectEnabledEntities();

    private subscription = new Subscription();

    constructor(
        private dialogRef: MatDialogRef<CreateUserDialog>,
        private enterpriseModuleQuery: EnterpriseModuleQuery,
        private enterpriseModuleStoreService: EnterpriseModuleStoreService,
        private createUserFacade: CreateUserFacade
    ) {}

    ngOnInit() {
        this.fetchModules();

        this.subscription.add(
            this.createUserFacade.createSuccess$.subscribe(() =>
                this.dialogRef.close()
            )
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onReload() {
        this.fetchModules();
    }

    onSubmit(payload: EnterpriseUserPayload) {
        this.createUserFacade.create(payload);
    }

    private fetchModules() {
        this.enterpriseModuleStoreService.fetchAll().subscribe();
    }
}
