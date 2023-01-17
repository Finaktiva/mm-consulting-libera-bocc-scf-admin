import { Moment } from 'moment';
import { LenderInvoiceStatus } from './lender';

export type InvoiceDocumentType = 'INVOICE' | 'CREDIT_NOTE';

export const INVOICE_DOCUMENT_TYPE: { [type in InvoiceDocumentType]: type } = {
    CREDIT_NOTE: 'CREDIT_NOTE',
    INVOICE: 'INVOICE',
};

export type InvoicePaymentType =
    | 'PAYCHECK'
    | 'DEPOSIT'
    | 'ELECTRONIC_TRANSFERENCE'
    | 'CASH';

export const INVOICE_PAYMENT_TYPE: { [type in InvoicePaymentType]: type } = {
    CASH: 'CASH',
    DEPOSIT: 'DEPOSIT',
    PAYCHECK: 'PAYCHECK',
    ELECTRONIC_TRANSFERENCE: 'ELECTRONIC_TRANSFERENCE',
};

export type InvoiceStatus =
    | 'LOADED'
    | 'NEGOTIATION_IN_PROGRESS'
    | 'NEGOTIATION_FINISHED'
    | 'FUNDING_IN_PROGRESS'
    | 'FUNDING_FINISHED'
    | 'PAID'
    | 'DELETED'
    | 'AVAILABLE'
    | 'PAYMENT_CONFIRMED'

export const INVOICE_STATUS: { [status in InvoiceStatus]: status } = {
    AVAILABLE: 'AVAILABLE',
    DELETED: 'DELETED',
    FUNDING_FINISHED: 'FUNDING_FINISHED',
    FUNDING_IN_PROGRESS: 'FUNDING_IN_PROGRESS',
    LOADED: 'LOADED',
    NEGOTIATION_FINISHED: 'NEGOTIATION_FINISHED',
    NEGOTIATION_IN_PROGRESS: 'NEGOTIATION_IN_PROGRESS',
    PAID: 'PAID',
    PAYMENT_CONFIRMED:'PAYMENT_CONFIRMED'
};

export type NegotiationDiscountType =
    | 'FIXED_RATE'
    | 'ANTICIPATED_MONTH_RATE'
    | 'EXPIRED_MONTH_RATE';

export const NEGOTIATION_DISCOUNT_TYPE: {
    [type in NegotiationDiscountType]: type
} = {
    ANTICIPATED_MONTH_RATE: 'ANTICIPATED_MONTH_RATE',
    EXPIRED_MONTH_RATE: 'EXPIRED_MONTH_RATE',
    FIXED_RATE: 'FIXED_RATE',
};

export interface NegotiationFormValue {
    discountDueDate: Moment;
    expectedPaymentDate: Moment;
    discountType: NegotiationDiscountType;
    percentage: number;
}

export interface NegotiationPayload {
    discountDueDate: string;
    expectedPaymentDate: string;
    discountType: NegotiationDiscountType;
    percentage: number;
}

export interface NegotiationOffer {
    discountType: NegotiationDiscountType;
    percentage: number;
    discountDueDate: string;
    expectedPaymentDate: string;
    discountValue: number;
}

export type NegotiationStatus =
    | 'PROVIDER_PENDING_RESPONSE'
    | 'PAYER_PENDING_RESPONSE'
    | 'EXPIRED'
    | 'CANCELLED'
    | 'APPROVED'
    | 'REJECTED';

export const NEGOTIATION_STATUS: { [status in NegotiationStatus]: status } = {
    APPROVED: 'APPROVED',
    CANCELLED: 'CANCELLED',
    EXPIRED: 'EXPIRED',
    PAYER_PENDING_RESPONSE: 'PAYER_PENDING_RESPONSE',
    PROVIDER_PENDING_RESPONSE: 'PROVIDER_PENDING_RESPONSE',
    REJECTED: 'REJECTED',
};

export interface InvoiceNegotiation {
    id: number;
    invoiceNumber: string;
    amount: number;
    creationDate: string;
    finishDate: string;
    status: NegotiationStatus;
    payerOffer: NegotiationOffer;
    providerOffer: NegotiationOffer;
}

export interface Enterprise {
    id: number;
    enterpriseName: string;
    nit: string;
    owner: {
        id: number;
        name: string;
        firstSurname: string;
        secondSurname: string;
        email: string;
    };
}

export type NegotiationOfferPayloadStatus =
    | 'APPROVED'
    | 'REJECTED'
    | 'COUNTEROFFERED';

export interface NegotiationOfferPayload {
    status: NegotiationOfferPayloadStatus;
    newOffer?: NegotiationPayload;
}

export type NegotiationLogRole = 'PAYER' | 'PROVIDER';

export const NEGOTIATION_LOG_ROLE: { [role in NegotiationLogRole]: role } = {
    PAYER: 'PAYER',
    PROVIDER: 'PROVIDER',
};

export type NegotiationEventType =
    | 'COUNTEROFFERED'
    | 'CANCELLED'
    | 'EXPIRED'
    | 'APPROVED'
    | 'REJECTED'
    | 'CREATED';

export const NEGOTIATION_EVENT_TYPE: {
    [type in NegotiationEventType]: type
} = {
    APPROVED: 'APPROVED',
    CANCELLED: 'CANCELLED',
    EXPIRED: 'EXPIRED',
    COUNTEROFFERED: 'COUNTEROFFERED',
    REJECTED: 'REJECTED',
    CREATED: 'CREATED'
};

export interface NegotiationLog {
    enterpriseName: string;
    negotiationRole: NegotiationLogRole;
    eventDate: string;
    eventType: NegotiationEventType;
    discountType: NegotiationDiscountType;
    discountPercentage: number;
    discountDueDate: string;
    expectedPaymentDate: string;
    discountValue: number;
}

export interface FilterOption {
    value: any;
    label: string;
}
