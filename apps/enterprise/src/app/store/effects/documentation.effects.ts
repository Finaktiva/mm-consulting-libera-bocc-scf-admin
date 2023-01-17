// import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { EnterpriseService, S3Service } from '@libera/api';
// import { AuthenticationFacade } from '@libera/authentication';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { Observable, of, combineLatest } from 'rxjs';
// import {
//     catchError,
//     filter,
//     map,
//     mergeMap,
//     switchMap,
//     take,
//     tap,
//     withLatestFrom,
// } from 'rxjs/operators';

// import * as fromActions from '../actions/documentation.actions';
// import { DocumentationFacade } from '../facades/documentation.facade';
// import { EnterpriseFacade } from '../facades/enterprise.facade';

// @Injectable()
// export class DocumentationEffects {
//     @Effect()
//     fetch: Observable<fromActions.GetDocumentation> = this.actions$.pipe(
//         ofType<fromActions.FetchDocumentation>(
//             fromActions.DocumentationActionTypes.FetchDocumentation
//         ),
//         switchMap(action =>
//             combineLatest(
//                 this.documentationFacade.hasLoaded$,
//                 this.documentationFacade.error$
//             ).pipe(map(merged => [action, ...merged]))
//         ),
//         filter(([action, hasLoaded, error]) => !hasLoaded || !!error),
//         switchMap(() => this.authenticationFacade.enterpriseId$.pipe(take(1))),
//         map(id => new fromActions.GetDocumentation(id))
//     );

//     @Effect()
//     get: Observable<
//         fromActions.GetDocumentationSuccess | fromActions.GetDocumentationError
//     > = this.actions$.pipe(
//         ofType<fromActions.GetDocumentation>(
//             fromActions.DocumentationActionTypes.GetDocumentation
//         ),
//         switchMap(({ payload }) => {
//             return this.enterpriseService.getDocumentation(payload).pipe(
//                 map(
//                     documentation =>
//                         new fromActions.GetDocumentationSuccess(documentation)
//                 ),
//                 catchError(error =>
//                     of(new fromActions.GetDocumentationError(error))
//                 )
//             );
//         })
//     );

//     @Effect()
//     uploadFile$: Observable<
//         fromActions.UploadFileSuccess | fromActions.UploadFileError
//     > = this.actions$.pipe(
//         ofType<fromActions.UploadFile>(
//             fromActions.DocumentationActionTypes.UploadFile
//         ),
//         withLatestFrom(this.authenticationFacade.enterpriseId$),
//         mergeMap(([{ id: documentationId, payload: file }, enterpriseId]) => {
//             return this.s3Service.generateUrl(file.name).pipe(
//                 switchMap(url => this.s3Service.upload(url, file)),
//                 switchMap(() =>
//                     this.enterpriseService.linkFileToDocumentation(
//                         enterpriseId,
//                         documentationId,
//                         file.name
//                     )
//                 ),
//                 map(
//                     payload =>
//                         new fromActions.UploadFileSuccess(documentationId, {
//                             ...payload,
//                             name: file.name,
//                         })
//                 ),
//                 catchError(error =>
//                     of(new fromActions.UploadFileError(documentationId, error))
//                 )
//             );
//         })
//     );

//     @Effect()
//     deleteFile$: Observable<
//         fromActions.DeleteFileSuccess | fromActions.DeleteFileError
//     > = this.actions$.pipe(
//         ofType<fromActions.DeleteFile>(
//             fromActions.DocumentationActionTypes.DeleteFile
//         ),
//         withLatestFrom(this.authenticationFacade.enterpriseId$),
//         mergeMap(([{ payload: documentationId }, enterpriseId]) => {
//             return this.enterpriseService
//                 .deleteFileFromDocumentation(enterpriseId, documentationId)
//                 .pipe(
//                     map(
//                         () => new fromActions.DeleteFileSuccess(documentationId)
//                     ),
//                     catchError(error =>
//                         of(
//                             new fromActions.DeleteFileError(
//                                 documentationId,
//                                 error
//                             )
//                         )
//                     )
//                 );
//         })
//     );

//     @Effect({
//         dispatch: false,
//     })
//     deleteFileSuccess$: Observable<
//         fromActions.DeleteFileSuccess
//     > = this.actions$.pipe(
//         ofType<fromActions.DeleteFileSuccess>(
//             fromActions.DocumentationActionTypes.DeleteFileSuccess
//         ),
//         tap(() =>
//             this.snackbar.open(
//                 'Su archivo ha sido eliminado exitosamente.',
//                 'OK'
//             )
//         )
//     );

//     @Effect({
//         dispatch: false,
//     })
//     deleteFileError$: Observable<
//         fromActions.DeleteFileError
//     > = this.actions$.pipe(
//         ofType<fromActions.DeleteFileError>(
//             fromActions.DocumentationActionTypes.DeleteFileError
//         ),
//         tap(() =>
//             this.snackbar.open(
//                 'Hubo un error al eliminar el archivo. Intentelo de nuevo.'
//             )
//         )
//     );

//     constructor(
//         private actions$: Actions,
//         private s3Service: S3Service,
//         private enterpriseService: EnterpriseService,
//         private documentationFacade: DocumentationFacade,
//         private enterpriseFacade: EnterpriseFacade,
//         private authenticationFacade: AuthenticationFacade,
//         private snackbar: MatSnackBar
//     ) {}
// }
