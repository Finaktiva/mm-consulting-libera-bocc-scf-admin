import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CatalogService } from '@libera/api';
import { UserType } from '@libera/models/authentication';
import { UserRole, UserRoleCreatePayload, UserRoleUpdatePayload } from '@libera/models/user';
import { RoleFilterBy, RoleFilterPayload, RoleStatus } from '@libera/models/role';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { UserRolesCreateStore } from './user-roles-create.store';

import { UserRoleQuery } from './user-roles.query';
import { UserRoleStore } from './user-roles.store';
import { Page } from '@mediomelon/ng-core';

@Injectable({
    providedIn: 'root',
})
export class UserRolesService {
    constructor(
        private query: UserRoleQuery,
        private store: UserRoleStore,
        private catalogService: CatalogService,
        private createStore: UserRolesCreateStore,
        private snackbar: MatSnackBar,
        private translateService: TranslateService,
    ) {}

    fetchCurrentPage() {
        const page = this.query.getPage();
        const filters = this.query.getFilters();

        this.store.fetchPage();

        return this.fetchPage(page, filters);
    }

    changePage(page: Page) {
        const filters = this.query.getFilters();

        this.store.fetchPage(page);

        return this.fetchPage(page, filters);
    }

    changeFilters(filters: RoleFilterPayload) {
        this.store.fetchPageWithFilters(filters);

        const page = this.query.getPage();

        return this.fetchPage(page, filters);
    }

    fetchAll(user: UserType, filter?: RoleFilterPayload) {
        return this.catalogService
            .getRoles(user, filter)
    }

    private fetchPage(page: Page, filters: RoleFilterPayload) {
        return this.catalogService
            .getPage(page, filters)
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }
    
    getRoleByFilter(user: UserType, filter_by: RoleFilterBy, q: string) {
        return this.catalogService
            .getRoles(user, {filter_by, q});
    }

    getRoleByCode(code: string) {
        return this.catalogService.getRoleByCode(code);
    }

    create(payload: UserRoleCreatePayload) {
        this.createStore.submit();
        const { description, acronym, permissions } = payload

        return this.catalogService.createRole({ description, acronym, permissions }).pipe(
            tap(
                payload => {
                    this.createStore.submitSuccess();
                    this.store.insert(payload);
                    this.snackbar.open(
                        this.translateService.instant(
                            `ROLE.CREATE_SUCCESS`
                        ),
                        'OK'
                    );
                },
                ({ error }) => {
                    this.createStore.submitError(error);

                    const code =
                        error.code && error.code.includes('SCF.LIBERA')
                            ? error.code
                            : 'default';

                    this.snackbar.open(
                        this.translateService.instant(
                            `ROLE.ERRORS.${code}`
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    update(role: UserRole, payload: UserRoleUpdatePayload){
        this.store.update(role);
        const {acronym, permissions} = payload;
    
        return this.catalogService.updateUserRole(role, {acronym, permissions}).pipe(
            tap(
                () => {
                    this.snackbar.open(
                        this.translateService.instant(
                            'ROLE.UPDATE_SUCCESS'
                        ),
                        'OK'
                    );
                    this.store.updateSuccess(role, {acronym, permissions});
                },
                error => {
                    const code =
                        error.error.code && error.error.code.includes('SCF.LIBERA')
                            ? error.error.code
                            : 'default';

                    this.snackbar.open(
                        this.translateService.instant(
                            `ROLE.ERRORS.${code}`
                        ),
                        'OK'
                    );
                    this.store.updateError(role, error);
                }
            )
        );
    }

    updateRoleStatus(role: UserRole, status: RoleStatus ){
        return this.catalogService.updateRoleStatus(role, status).pipe(
            tap(
                () => {
                    this.snackbar.open(
                        this.translateService.instant(
                            'ROLE_NOTIFICATIONS.' + status
                        ),
                        'OK'
                    );
                    this.store.updateRoleStatusSuccess(status,role)
                },
                error => {
                    this.snackbar.open(
                        this.translateService.instant(
                            'ROLE_NOTIFICATIONS.ERROR.' + status
                        ),
                        'OK'
                    );
                }
            )
        );
    }
}