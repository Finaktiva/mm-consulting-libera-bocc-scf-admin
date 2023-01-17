// import { EnterpriseDocumentation, EnterpriseDocumentationFile } from '@libera/models/enterprise';
// import { Action } from '@ngrx/store';

// export enum DocumentationActionTypes {
//     FetchDocumentation = '[Documentation] Fetch Documentation',
//     GetDocumentation = '[Documentation] Get Documentation',
//     GetDocumentationSuccess = '[Documentation] Get Documentation Success',
//     GetDocumentationError = '[Documentation] Get DocumentationError',
//     UploadFile = '[Documentation] Upload File',
//     UploadFileSuccess = '[Documentation] Upload File Success',
//     UploadFileError = '[Documentation] Upload File Error',
//     DeleteFile = '[Documentation] Delete File',
//     DeleteFileSuccess = '[Documentation] Delete File Success',
//     DeleteFileError = '[Documentation] Delete File Error',
// }

// export class FetchDocumentation implements Action {
//     readonly type = DocumentationActionTypes.FetchDocumentation;
// }

// export class GetDocumentation implements Action {
//     readonly type = DocumentationActionTypes.GetDocumentation;

//     constructor(public payload: number) {}
// }

// export class GetDocumentationSuccess implements Action {
//     readonly type = DocumentationActionTypes.GetDocumentationSuccess;

//     constructor(public payload: EnterpriseDocumentation[]) {}
// }

// export class GetDocumentationError implements Action {
//     readonly type = DocumentationActionTypes.GetDocumentationError;

//     constructor(public payload: any) {}
// }

// export class UploadFile implements Action {
//     readonly type = DocumentationActionTypes.UploadFile;

//     constructor(public id: number, public payload: File) {}
// }

// export class UploadFileSuccess implements Action {
//     readonly type = DocumentationActionTypes.UploadFileSuccess;

//     constructor(
//         public id: number,
//         public payload: EnterpriseDocumentationFile
//     ) {}
// }

// export class UploadFileError implements Action {
//     readonly type = DocumentationActionTypes.UploadFileError;

//     constructor(public id: number, public payload: any) {}
// }

// export class DeleteFile implements Action {
//     readonly type = DocumentationActionTypes.DeleteFile;

//     constructor(public payload: number) {}
// }

// export class DeleteFileSuccess implements Action {
//     readonly type = DocumentationActionTypes.DeleteFileSuccess;

//     constructor(public payload: number) {}
// }

// export class DeleteFileError implements Action {
//     readonly type = DocumentationActionTypes.DeleteFileError;

//     constructor(public id: number, public payload: any) {}
// }

// export type ActionTypesUnion =
//     | GetDocumentation
//     | GetDocumentationSuccess
//     | GetDocumentationError
//     | UploadFile
//     | UploadFileSuccess
//     | UploadFileError
//     | DeleteFile
//     | DeleteFileSuccess
//     | DeleteFileError;
