import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EnterpriseService } from '@libera/api';
import { AuthenticationActionTypes, AuthenticationFacade, LoadState } from '@libera/authentication';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mapTo, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';

// import * as fromActions from '../actions/enterprise.actions';
// import { EnterpriseFacade } from '../facades/enterprise.facade';

// @Injectable()
// export class EnterpriseEffects {
//     @Effect()
//     init$: Observable<fromActions.FetchEnterprise> = this.actions$.pipe(
//         ofType<LoadState>(AuthenticationActionTypes.LoadState),
//         mapTo(new fromActions.FetchEnterprise()),
//         take(1)
//     );

//     @Effect()
//     fetch$: Observable<fromActions.GetEnterprise> = this.actions$.pipe(
//         ofType<fromActions.FetchEnterprise>(
//             fromActions.EnterpriseActionTypes.FetchEnterprise
//         ),
//         withLatestFrom(
//             this.enterpriseFacade.hasLoaded$,
//             this.enterpriseFacade.error$
//         ),
//         filter(([, hasLoaded, error]) => !hasLoaded || !!error),
//         switchMap(() => this.authenticationFacade.enterpriseId$.pipe(take(1))),
//         map(id => new fromActions.GetEnterprise(id))
//     );

//     @Effect()
//     get$: Observable<
//         fromActions.GetEnterpriseSuccess | fromActions.GetEnterpriseError
//     > = this.actions$.pipe(
//         ofType<fromActions.GetEnterprise>(
//             fromActions.EnterpriseActionTypes.GetEnterprise
//         ),
//         switchMap(({ payload }) => {
//             return this.enterpriseService.get(payload).pipe(
//                 map(
//                     enterprise =>
//                         new fromActions.GetEnterpriseSuccess(enterprise)
//                 ),
//                 catchError(error =>
//                     of(new fromActions.GetEnterpriseError(error))
//                 )
//             );
//         })
//     );

//     @Effect()
//     request$: Observable<
//         | fromActions.EnterpriseRequestSuccess
//         | fromActions.EnterpriseRequestError
//     > = this.actions$.pipe(
//         ofType<fromActions.EnterpriseRequest>(
//             fromActions.EnterpriseActionTypes.Request
//         ),
//         withLatestFrom(this.authenticationFacade.enterpriseId$),
//         switchMap(([, id]) => {
//             return this.enterpriseService.request(id).pipe(
//                 map(() => new fromActions.EnterpriseRequestSuccess()),
//                 catchError(error =>
//                     of(new fromActions.EnterpriseRequestError(error))
//                 )
//             );
//         })
//     );

//     @Effect({
//         dispatch: false,
//     })
//     requestSuccess$: Observable<
//         fromActions.EnterpriseRequestSuccess
//     > = this.actions$.pipe(
//         ofType<fromActions.EnterpriseRequestSuccess>(
//             fromActions.EnterpriseActionTypes.RequestSuccess
//         ),
//         tap(() => {
//             this.snackbar.open('Se ha enviado exitosamente su solicitud', 'OK');
//             this.router.navigateByUrl('/documentation/status');
//         })
//     );

//     @Effect({
//         dispatch: false,
//     })
//     requestError$: Observable<
//         fromActions.EnterpriseRequestError
//     > = this.actions$.pipe(
//         ofType<fromActions.EnterpriseRequestError>(
//             fromActions.EnterpriseActionTypes.RequestError
//         ),
//         tap(() =>
//             this.snackbar.open(
//                 'Hubo un error al enviar su solicitud. Vuelva a intentarlo.',
//                 'OK'
//             )
//         )
//     );

//     constructor(
//         private actions$: Actions,
//         private enterpriseService: EnterpriseService,
//         private authenticationFacade: AuthenticationFacade,
//         private enterpriseFacade: EnterpriseFacade,
//         private snackbar: MatSnackBar,
//         private router: Router
//     ) {}
// }
