// import { Injectable } from '@angular/core';
// import { select, Store } from '@ngrx/store';

// import * as fromActions from '../actions/enterprise.actions';
// import { AppState } from '../reducers';
// import {
//     getEnterprise,
//     getEnterpriseError,
//     hasLoadedEnterprise,
//     isLoadingEnterprise,
//     isSubmittingRequest,
// } from '../selectors/enterprise.selectors';

// @Injectable({
//     providedIn: 'root',
// })
// export class EnterpriseFacade {
//     hasLoaded$ = this.store.pipe(select(hasLoadedEnterprise));

//     isLoading$ = this.store.pipe(select(isLoadingEnterprise));

//     error$ = this.store.pipe(select(getEnterpriseError));

//     enterprise$ = this.store.pipe(select(getEnterprise));

//     isSubmittingRequest$ = this.store.pipe(select(isSubmittingRequest));

//     constructor(private store: Store<AppState>) {}

//     fetch() {
//         this.store.dispatch(new fromActions.FetchEnterprise());
//     }

//     request() {
//         this.store.dispatch(new fromActions.EnterpriseRequest());
//     }
// }
