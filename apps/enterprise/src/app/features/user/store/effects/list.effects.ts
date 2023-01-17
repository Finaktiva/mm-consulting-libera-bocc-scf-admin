import { Injectable } from '@angular/core';
import { EnterpriseService } from '@libera/api';
import { AuthenticationFacade } from '@libera/authentication';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as fromActions from '../actions/user.actions';
import { UserListFacade } from '../facades/list.facade';

@Injectable()
export class UserListEffects {
    @Effect()
    fetchPage$: Observable<fromActions.GetPage> = this.actions$.pipe(
        ofType<fromActions.FetchPage>(fromActions.UserActionTypes.FetchPage),
        withLatestFrom(
            this.userListFacade.hasLoaded$,
            this.userListFacade.error$
        ),
        filter(([, hasLoaded, error]) => !hasLoaded || !!error),
        map(() => new fromActions.GetPage())
    );

    @Effect()
    getPage$: Observable<
        fromActions.GetPageSuccess | fromActions.GetPageError
    > = this.actions$.pipe(
        ofType<
            | fromActions.BatchChangePage
            | fromActions.BatchChangePagination
            | fromActions.GetPage
        >(
            fromActions.UserActionTypes.BatchChangePagination,
            fromActions.UserActionTypes.BatchChangePage,
            fromActions.UserActionTypes.GetPage
        ),
        withLatestFrom(
            this.authenticationFacade.enterpriseId$,
            this.userListFacade.pagination$
        ),
        switchMap(([, id, { page, filters }]) => {
            return this.enterpriseService
                .getUserPage(
                    id,
                    page.index,
                    page.size,
                    filters.filter_by,
                    filters.q
                )
                .pipe(
                    map(payload => new fromActions.GetPageSuccess(payload)),
                    catchError(error => of(new fromActions.GetPageError(error)))
                );
        })
    );

    constructor(
        private actions$: Actions,
        private authenticationFacade: AuthenticationFacade,
        private userListFacade: UserListFacade,
        private enterpriseService: EnterpriseService
    ) {}
}
