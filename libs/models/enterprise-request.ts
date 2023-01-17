import { EnterpriseModuleName, EnterpriseStatus } from './enterprise';

export type EnterpriseRequestType =
    | 'ENTERPRISE_LINKING'
    | 'ENTERPRISE_MODULE_ACTIVATION';

export const ENTERPRISE_REQUEST_TYPE: {
    [type in EnterpriseRequestType]: EnterpriseRequestType
} = {
    ENTERPRISE_LINKING: 'ENTERPRISE_LINKING',
    ENTERPRISE_MODULE_ACTIVATION: 'ENTERPRISE_MODULE_ACTIVATION',
};

export type EnterpriseRequestStatus =
    | 'EVALUATION_PENDING'
    | 'ACCEPTED'
    | 'REJECTED';

export const ENTERPRISE_REQUEST_STATUS: {
    [status in EnterpriseRequestStatus]: EnterpriseRequestStatus
} = {
    EVALUATION_PENDING: 'EVALUATION_PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
};

interface EnterpriseOwner {
    id?: number;
    name: string;
    firstSurname: string;
    secondSurname: string;
}

export interface EnterpriseDetail {
    id: number;
    enterpriseName: string;
    nit: string;
    email: string;
    owner: EnterpriseOwner;
    status: EnterpriseStatus;
    providerDocumentType: string;
    productType: string;
    department: string; 
    city: string;
    economicActivity: {
        ciiuCode: string,
        description: string,
        economicSector:{
            id: number,
            description: string
        }
    }; 
    phoneExt: string;
    phoneNumber: string;
    disbursementContract: EnterpriseDisbursementContract;
    comesFromAPI: boolean;
}

export interface EnterpriseDisbursementContract{
    type: string;
    account: EnterpriseAccount;
    bankCertificationFile: BankCertificationFile;
}

export interface BankCertificationFile{
    id: string;
    name: string;
    url: string;
    
}
export interface EnterpriseAccount{
    type: string;
    number: string;
    bank: EnterpriseBank;
}

export interface EnterpriseBank{
    code: string;
    name: string;
}

export interface EnterpriseModuleRequest {
    requestId: number;
    enterpriseId: number;
    enterpriseName: string;
    nit: string;
    email: string;
    modules: EnterpriseModuleName[];
    documentationCount: string;
    requestDate: string;
    moduleRequested: EnterpriseModuleName;
    status: EnterpriseRequestStatus;
    owner: EnterpriseOwner;
}

export interface EnterpriseModuleRequestDetail {
    requestId: number;
    status: EnterpriseRequestStatus;
    requestDate: string;
    enterpriseRequester: EnterpriseDetail;
}

export interface EnterpriseLinkRequest {
    requestId: number;
    status: EnterpriseRequestStatus;
    requestDate: string;
    vinculationType: EnterpriseModuleName;
    enterpriseRequested: EnterpriseDetail;
    enterpriseRequester: EnterpriseDetail;
}

export type EnterpriseRequestPaginationFilterBy =
    | 'DATE'
    | 'NIT'
    | 'ENTERPRISE_NAME'
    | 'status';

export const ENTERPRISE_REQUEST_PAGINATION_FILTER_BY = {
    ENTERPRISE_NAME: 'ENTERPRISE_NAME',
    NIT: 'NIT',
    DATE: 'DATE',
    STATUS: 'status',
};

export interface EnterpriseRequestPaginationFilters {
    filter_by: EnterpriseRequestPaginationFilterBy;
    q: string;
    status: EnterpriseRequestStatus;
}

export interface ChangeEnterpriseRequestStatusPayload {
    status: EnterpriseRequestStatus;
    explanation: string;
    sendEmail: boolean;
}
