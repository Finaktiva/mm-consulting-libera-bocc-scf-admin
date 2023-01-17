import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '@libera/api';
import {
    ToggleUserStatusPayload,
    User,
    UserPaginationFilterPayload,
    UserPayload,
} from '@libera/models/user';
import { Page } from '@mediomelon/ng-core';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { UserCreateStore } from './user-create.store';
import { UserQuery } from './user.query';
import { UserStore } from './user.store';

@Injectable({
    providedIn: 'root',
})
export class UserStoreService {
    constructor(
        private store: UserStore,
        private createStore: UserCreateStore,
        private query: UserQuery,
        private userService: UserService,
        private snackbar: MatSnackBar,
        private translateService: TranslateService
    ) {}

    toggleStatus({ id, enabled }: ToggleUserStatusPayload) {
        const status = enabled ? 'ENABLED' : 'DISABLED';
        const oldStatus = this.query.getStatus(id);

        this.store.patchStatus(id, status);

        return this.userService.patchStatus(id, status).pipe(
            tap(
                () => {
                    this.store.patchStatusSuccess(id);

                    const message = enabled
                        ? this.translateService.instant(
                              'USER_NOTIFICATIONS.TOGGLE_ACTION_SUCCESS.ENABLED'
                          )
                        : this.translateService.instant(
                              'USER_NOTIFICATIONS.TOGGLE_ACTION_SUCCESS.DISABLED'
                          );

                    this.snackbar.open(message, 'OK');
                },
                error => {
                    this.store.patchStatusError(id, oldStatus, error);

                    const message = enabled
                        ? this.translateService.instant(
                              'USER_NOTIFICATIONS.TOGGLE_ACTION_ERROR.ENABLED'
                          )
                        : this.translateService.instant(
                              'USER_NOTIFICATIONS.TOGGLE_ACTION_ERROR.DISABLED'
                          );

                    this.snackbar.open(message, 'OK');
                }
            )
        );
    }

    create(user: User, userPayload: UserPayload) {
        this.createStore.submit();

        return this.userService.create(userPayload).pipe(
            tap(
                userCreate => {
                    this.createStore.submitSuccess();
                    const roles: any = user.roles
                    this.store.insert({...userCreate, roles: [roles]});
                    this.snackbar.open(
                        this.translateService.instant(
                            'USER_NOTIFICATIONS.CREATE.SUCCESS'
                        ),
                        'OK'
                    );
                },
                error => {
                    this.createStore.submitError(error);
                    this.snackbar.open(
                        this.translateService.instant(
                            'USER_NOTIFICATIONS.CREATE.ERROR'
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    update(id: number, user: User) {
        this.store.update(id);

        return this.userService.update(id, user).pipe(
            tap(
                () => {
                    this.store.updateSuccess(id, user);
                    this.snackbar.open(
                        this.translateService.instant(
                            'USER_NOTIFICATIONS.UPDATE.SUCCESS'
                        ),
                        'OK'
                    );
                },
                error => {
                    this.store.updateError(id, error);
                    this.snackbar.open(
                        this.translateService.instant(
                            'USER_NOTIFICATIONS.UPDATE.ERROR'
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    delete(id: number) {
        this.store.delete(id);

        return this.userService.delete(id).pipe(
            tap(
                () => {
                    this.store.remove(id);
                    this.snackbar.open(
                        this.translateService.instant(
                            'USER_NOTIFICATIONS.DELETE.SUCCESS'
                        ),
                        'OK'
                    );
                },
                error => {
                    this.store.deleteError(id, error);
                    this.snackbar.open(
                        this.translateService.instant(
                            'USER_NOTIFICATIONS.DELETE.ERROR'
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    invite(id: number, sendDocumentation?: boolean, firstTime?: boolean) {
        this.store.invite(id);

        return this.userService.invite(id, firstTime).pipe(
            tap(
                () => {
                    this.store.inviteSuccess(id);
                    if(!sendDocumentation)
                        this.snackbar.open(
                            this.translateService.instant(
                                'USER_NOTIFICATIONS.INVITE.SUCCESS'
                            ),
                            'OK'
                        );
                    else
                        this.snackbar.open(
                            this.translateService.instant(
                                'USER_NOTIFICATIONS.SEND_DOCUMENTATION.SUCCESS'
                            ),
                            'OK'
                        );
                },
                error => {
                    this.store.inviteError(id, error);
                    if(!sendDocumentation)
                        this.snackbar.open(
                            this.translateService.instant(
                                'USER_NOTIFICATIONS.INVITE.ERROR'
                            ),
                            'OK'
                        );
                    else
                        this.snackbar.open(
                            this.translateService.instant(
                                'USER_NOTIFICATIONS.SEND_DOCUMENTATION.ERROR'
                            ),
                            'OK'
                        );
                }
            )
        );
    }

    fetchCurrentPage() {
        // const shouldFetch = this.query.getError() || !this.query.getLoaded();

        // if (!shouldFetch) return EMPTY;

        const page = this.query.getPage();
        const filters = this.query.getFilters();

        this.store.fetchPage();

        return this.fetchPage(page, filters);
    }

    getByFilter(filters: UserPaginationFilterPayload) {
        const page: Page = {
            index: 0,
            size: 10
        }
        return this.userService
            .getPage(page, filters);
    }

    changePage(page: Page) {
        const filters = this.query.getFilters();

        this.store.fetchPage(page);

        return this.fetchPage(page, filters);
    }

    changeFilters(filters: UserPaginationFilterPayload) {
        this.store.fetchPageWithFilters(filters);

        const page = this.query.getPage();

        return this.fetchPage(page, filters);
    }

    private fetchPage(page: Page, filters: UserPaginationFilterPayload) {
        return this.userService
            .getPage(page, filters)
            .pipe(
                tap(
                    payload => this.store.fetchPageSuccess(payload),
                    error => this.store.fetchPageError(error)
                )
            );
    }
}
