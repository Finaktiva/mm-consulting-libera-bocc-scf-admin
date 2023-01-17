import { BulkInvoice } from '../models/bulk-invoice';

export const BULK_INVOICE_MOCK: BulkInvoice = {
    id: 989,
    creationDate: '2019-04-24T16:18:46.114Z',
    creationUser: 1,
    errorCount: 3,
    filename: 'prueba.xlsx',
    folio: '67-a',
    totalCount: 10,
    successCount: 7,
    status: 'COMPLETED',
};

export const BULK_INVOICE_MOCKS: BulkInvoice[] = [
    {
        id: 989,
        creationDate: '2019-04-24T16:18:46.114Z',
        creationUser: 1,
        errorCount: 3,
        filename: 'prueba.xlsx',
        folio: '67-a',
        totalCount: 10,
        successCount: 4,
        status: 'PENDING_COMPLETION',
    },
    {
        id: 12,
        creationDate: '2018-04-24T16:18:46.114Z',
        creationUser: 1,
        errorCount: 3,
        filename: 'prueba.xlsx',
        folio: '67-a',
        totalCount: 10,
        successCount: 4,
        status: 'ERROR',
    },
    {
        id: 11,
        creationDate: '2019-04-24T16:18:46.114Z',
        creationUser: 1,
        errorCount: 3,
        filename: 'prueba.xlsx',
        folio: '67-a',
        totalCount: 17,
        successCount: 14,
        status: 'COMPLETED',
    },
];
