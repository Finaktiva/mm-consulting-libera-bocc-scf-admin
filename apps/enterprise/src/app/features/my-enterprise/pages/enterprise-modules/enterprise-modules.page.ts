import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EnterpriseModule, EnterpriseModuleName } from '@libera/models/enterprise';
import { EnterpriseModuleQuery } from 'apps/enterprise/src/app/state/enterprise-modules/enterprise-module.query';
import {
    EnterpriseModuleStoreService,
} from 'apps/enterprise/src/app/state/enterprise-modules/enterprise-module.store.service';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import { DocumentationDialog } from '../../dialogs/documentation/documentation.dialog';

@Component({
    selector: 'enterprise-modules',
    templateUrl: './enterprise-modules.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterpriseModulesPage implements OnInit {
    isLoading$ = this.query.selectLoading();

    entities$ = this.query.selectEntitiesWithUIExcludingAdmin();

    canRequestModule$ = this.query.selectCanRequestModule();

    constructor(
        private route: ActivatedRoute,
        private query: EnterpriseModuleQuery,
        private storeService: EnterpriseModuleStoreService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.fetchEnterpriseModules();
    }

    onOpenDialog(module: EnterpriseModule) {
        this.dialog.open(DocumentationDialog, {
            data: {
                module: module.name,
                documentationId: module.documentationId,
            },
        });
    }

    fetchEnterpriseModules() {
        this.storeService
            .fetchAll()
            .pipe(
                withLatestFrom(
                    this.route.queryParamMap.pipe(
                        map(
                            queryParamMap =>
                                queryParamMap.get(
                                    'requestedModule'
                                ) as EnterpriseModuleName
                        )
                    )
                ),
                map(([modules, requestedModule]) =>
                    modules.find(module => module.name === requestedModule)
                ),
                filter(module => module && module.status === null)
            )
            .subscribe(module => this.onOpenDialog(module));
    }
}
