import { Injectable } from '@angular/core';
import { EnterpriseUserFilterPayload } from '@libera/models/enterprise';
import { Page } from '@mediomelon/ng-core';
import { select, Store } from '@ngrx/store';

import * as fromActions from '../actions/user.actions';
import {
    getUserListEntities,
    getUserListError,
    getUserListFilters,
    getUserListPageIndex,
    getUserListPageSize,
    getUserListPagination,
    getUserListTotal,
    hasLoadedUserList,
    isLoadingUserList,
} from '../selectors/user.selectors';

@Injectable({
    providedIn: 'root',
})
export class UserListFacade {
    hasLoaded$ = this.store.pipe(select(hasLoadedUserList));

    isLoading$ = this.store.pipe(select(isLoadingUserList));

    error$ = this.store.pipe(select(getUserListError));

    entities$ = this.store.pipe(select(getUserListEntities));

    pagination$ = this.store.pipe(select(getUserListPagination));

    total$ = this.store.pipe(select(getUserListTotal));

    pageIndex$ = this.store.pipe(select(getUserListPageIndex));

    pageSize$ = this.store.pipe(select(getUserListPageSize));

    filters$ = this.store.pipe(select(getUserListFilters));

    constructor(private store: Store<any>) {}

    changePagination(payload: EnterpriseUserFilterPayload) {
        this.store.dispatch(
            new fromActions.BatchChangePagination([
                new fromActions.ChangeFilters(payload),
                new fromActions.ChangePage({ index: 0 }),
                new fromActions.GetPage(),
            ])
        );
    }

    changePage(payload: Page) {
        this.store.dispatch(
            new fromActions.BatchChangePage([
                new fromActions.ChangePage(payload),
                new fromActions.GetPage(),
            ])
        );
    }

    fetchPage() {
        this.store.dispatch(new fromActions.FetchPage());
    }
}
