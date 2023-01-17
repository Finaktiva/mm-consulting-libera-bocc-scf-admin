// import { Enterprise } from '@libera/models/enterprise';
// import { Action } from '@ngrx/store';

// export enum EnterpriseActionTypes {
//     FetchEnterprise = '[Enterprise] Fetch Enterprise',
//     GetEnterprise = '[Enterprise] Get Enterprise',
//     GetEnterpriseSuccess = '[Enterprise] Get Enterprise Success',
//     GetEnterpriseError = '[Enterprise] Get Enterprise Error',
//     Request = '[Enterprise] Request',
//     RequestSuccess = '[Enterprise] Request Success',
//     RequestError = '[Enterprise] Request Error',
// }

// export class FetchEnterprise implements Action {
//     readonly type = EnterpriseActionTypes.FetchEnterprise;
// }

// export class GetEnterprise implements Action {
//     readonly type = EnterpriseActionTypes.GetEnterprise;

//     constructor(public payload: number) {}
// }

// export class GetEnterpriseSuccess implements Action {
//     readonly type = EnterpriseActionTypes.GetEnterpriseSuccess;

//     constructor(public payload: Enterprise) {}
// }

// export class GetEnterpriseError implements Action {
//     readonly type = EnterpriseActionTypes.GetEnterpriseError;

//     constructor(public payload: any) {}
// }

// export class EnterpriseRequest implements Action {
//     readonly type = EnterpriseActionTypes.Request;
// }

// export class EnterpriseRequestSuccess implements Action {
//     readonly type = EnterpriseActionTypes.RequestSuccess;
// }

// export class EnterpriseRequestError implements Action {
//     readonly type = EnterpriseActionTypes.RequestError;

//     constructor(public payload: any) {}
// }

// export type ActionTypesUnion =
//     | GetEnterprise
//     | GetEnterpriseSuccess
//     | GetEnterpriseError
//     | EnterpriseRequest
//     | EnterpriseRequestSuccess
//     | EnterpriseRequestError;
