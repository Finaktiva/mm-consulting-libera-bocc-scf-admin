import { Duty } from "@libera/models/duty";

export const DUTY_MOCK_PRODUCTIVE: Duty = 
    {
        dutyNumber: "12345678910",                 
        payer: "CUSTOMER DG1886425",
        identificationNumber: "NT-8280019826",
        officeCode: "051",
        product: "U028-VEHÍCULOS PRODUCTIVOS",
        dutyValue: "120000000",
        disbursementDate: "2022-11-26T00:14:04.000Z",
        defaulterDays: 781,
        rateType: "D",
        rate: "IBRMV",
        score: -3.1,
        effectiveAnnualRate: 1.66254,
        nextPaymentDate: "2022-11-26T00:14:04.000Z",
        nextFeeValue: 13297367.67,
        capitalBalance: 6319305.61,
        totalBalance: 126925010.81,
        expirationDate: "2026-09-20T00:14:04.000Z",
        status: "A"
    }

export const DUTY_MOCK_UNIDIRECT: Duty = 
    {
        dutyNumber: "12345678911",                 
        payer: "CUSTOMER DG1886425",
        identificationNumber: "NT-8280019826",
        officeCode: "051",
        product: "U036 – UNIDIRECT EXPONENTIAL",
        dutyValue: "120000000",
        disbursementDate: "2022-11-26T00:14:04.000Z",
        defaulterDays: 781,
        rateType: "D",
        rate: "IBRMV",
        score: -3.1,
        effectiveAnnualRate: 1.66254,
        nextPaymentDate: "2022-11-26T00:14:04.000Z",
        nextFeeValue: 13297367.67,
        capitalBalance: 6319305.61,
        totalBalance: 126925010.81,
        expirationDate: "2026-09-20T00:14:04.000Z",
        status: "A"
    }

    export const DUTY_MOCK_FACTORING: Duty = 
    {
        dutyNumber: "12345678912",                 
        payer: "CUSTOMER DG1886425",
        identificationNumber: "NT-8280019826",
        officeCode: "051",
        product: "U030 – FACTORING",
        dutyValue: "120000000",
        disbursementDate: "2022-11-26T00:14:04.000Z",
        defaulterDays: 781,
        rateType: "D",
        rate: "IBRMV",
        score: -3.1,
        effectiveAnnualRate: 1.66254,
        nextPaymentDate: "2022-11-26T00:14:04.000Z",
        nextFeeValue: 13297367.67,
        capitalBalance: 6319305.61,
        totalBalance: 126925010.81,
        expirationDate: "2026-09-20T00:14:04.000Z",
        status: "B"
    }