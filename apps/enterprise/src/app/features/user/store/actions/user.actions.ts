import {
    EnterpriseStatus,
    EnterpriseUser,
    EnterpriseUserFilterPayload,
    EnterpriseUserPayload,
} from '@libera/models/enterprise';
import { BatchAction } from '@libera/shared';
import { Page, PaginationPayload } from '@mediomelon/ng-core';
import { Action } from '@ngrx/store';

export enum UserActionTypes {
    BatchChangePagination = '[User] Batch Change Pagination',
    BatchChangePage = '[User] Batch Change Page',
    ChangeFilters = '[User] Change Filters',
    ChangePage = '[User] Change Page',
    FetchPage = '[User] Fetch Page',
    GetPage = '[User] Get Page',
    GetPageSuccess = '[User] Get Page Success',
    GetPageError = '[User] Get Page Error',
    PatchStatus = '[User] Patch Status',
    PatchStatusSuccess = '[User] Patch Status Success',
    PatchStatusError = '[User] Patch Status Error',
    CreateUser = '[User] Create User',
    CreateUserSuccess = '[User] Create User Success',
    CreateUserError = '[User] Create User Error',
    OpenEditDialog = '[User] Open Edit User Dialog',
    CloseEditDialog = '[User] Close Edit User Dialog',
    UpdateUser = '[User] Update User',
    UpdateUserSuccess = '[User] Update User Success',
    UpdateUserError = '[User] Update User Error',
    OpenDeleteDialog = '[User] Open Delete User Dialog',
    CloseDeleteDialog = '[User] Close Delete User Dialog',
    DeleteUser = '[User] Delete User',
    DeleteUserSuccess = '[User] Delete User Success',
    DeleteUserError = '[User] Delete User Error',
    ResendInvitation = '[User] Resend Invitation',
    ResendInvitationSuccess = '[User] Resend Invitation Success',
    ResendInvitationError = '[User] Resend Invitation Error',
}

export class ChangeFilters implements Action {
    readonly type = UserActionTypes.ChangeFilters;

    constructor(public payload: EnterpriseUserFilterPayload) {}
}

export class ChangePage implements Action {
    readonly type = UserActionTypes.ChangePage;

    constructor(public payload: Page) {}
}

export class FetchPage implements Action {
    readonly type = UserActionTypes.FetchPage;
}

export class GetPage implements Action {
    readonly type = UserActionTypes.GetPage;
}

type BatchChangePaginationActions = [ChangeFilters, ChangePage, GetPage];

export class BatchChangePagination extends BatchAction {
    readonly type = UserActionTypes.BatchChangePagination;

    constructor(payload: BatchChangePaginationActions) {
        super(payload);
    }
}

type BatchChangePageActions = [ChangePage, GetPage];

export class BatchChangePage extends BatchAction {
    readonly type = UserActionTypes.BatchChangePage;

    constructor(payload: BatchChangePageActions) {
        super(payload);
    }
}

export class GetPageSuccess implements Action {
    readonly type = UserActionTypes.GetPageSuccess;

    constructor(public payload: PaginationPayload<EnterpriseUser[]>) {}
}

export class GetPageError implements Action {
    readonly type = UserActionTypes.GetPageError;

    constructor(public payload: any) {}
}

export class PatchStatus implements Action {
    readonly type = UserActionTypes.PatchStatus;

    constructor(public id: number, public payload: EnterpriseStatus) {}
}

export class PatchStatusSuccess implements Action {
    readonly type = UserActionTypes.PatchStatusSuccess;

    constructor(public id: number) {}
}

export class PatchStatusError implements Action {
    readonly type = UserActionTypes.PatchStatusError;

    constructor(
        public id: number,
        public status: EnterpriseStatus,
        public payload: any
    ) {}
}

export class CreateUser implements Action {
    readonly type = UserActionTypes.CreateUser;

    constructor(public payload: EnterpriseUserPayload) {}
}

export class CreateUserSuccess implements Action {
    readonly type = UserActionTypes.CreateUserSuccess;

    constructor(public payload: EnterpriseUser) {}
}

export class CreateUserError implements Action {
    readonly type = UserActionTypes.CreateUserError;

    constructor(public payload: any) {}
}

export class OpenDeleteDialog implements Action {
    readonly type = UserActionTypes.OpenDeleteDialog;

    constructor(public payload: number) {}
}

export class CloseDeleteDialog implements Action {
    readonly type = UserActionTypes.CloseDeleteDialog;
}

export class DeleteUser implements Action {
    readonly type = UserActionTypes.DeleteUser;

    constructor(public payload: number) {}
}

export class DeleteUserSuccess implements Action {
    readonly type = UserActionTypes.DeleteUserSuccess;

    constructor(public payload: number) {}
}

export class DeleteUserError implements Action {
    readonly type = UserActionTypes.DeleteUserError;

    constructor(public id: number, public payload: any) {}
}

export class OpenEditDialog implements Action {
    readonly type = UserActionTypes.OpenEditDialog;

    constructor(public payload: number) {}
}

export class CloseEditDialog implements Action {
    readonly type = UserActionTypes.CloseEditDialog;
}

export class UpdateUser implements Action {
    readonly type = UserActionTypes.UpdateUser;

    constructor(public id: number, public payload: EnterpriseUserPayload) {}
}

export class UpdateUserSuccess implements Action {
    readonly type = UserActionTypes.UpdateUserSuccess;

    constructor(public id: number, public payload: EnterpriseUserPayload) {}
}

export class UpdateUserError implements Action {
    readonly type = UserActionTypes.UpdateUserError;

    constructor(public id: number, public payload: any) {}
}

export class ResendInvitation implements Action {
    readonly type = UserActionTypes.ResendInvitation;
    constructor(public id: number) {}
}

export class ResendInvitationSuccess implements Action {
    readonly type = UserActionTypes.ResendInvitationSuccess;
}

export class ResendInvitationError implements Action {
    readonly type = UserActionTypes.ResendInvitationError;
    constructor(public payload: any) {}
}

export type UserActionsUnion =
    | ChangeFilters
    | ChangePage
    | GetPage
    | GetPageSuccess
    | GetPageError
    | PatchStatus
    | PatchStatusSuccess
    | PatchStatusError
    | CreateUser
    | CreateUserSuccess
    | CreateUserError
    | OpenEditDialog
    | CloseEditDialog
    | UpdateUser
    | UpdateUserSuccess
    | UpdateUserError
    | OpenDeleteDialog
    | CloseDeleteDialog
    | DeleteUser
    | DeleteUserSuccess
    | DeleteUserError
    | ResendInvitation
    | ResendInvitationSuccess
    | ResendInvitationError;
