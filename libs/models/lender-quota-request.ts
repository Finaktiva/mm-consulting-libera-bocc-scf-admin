export type LenderQuotaRequestStatus =
    | 'PENDING_LENDER_APPROVAL'
    | 'PENDING_PAYER_APPROVAL'
    | 'REJECTED'
    | 'APPROVED'

export const LENDER_QUOTA_REQUEST_STATUS: {
    [status in LenderQuotaRequestStatus]: status
} = {
    APPROVED: 'APPROVED',
    PENDING_LENDER_APPROVAL: 'PENDING_LENDER_APPROVAL',
    PENDING_PAYER_APPROVAL: 'PENDING_PAYER_APPROVAL',
    REJECTED: 'REJECTED',
};

export type LenderQuotaRequestType =
    | 'NEW_FUNDING'
    | 'PAYMENT'
    | 'AMOUNT_UPGRADE';

export const LENDER_QUOTA_REQUEST_TYPE: {
    [type in LenderQuotaRequestType]: type
} = {
    AMOUNT_UPGRADE: 'AMOUNT_UPGRADE',
    NEW_FUNDING: 'NEW_FUNDING',
    PAYMENT: 'PAYMENT',
};

export type LenderQuotaRequestRate =
    | 'DUE_MONTH_RATE'
    | 'FIXED_RATE'
    | 'ANNUAL_RATE'
    | 'ADVANCE_MONTH_RATE'
    | 'PREFERENTIAL_RATE'
    | 'VARIABLE_RATE';

export const LENDER_QUOTA_REQUEST_RATE: {
    [rate in LenderQuotaRequestRate]: rate
} = {
    ADVANCE_MONTH_RATE: 'ADVANCE_MONTH_RATE',
    ANNUAL_RATE: 'ANNUAL_RATE',
    DUE_MONTH_RATE: 'DUE_MONTH_RATE',
    FIXED_RATE: 'FIXED_RATE',
    PREFERENTIAL_RATE: 'PREFERENTIAL_RATE',
    VARIABLE_RATE: 'VARIABLE_RATE',
};

export interface LenderQuotaRequest {
    id: number;
    lender: {
        id: number;
        enterpriseName: string;
        nit: string;
    };
    requestedQuota: number;
    grantedQuota: number;
    creationDate: string;
    status: LenderQuotaRequestStatus;
    payerComments: string;
    lenderComments: string;
    requestType: LenderQuotaRequestType;
    rateType: LenderQuotaRequestRate;
    rate: number;
}
export type LenderQuotaRequestListPaginationFilterByType =
    | 'enterpriseName'
    | 'status';

export const LenderQuotaRequestListPaginationFilterByType: {
    [type in LenderQuotaRequestListPaginationFilterByType]: type
} = {
    status: 'status',
    enterpriseName: 'enterpriseName',
};

export interface LenderQuotaRequestListPaginationFilterPayload {
    filter_by: LenderQuotaRequestListPaginationFilterByType;
    q: string;
}

export interface LenderQuotaRequestPayload {
    grantedQuota: number;
    rateType: LenderQuotaRequestRate;
    rate: number;
    comments: string;
}

export interface QuotaRequest {
    quota: number;
    comments: string;
}

export interface LenderQuotaUpdateStatusPayload {
    status: 'APPROVED' | 'REJECTED';
}

export interface LenderQuotaUpdateStatusFormPayload {
    id: number;
    status: 'APPROVED' | 'REJECTED';
}
