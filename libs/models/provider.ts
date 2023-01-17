import {
    Enterprise,
    InvoiceDocumentType,
    InvoicePaymentType,
    InvoiceStatus,
    NegotiationDiscountType,
} from './shared';
import { EnterpriseDocumentationFile } from './enterprise';

export interface ProviderInvoice {
    id: number;
    invoiceNumber: string;
    alternativeInvoiceId: number;
    bulkNegotiationId?:number;
    documentType: InvoiceDocumentType;
    emissionDate: string;
    creationDate: string;
    creationUser: number;
    expirationDate: string;
    effectivePaymentDate: string;
    status: InvoiceStatus;
    currencyCode: string;
    payment: {
        inAdvance: number;
        creditNotesValue: number;
        retentions: number;
        amount: number;
        vat: number;
        paymentType: InvoicePaymentType;
    };
    payer: Enterprise;
    negotiation: {
        discountType: NegotiationDiscountType;
        discountDueDate: string;
        discountValue: number;
        expectedPaymentDate: string;
        percentage: number;
    };
}

export interface ProviderPayment {
    id: number;
    lenderName: string;
    comments: string;
    effectivePaymentDate: Date;
    effectivePaymentAmount: number;
    file: EnterpriseDocumentationFile;
}

export const PROVIDER_INVOICE_PAGINATION_FILTER_BY = {
    INVOICE_NUMBER: 'invoiceNumber',
    PAYER: 'payer',
    NIT: 'nit',
    STARTING_DATE: 'startingDate',
    EFFECTIVE_PAYMENT_DATE: 'effectivePaymentDate',
    DISCOUNT_DUE_DATE: 'discountDueDate',
    DISCOUNT_PERCENTAGE: 'discountPercentage',
    DISCOUNT_VALUE: 'discountValue',
};

export interface ProviderInvoicePaginationFiltersPayload {
    filter_by:
        | 'discountDueDate'
        | 'discountPercentage'
        | 'discountValue'
        | 'invoiceNumber'
        | 'payer'
        | 'nit'
        | 'startingDate'
        | 'effectivePaymentDate';
    q: string;
}
