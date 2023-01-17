import { LENDER_INVOICE_STATUS, LenderFundingRequest, FundingRequestLog } from '@libera/models/lender';

export const FUNDING_REQUEST_MOCK: LenderFundingRequest = {
    id: 1,
    amount: 4500,
    discountValue: 1,
    expectedPaymentDate: '12-29-19',
    creationDate: '12-12-12',
    finishDate: '12-11-19',
    lender: 'MEDIO MELON',
    status: LENDER_INVOICE_STATUS.PENDING_LENDER_PAYMENT_CONFIRMATION,
};

export const LIST_FUNDING_REQUEST_MOCK: LenderFundingRequest[] = [
    {
        id: 23,
        amount: 2000,
        discountValue: 1,
        expectedPaymentDate: '12-12-12',
        creationDate: '12-12-12',
        finishDate: '12-11-19',
        lender: 'Banamex',
        status: LENDER_INVOICE_STATUS.PENDING_LENDER_PAYMENT_CONFIRMATION,
    },
    {
        id: 25,
        amount: 3000,
        discountValue: 1,
        expectedPaymentDate: '11-11-11',
        creationDate: '12-12-12',
        finishDate: '12-11-19',
        lender: 'Facebook',
        status: LENDER_INVOICE_STATUS.REJECTED,
    },
    {
        id: 36,
        amount: 3000,
        discountValue: 1,
        expectedPaymentDate: '10-10-10',
        creationDate: '12-12-12',
        finishDate: '12-11-19',
        lender: 'Scotiabank',
        status: LENDER_INVOICE_STATUS.LENDER_PAYMENT_CONFIRMATION,
    },
];

export const FUNDING_REQUEST_LOG_MOCKS: FundingRequestLog[] = [
    {
        enterpriseName: 'Medio melon',
        eventDate: '2019-04-24T16:18:46.114Z',
        eventType: 'APPROVED',
        fundingRole: 'PAYER',
    },
    {

        enterpriseName: 'Facebook',
        eventDate: '2019-04-24T22:18:46.114Z',
        eventType: 'WAIT',
        fundingRole: 'PROVIDER',
    },
    {

        enterpriseName: 'Facebook',
        eventDate: '2019-04-22T22:18:46.114Z',
        eventType: 'REJECTED',
        fundingRole: 'PAYER',
    },
    {
        enterpriseName: 'Facebook',
        eventDate: '2019-04-24T22:18:46.114Z',
        eventType: 'WAIT',
        fundingRole: 'PROVIDER',
    },
];