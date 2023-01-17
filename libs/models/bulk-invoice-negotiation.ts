import { Moment } from 'moment';

import { AvailableEnterprise } from './enterprise';
import { PayerInvoice } from './payer';
import { NegotiationDiscountType, NegotiationStatus } from './shared';

export type BulkInvoiceNegotiationStatus =
    | 'NEGOTIATION_IN_PROGRESS'
    | 'NEGOTIATION_APPROVED'
    | 'NEGOTIATION_REJECTED'
    | 'NEGOTIATION_CANCELED'
    | 'NEGOTIATION_EXPIRED';

export const BULK_INVOICE_NEGOTIATION_STATUS: {
    [status in BulkInvoiceNegotiationStatus]: status
} = {
    NEGOTIATION_APPROVED: 'NEGOTIATION_APPROVED',
    NEGOTIATION_CANCELED: 'NEGOTIATION_CANCELED',
    NEGOTIATION_EXPIRED: 'NEGOTIATION_EXPIRED',
    NEGOTIATION_IN_PROGRESS: 'NEGOTIATION_IN_PROGRESS',
    NEGOTIATION_REJECTED: 'NEGOTIATION_REJECTED',
};

export interface PayerBulkInvoiceNegotiation {
    id: number;
    folio: string;
    provider: {
        id: number;
        enterpriseName: string;
    };
    amountInvoices: number;
    amount: number;
    creationDate: string;
    creationUser: number;
    finishDate: string;
    status: BulkInvoiceNegotiationStatus;
}

export interface ProviderBulkInvoiceNegotiation {
    id: number;
    folio: string;
    payer: {
        id: number;
        enterpriseName: string;
    };
    amountInvoices: number;
    amount: number;
    creationDate: string;
    status: BulkInvoiceNegotiationStatus;
}

export interface BulkInvoiceNegotiationOffer {
    discountValue: number;
    discountType: NegotiationDiscountType;
    percentage: number;
    discountDueDate: string;
    expectedPaymentDate: string;
}

export interface Invoice {
    id: number;
    invoiceNumber: string;
    provider: {
        id: number;
        enterpriseName: string;
    };
    nit: string;
    expirationDate: string;
    emissionDate: string;
    amount: number;
    currencyCode: string;
}

export interface BulkInvoiceNegotiation {
    status: NegotiationStatus;
    payerOffer: BulkInvoiceNegotiationOffer;
    providerOffer: BulkInvoiceNegotiationOffer;
}

export interface BulkInvoiceNegotiationDetail {
    id: number;
    folio: string;
    amountInvoices: number;
    amount: number;
    creationDate: string;
    creationUser: number;
    finishDate: string;
    status: BulkInvoiceNegotiationStatus;
    provider: {
        id: number;
        enterpriseName: string;
    };
    lender: {
        id: number;
        enterpriseName: string;
        availableQuota: number;
    };
    negotiation: BulkInvoiceNegotiation;
    invoices: Invoice[];
}

export type BulkInvoiceNegotiationListPaginationFilterByType =
    | 'enterpriseName'
    | 'creationDate'
    | 'status'
    | 'folio';

export const bulkInvoiceNegotiationListPaginationFilterByType: {
    [type in BulkInvoiceNegotiationListPaginationFilterByType]: type
} = {
    enterpriseName: 'enterpriseName',
    creationDate: 'creationDate',
    folio: 'folio',
    status: 'status',
};

export interface BulkInvoiceNegotiationListFormValue {
    filter_by: BulkInvoiceNegotiationListPaginationFilterByType;
    q: string | Moment | BulkInvoiceNegotiationStatus;
}

export interface BulkInvoiceNegotiationListPaginationFilterPayload {
    filter_by: BulkInvoiceNegotiationListPaginationFilterByType;
    q: string;
}

export interface BulkInvoiceNegotiationFormValue {
    discountType: NegotiationDiscountType;
    percentage: number;
    discountDueDate: Moment;
    lender: AvailableEnterprise;
    expectedPaymentDate: Moment;
    // currentAmount: number;
    invoices: PayerInvoice[];
}

export interface BulkInvoiceNegotiationPayload {
    discountType: NegotiationDiscountType;
    percentage: number;
    discountDueDate: string;
    lenderId: number;
    expectedPaymentDate: string;
    currentAmount: number;
    invoices: number[];
}

export interface BulkInvoiceNegotiationCounterOfferFormValue {
    discountType: NegotiationDiscountType;
    percentage: number;
    discountDueDate: Moment;
    expectedPaymentDate: Moment;
}

export interface BulkInvoiceNegotiationCounterOfferPayload {
    currentAmount: number;
    discountType: NegotiationDiscountType;
    percentage: number;
    discountDueDate: string;
    expectedPaymentDate: string;
}

export type BulkInvoiceNegotiationCounterOfferAction =
    | 'APPROVED'
    | 'REJECTED'
    | 'COUNTEROFFERED';
