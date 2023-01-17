import { INVOICE_STATUS, InvoiceStatus } from '@libera/models/shared';

export const INVOICE_NUMBER_LENGTH = 50;

export const INVOICE_VALUE_LENGTH = 24;

export const SELECTABLE_STATUSES: InvoiceStatus[] = [
    INVOICE_STATUS.AVAILABLE,
    INVOICE_STATUS.LOADED,
];
