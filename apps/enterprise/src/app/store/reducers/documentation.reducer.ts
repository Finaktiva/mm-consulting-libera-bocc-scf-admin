// import { EnterpriseDocumentation } from '@libera/models/enterprise';
// import produce from 'immer';

// import * as fromActions from '../actions/documentation.actions';
// import * as fromEnterpriseActions from '../actions/enterprise.actions';

// export interface EnterpriseDocumentationEntity {
//     uploadFile: {
//         submitting: boolean;
//         error: any;
//     };
//     deleteFile: {
//         submitting: boolean;
//         error: any;
//     };
//     documentation: EnterpriseDocumentation;
// }

// export interface State {
//     loaded: boolean;
//     loading: boolean;
//     error: any;
//     items: EnterpriseDocumentationEntity[];
// }

// export const initialState: State = {
//     loaded: false,
//     loading: false,
//     error: null,
//     items: [],
// };

// export function reducer(
//     state = initialState,
//     action:
//         | fromActions.ActionTypesUnion
//         | fromEnterpriseActions.EnterpriseRequestSuccess
// ) {
//     return produce(state, draft => {
//         switch (action.type) {
//             case fromActions.DocumentationActionTypes.GetDocumentation:
//                 draft.loading = true;
//                 draft.error = null;
//                 return;
//             case fromActions.DocumentationActionTypes.GetDocumentationSuccess:
//                 draft.loaded = true;
//                 draft.loading = false;
//                 draft.items = action.payload.map(documentation =>
//                     getInitialEntity(documentation)
//                 );
//                 return;
//             case fromActions.DocumentationActionTypes.GetDocumentationError:
//                 draft.loaded = true;
//                 draft.loading = false;
//                 draft.error = action.payload;
//                 return;
//             case fromActions.DocumentationActionTypes.UploadFile: {
//                 const entity = draft.items.find(
//                     entity => entity.documentation.id == action.id
//                 );

//                 if (!entity) return;

//                 entity.uploadFile.submitting = true;
//                 entity.uploadFile.error = null;
//                 return;
//             }
//             case fromActions.DocumentationActionTypes.UploadFileSuccess: {
//                 const entity = draft.items.find(
//                     entity => entity.documentation.id == action.id
//                 );

//                 if (!entity) return;

//                 entity.uploadFile.submitting = false;
//                 entity.documentation.file = action.payload;
//                 entity.documentation.status = 'LOADED';
//                 return;
//             }
//             case fromActions.DocumentationActionTypes.UploadFileError: {
//                 const entity = draft.items.find(
//                     entity => entity.documentation.id == action.id
//                 );

//                 if (!entity) return;

//                 entity.uploadFile.submitting = false;
//                 entity.uploadFile.error = action.payload;
//                 return;
//             }
//             case fromActions.DocumentationActionTypes.DeleteFile: {
//                 const entity = draft.items.find(
//                     entity => entity.documentation.id == action.payload
//                 );

//                 if (!entity) return;

//                 entity.deleteFile.submitting = true;
//                 entity.deleteFile.error = null;
//                 return;
//             }
//             case fromActions.DocumentationActionTypes.DeleteFileSuccess: {
//                 const entity = draft.items.find(
//                     entity => entity.documentation.id == action.payload
//                 );

//                 if (!entity) return;

//                 entity.deleteFile.submitting = false;
//                 entity.documentation.file = null;
//                 entity.documentation.status = 'PENDING';
//                 return;
//             }
//             case fromActions.DocumentationActionTypes.DeleteFileError: {
//                 const entity = draft.items.find(
//                     entity => entity.documentation.id == action.id
//                 );

//                 if (!entity) return;

//                 entity.deleteFile.submitting = false;
//                 entity.deleteFile.error = action.payload;
//                 return;
//             }
//             case fromEnterpriseActions.EnterpriseActionTypes.RequestSuccess:
//                 draft.items.forEach(
//                     entity =>
//                         (entity.documentation.status = 'EVALUATION_PENDING')
//                 );
//                 return;
//         }
//     });
// }

// function getInitialEntity(
//     documentation?: EnterpriseDocumentation
// ): EnterpriseDocumentationEntity {
//     return {
//         uploadFile: {
//             submitting: false,
//             error: null,
//         },
//         deleteFile: {
//             submitting: false,
//             error: null,
//         },
//         documentation: documentation ? documentation : null,
//     };
// }
