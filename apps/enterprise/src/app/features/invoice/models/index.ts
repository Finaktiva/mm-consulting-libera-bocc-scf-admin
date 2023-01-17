export type BulkInvoiceField =
    | 'INVOICE_NUMBER'
    | 'ALTERNATIVE_INVOICE_ID'
    | 'EXPIRATION_DATE'
    | 'EMISSION_DATE'
    | 'PAYMENT_ADVANCE'
    | 'CREDIT_NOTES_VALUE'
    | 'RETENTIONS'
    | 'VAT'
    | 'AMOUNT'
    | 'NIT';

export const BULK_INVOICE_FIELD: { [field in BulkInvoiceField]: field } = {
    ALTERNATIVE_INVOICE_ID: 'ALTERNATIVE_INVOICE_ID',
    AMOUNT: 'AMOUNT',
    CREDIT_NOTES_VALUE: 'CREDIT_NOTES_VALUE',
    EMISSION_DATE: 'EMISSION_DATE',
    EXPIRATION_DATE: 'EXPIRATION_DATE',
    INVOICE_NUMBER: 'INVOICE_NUMBER',
    NIT: 'NIT',
    PAYMENT_ADVANCE: 'PAYMENT_ADVANCE',
    RETENTIONS: 'RETENTIONS',
    VAT: 'VAT',
};

export interface BulkInvoiceFormColumn {
    field: BulkInvoiceField;
    cells: (string | Date)[];
}
