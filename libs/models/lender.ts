import { InvoiceStatus } from './shared';

export type LenderInvoiceStatus =
    | 'PENDING_LENDER_PAYMENT_CONFIRMATION'
    | 'PENDING_PROVIDER_PAYMENT_CONFIRMATION'
    | 'REJECTED'
    | 'PROVIDER_PAYMENT_CONFIRMATION'
    | 'LENDER_PAYMENT_CONFIRMATION';

export const LENDER_INVOICE_STATUS: {
    [status in LenderInvoiceStatus]: status
} = {
    LENDER_PAYMENT_CONFIRMATION: 'LENDER_PAYMENT_CONFIRMATION',
    PENDING_LENDER_PAYMENT_CONFIRMATION: 'PENDING_LENDER_PAYMENT_CONFIRMATION',
    PENDING_PROVIDER_PAYMENT_CONFIRMATION:
        'PENDING_PROVIDER_PAYMENT_CONFIRMATION',
    PROVIDER_PAYMENT_CONFIRMATION: 'PROVIDER_PAYMENT_CONFIRMATION',
    REJECTED: 'REJECTED',
};

export interface LenderInvoice {
    payer: {
        id: number;
        enterpriseName: string;
        nit: string;
    };
    invoiceId: number;
    invoiceNumber: string;
    creationDate: string;
    creationUser: number;
    finishedDate: string;
    status: LenderInvoiceStatus;
    expirationDate: string;
    amount: number;
    startingDate: string;
    discountDueDate: string;
    effectivePaymentDate: string;
    discountPercentage: number;
    discountValue: number;
    currencyCode: string;
    invoiceStatus: InvoiceStatus;
}

export interface LenderInvoiceFundingRequestFormPayload {
    lenderId: number;
    paymentInstructions: string;
    file: File;
}

export interface LenderInvoiceFundingRequest {
    lenderId: number;
    paymentInstructions: string;
    filename?: string;
    contentType?: string;
}

export interface LenderFundingRequest {
    id: number;
    amount: number;
    discountValue: number;
    expectedPaymentDate: string;
    creationDate: string;
    finishDate: string;
    lender: string;
    status: LenderInvoiceStatus;
}

export type LenderInvoiceRequestFilterByType =
    | 'payer'
    | 'status'
    | 'effectivePaymentDate'
    | 'expectedPaymentDate';

export const lenderInvoiceRequestPaginationFilterBy: {
    [type in LenderInvoiceRequestFilterByType]: type
} = {
    effectivePaymentDate: 'effectivePaymentDate',
    expectedPaymentDate: 'expectedPaymentDate',
    payer: 'payer',
    status: 'status',
};

export interface LenderInvoiceRequestPaginationFiltersPayload {
    filter_by: LenderInvoiceRequestFilterByType;
    q: string;
}

export interface PaymentDocumentation {
    filename: string;
    url: string;
}

export interface LenderInvoiceDetailEnterprise {
    id: number;
    enterpriseName: string;
    nit: string;
}

export interface LenderInvoiceDetail {
    invoiceId: number;
    invoiceNumber: string;
    requestId: number;
    amount: number;
    emissionDate: string;
    currencyCode: string;
    fundStatus: LenderInvoiceStatus;
    discountValue: number;
    discountDays: number;
    provider: LenderInvoiceDetailEnterprise;
    payer: LenderInvoiceDetailEnterprise;
    payment: {
        paymentInstruction: string;
        paymentDocumentation: PaymentDocumentation[];
    };
}

export type PatchLenderInvoicePayloadStatus = 'ACCEPTED' | 'REJECTED';

export interface ConfirmPaymentFormPayload {
    comments: string;
    effectivePaymentDate: string;
    effectivePaymentAmount: number;
    file: File;
}

export interface LenderConfirmPaymentPayload {
    comments: string;
    effectivePaymentDate: string;
    effectivePaymentAmount: number;
    filename: string;
    contentType: string;
}

export interface LenderRejectPaymentPayload {
    comments: string;
}

export interface Lender {
    id: number;
    nit: string;
    enterpriseName: string;
    owner: {
        id: number;
        name: string;
        firstSurname: string;
        secondSurname: string;
        email: string;
    };
}

export interface LinkedLender {
    id: number;
    enterpriseName: string;
    nit: string;
    grantedQuota: number;
    availableQuota: number;
    rate: number;
}

export type AdjustmentRequestType = 'PAYMENT' | 'AMOUNT_UPGRADE';

export interface AdjustmentRequestPayload {
    quota: number;
    comments: string;
    type: AdjustmentRequestType;
}

export const adjustmentRequestType: {
    [type in AdjustmentRequestType]: type
} = {
    AMOUNT_UPGRADE: 'AMOUNT_UPGRADE',
    PAYMENT: 'PAYMENT',
};

export type LenderListPaginationFilterByType = 'enterpriseName' | 'nit';

export const lenderListPaginationFilterByType: {
    [type in LenderListPaginationFilterByType]: type
} = {
    nit: 'nit',
    enterpriseName: 'enterpriseName',
};

export interface LenderListPaginationFilterPayload {
    filter_by: LenderListPaginationFilterByType;
    q: string;
}

export type FundingRequestLogRole = 'PAYER' | 'PROVIDER' | 'LENDER';

export const FUDING_REQUEST_LOG_ROLE: {
    [role in FundingRequestLogRole]: role
} = {
    PAYER: 'PAYER',
    PROVIDER: 'PROVIDER',
    LENDER: 'LENDER',
};

export type FundingRequestEventType = 'WAIT' | 'APPROVED' | 'REJECTED';

export const FUDING_REQUEST_EVENT_TYPE: {
    [type in FundingRequestEventType]: type
} = {
    APPROVED: 'APPROVED',
    WAIT: 'WAIT',
    REJECTED: 'REJECTED',
};

export interface FundingRequestLog {
    enterpriseName: string;
    fundingRole: FundingRequestLogRole;
    eventDate: string;
    eventType: FundingRequestEventType;
}
export type LenderListOrderByType = 'availableQuota' | 'grantedQuota' | 'rate';

export const lenderListOrderByType: {
    [type in LenderListOrderByType]: type
} = {
    availableQuota: 'availableQuota',
    grantedQuota: 'grantedQuota',
    rate: 'rate',
};

export interface LenderOrderedListPaginationFilterPayload
    extends LenderListPaginationFilterPayload {
    order_by: LenderListOrderByType;
}

export type LenderCustomAttributeType =
    | 'INTEGER'
    | 'DECIMAL'
    | 'TEXT'
    | 'DATE'
    | 'CURRENCY'
    | 'CHECKBOX'
    | 'RADIO';

export const LENDER_CUSTOM_ATTRIBUTE_TYPES: {
    [type in LenderCustomAttributeType]: type
} = {
    CURRENCY: 'CURRENCY',
    DATE: 'DATE',
    DECIMAL: 'DECIMAL',
    INTEGER: 'INTEGER',
    TEXT: 'TEXT',
    CHECKBOX: 'CHECKBOX',
    RADIO: 'RADIO',
};

export interface LenderCustomAttribute {
    id: any;
    name: string;
    type: LenderCustomAttributeType;
    creationDate: Date;
    options?: Option[];
    attributeId: string;
}

export interface Option {
    id: number;
    value: string;
}
