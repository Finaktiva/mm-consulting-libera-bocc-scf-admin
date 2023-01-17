import { Moment } from 'moment';
import { EnterpriseSector } from './catalog';
import {
    EnterpriseCustomAttribute,
    EnterpriseCustomAttributeFormPayload,
    EnterpriseType,
} from './enterprise';
import { LenderCustomAttributeType } from './lender';
import {
    Enterprise,
    InvoiceDocumentType,
    InvoicePaymentType,
    InvoiceStatus,
} from './shared';

export interface PayerInvoice {
    id: number;
    invoiceNumber: string;
    alternativeInvoiceId: number;
    bulkNegotiationId?: number;
    documentType: InvoiceDocumentType;
    emissionDate: string;
    creationDate: string;
    expirationDate: string;
    effectivePaymentDate: string;
    status: InvoiceStatus;
    currencyCode: string;
    paymentType: InvoicePaymentType;
    payment: {
        inAdvance: number;
        creditNotesValue: number;
        retentions: number;
        amount: number;
        vat: number;
    };
    customAttributes: EnterpriseCustomAttribute[];
    provider: Enterprise;
    lender?: Enterprise;
    negotiation: {
        discountDays: number;
        discountValue: number;
        expectedPaymentDate: string;
        documentType: InvoiceDocumentType;
        percentage: number;
        paymentDueDays: number;
        validity: {
            from: string;
            until: string;
        };
    };
}

export interface PayerInvoicePayload {
    invoiceNumber: string;
    alternativeInvoiceId: number;
    documentType: InvoiceDocumentType;
    emissionDate: string;
    expirationDate: string;
    currencyCode: string;
    paymentType: InvoicePaymentType;
    payment: {
        inAdvance: number;
        creditNotesValue: number;
        retentions: number;
        amount: number;
        vat: number;
    };
    customAttributes: EnterpriseCustomAttribute[];
    provider: {
        id: number;
        enterpriseName: string;
        nit: string;
    };
}

export interface PayerInvoiceFormPayload {
    invoiceNumber: string;
    alternativeInvoiceId: number;
    documentType: InvoiceDocumentType;
    emissionDate: Moment;
    expirationDate: Moment;
    currencyCode: string;
    paymentType: InvoicePaymentType;
    payment: {
        inAdvance: number;
        creditNotesValue: number;
        retentions: number;
        amount: number;
        vat: number;
    };
    customAttributes: EnterpriseCustomAttributeFormPayload[];
    provider: {
        id: number;
        enterpriseName: string;
        nit: string;
    };
}

export interface Payer {
    id: number;
    enterpriseName: string;
    nit: string;
    sector: EnterpriseSector;
    enterpriseType: EnterpriseType;
    owner: {
        name: string;
        firstSurname: string;
        secondSurname: string;
        email: string;
    };
    customAttributes: PayerCustomAttribute[];
}

export interface PayerCustomAttribute {
    id: number;
    name: string;
    value: string | number;
    type: LenderCustomAttributeType;
    options?: PayerCustomAttributeOption[];
    attributeId: string;
}

export interface PayerCustomAttributePayload {
    id: number;
    value?: string | number;
    options?: ({ id: number })[];
}

export interface PayerCustomAttributeOption {
    id: number;
    value: string;
    isChecked?: boolean;
}

export const INVOICE_PAGINATION_FILTER_BY = {
    PROVIDER: 'provider',
    EXPIRATION_DATE: 'expirationDate',
    INVOICE_NUMBER: 'invoiceNumber',
    STATUS: 'status',
};

export interface PayerInvoicePaginationFiltersPayload {
    filter_by: 'provider' | 'expirationDate' | 'invoiceNumber' | 'status';
    q: string;
    status: InvoiceStatus;
}
export type PayerListPaginationFilterByType =
    | 'enterpriseName'
    | 'nit'
    | 'sector'
    | 'enterpriseType';

export const PayerListPaginationFilterByType: {
    [type in PayerListPaginationFilterByType]: type
} = {
    enterpriseName: 'enterpriseName',
    nit: 'nit',
    sector: 'sector',
    enterpriseType: 'enterpriseType',
};

export interface PayerListPaginationFilterPayload {
    filter_by: PayerListPaginationFilterByType;
    q: string;
}
