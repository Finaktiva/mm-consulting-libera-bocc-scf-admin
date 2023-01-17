import { EnterpriseCustomAttribute, EnterpriseCustomAttributeFormPayload } from './enterprise';
import { InvoiceDocumentType, InvoicePaymentType } from './shared';

export type BulkInvoiceStatus = 'PENDING_COMPLETION' | 'COMPLETED' | 'ERROR';

export const BULK_INVOICE_STATUS: { [status in BulkInvoiceStatus]: status } = {
    COMPLETED: 'COMPLETED',
    ERROR: 'ERROR',
    PENDING_COMPLETION: 'PENDING_COMPLETION',
};

export interface BulkInvoice {
    id: number;
    filename: string;
    status: BulkInvoiceStatus;
    folio: string;
    creationDate: string;
    creationUser: number;
    totalCount: number;
    successCount: number;
    errorCount: number;
}

export interface InvoicePayload {
    invoiceNumber: string;
    alternativeInvoiceId: string;
    expirationDate: string;
    emissionDate: string;
    payment: {
        inAdvance: number;
        creditNotesValue: number;
        retentions: number;
        vat: number;
        amount: number;
    };
    providerNIT: string;
}

interface CustomAttribute {
    id: number;
    value: string | number;
}

export interface BulkInvoiceFormPayload {
    file: File;
    currencyCode: string;
    documentType: InvoiceDocumentType;
    paymentType: InvoicePaymentType;
    invoices: InvoicePayload[];
    customAttributes: CustomAttribute[];
}

export interface BulkInvoicePayload {
    filename: string;
    currencyCode: string;
    documentType: InvoiceDocumentType;
    paymentType: InvoicePaymentType;
    invoices: InvoicePayload[];
    customAttributes: CustomAttribute[];
}
