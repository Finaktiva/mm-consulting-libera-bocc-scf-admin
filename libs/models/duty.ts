export interface Duty {
    dutyNumber:           string;
    payer:                string;
    identificationNumber: string;
    officeCode:           string;
    product:              string;
    dutyValue:            string;
    disbursementDate:     string;
    defaulterDays:        number;
    rateType:             string;
    rate:                 string;
    score:                number;
    effectiveAnnualRate:  number;
    nextPaymentDate:      string;
    nextFeeValue:         number;
    capitalBalance:       number;
    totalBalance:         number;
    expirationDate:       string;
    status:               string;
}

export enum DutyNumberTest {
    PRODUCTIVE_NUMBER = '12345678910',
    UNIDIRECT_NUMBER = '12345678911',
    FACTORING_NUMBER = '12345678912',
}