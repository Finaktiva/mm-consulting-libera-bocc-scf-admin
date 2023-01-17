import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EnterpriseUserPayload } from '@libera/models/enterprise';
import { EnterpriseModuleQuery } from 'apps/enterprise/src/app/state/enterprise-modules/enterprise-module.query';
import {
    EnterpriseModuleStoreService,
} from 'apps/enterprise/src/app/state/enterprise-modules/enterprise-module.store.service';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserFacade } from '../../store/facades/user.facade';

@Component({
    selector: 'update-user-dialog',
    templateUrl: './update-user.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserDialog implements OnInit, OnDestroy {
    hasLoaded$ = this.enterpriseModuleQuery.selectLoaded();

    isLoading$ = combineLatest(
        this.enterpriseModuleQuery.selectLoading(),
        this.userFacade.isUpdating$
    ).pipe(map(values => values.includes(true)));

    isSubmitting$ = this.userFacade.isUpdating$;

    error$ = this.enterpriseModuleQuery.selectError();

    modules$ = this.enterpriseModuleQuery.selectEnabledEntities();

    user$ = this.userFacade.user$;

    private subscription = new Subscription();

    constructor(
        private dialogRef: MatDialogRef<UpdateUserDialog>,
        private enterpriseModuleQuery: EnterpriseModuleQuery,
        private enterpriseModuleStoreService: EnterpriseModuleStoreService,
        private userFacade: UserFacade
    ) {}

    ngOnInit() {
        this.fetchModules();

        this.subscription.add(
            this.userFacade.updateSuccess$.subscribe(() =>
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
        this.userFacade.update(payload);
    }

    private fetchModules() {
        this.enterpriseModuleStoreService.fetchAll().subscribe();
    }
}
