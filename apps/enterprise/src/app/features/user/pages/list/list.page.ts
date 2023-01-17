import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS } from '@libera/constants';
import {
    EnterpriseUserFilterPayload,
    ToggleEnterpriseUserStatusPayload,
} from '@libera/models/enterprise';

import { CreateUserDialog } from '../../dialogs/create-user/create-user.dialog';
import { UserListFacade } from '../../store/facades/list.facade';
import { UserFacade } from '../../store/facades/user.facade';

@Component({
    selector: 'user-list',
    templateUrl: './list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListPage implements OnInit {
    isLoading$ = this.userListFacade.isLoading$;

    error$ = this.userListFacade.error$;

    entities$ = this.userListFacade.entities$;

    index$ = this.userListFacade.pageIndex$;

    size$ = this.userListFacade.pageSize$;

    total$ = this.userListFacade.total$;

    filters$ = this.userListFacade.filters$;

    PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

    constructor(
        private userListFacade: UserListFacade,
        private userFacade: UserFacade,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.onFetchPage();
    }

    onToggleStatus(payload: ToggleEnterpriseUserStatusPayload) {
        this.userFacade.toggleStatus(payload);
    }

    onChangeFilters(payload: EnterpriseUserFilterPayload) {
        this.userListFacade.changePagination(payload);
    }

    onChangePage(payload: PageEvent) {
        this.userListFacade.changePage({
            index: payload.pageIndex,
            size: payload.pageSize,
        });
    }

    onReload() {
        this.onFetchPage();
    }

    onInviteUser() {
        this.dialog.open(CreateUserDialog);
    }

    onEditUser(id: number) {
        this.userFacade.openEditDialog(id);
    }

    onDeleteUser(id: number) {
        this.userFacade.openDeleteDialog(id);
    }

    onResendInvitation(id: number) {
        this.userFacade.resendInvitation(id);
    }

    private onFetchPage() {
        this.userListFacade.fetchPage();
    }
}
