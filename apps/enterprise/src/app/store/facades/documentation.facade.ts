// import { Injectable } from '@angular/core';
// import { select, Store } from '@ngrx/store';

// import { DeleteFile, FetchDocumentation, UploadFile } from '../actions/documentation.actions';
// import { AppState } from '../reducers';
// import {
//     getDocumentationEntities,
//     getDocumentationError,
//     hasInvalidDocumentation,
//     hasLoadedDocumentation,
//     isLoadingDocumentation,
// } from '../selectors/documentation.selectors';

// @Injectable({
//     providedIn: 'root',
// })
// export class DocumentationFacade {
//     hasLoaded$ = this.store.pipe(select(hasLoadedDocumentation));

//     isLoading$ = this.store.pipe(select(isLoadingDocumentation));

//     error$ = this.store.pipe(select(getDocumentationError));

//     entities$ = this.store.pipe(select(getDocumentationEntities));

//     hasInvalidDocumentation$ = this.store.pipe(select(hasInvalidDocumentation));

//     constructor(private store: Store<AppState>) {}

//     fetch() {
//         this.store.dispatch(new FetchDocumentation());
//     }

//     uploadFile(id: number, file: File) {
//         this.store.dispatch(new UploadFile(id, file));
//     }

//     deleteFile(id: number) {
//         this.store.dispatch(new DeleteFile(id));
//     }
// }
