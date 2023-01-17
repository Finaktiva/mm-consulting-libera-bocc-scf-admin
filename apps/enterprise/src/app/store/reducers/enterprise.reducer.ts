// import { Enterprise } from '@libera/models/enterprise';
// import produce from 'immer';

// import * as fromActions from '../actions/enterprise.actions';

// export interface State {
//     fetch: {
//         loaded: boolean;
//         loading: boolean;
//         error: any;
//     };
//     request: {
//         submitting: boolean;
//         error: any;
//     };
//     value: Enterprise;
// }

// export const initialState: State = {
//     fetch: {
//         loaded: false,
//         loading: false,
//         error: null,
//     },
//     request: {
//         submitting: false,
//         error: null,
//     },
//     value: null,
// };

// export function reducer(
//     state = initialState,
//     action: fromActions.ActionTypesUnion
// ) {
//     return produce(state, draft => {
//         switch (action.type) {
//             case fromActions.EnterpriseActionTypes.GetEnterprise:
//                 draft.fetch.loading = true;
//                 draft.fetch.error = null;
//                 return;
//             case fromActions.EnterpriseActionTypes.GetEnterpriseSuccess:
//                 draft.fetch.loaded = true;
//                 draft.fetch.loading = false;
//                 draft.value = action.payload;
//                 return;
//             case fromActions.EnterpriseActionTypes.GetEnterpriseError:
//                 draft.fetch.loading = false;
//                 draft.fetch.error = action.payload;
//                 return;
//             case fromActions.EnterpriseActionTypes.Request:
//                 draft.request.submitting = true;
//                 draft.request.error = null;
//                 return;
//             case fromActions.EnterpriseActionTypes.RequestSuccess:
//                 draft.request.submitting = false;
//                 draft.value.status = 'EVALUATION_PENDING';
//                 return;
//             case fromActions.EnterpriseActionTypes.RequestError:
//                 draft.request.submitting = false;
//                 draft.request.error = action.payload;
//                 return;
//         }
//     });
// }
