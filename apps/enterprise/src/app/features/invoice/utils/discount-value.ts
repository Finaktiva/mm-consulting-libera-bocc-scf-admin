import { NegotiationDiscountType } from '@libera/models/shared';
import * as moment from 'moment';

export const calculateDiscountValue = (
    invoiceValue: number,
    discountType: NegotiationDiscountType,
    expirationDate: string,
    emissionDate: string,
    percentage: number
): number => {
    const expirationDateAsMoment = moment(expirationDate, moment.ISO_8601);
    const emissionDateAsMoment = moment(emissionDate, moment.ISO_8601);
    const difference = expirationDateAsMoment.diff(
        emissionDateAsMoment,
        'days'
    );

    switch (discountType) {
        case 'ANTICIPATED_MONTH_RATE': {
            const annualRate = calculateAnticipatedAnnualRate(percentage);
            const amount = calculateMonthRate(
                invoiceValue,
                annualRate,
                difference
            );
            return invoiceValue - amount;
        }
        case 'EXPIRED_MONTH_RATE': {
            const annualRate = calculateExpiredAnnualRate(percentage);
            const amount = calculateMonthRate(
                invoiceValue,
                annualRate,
                difference
            );
            return invoiceValue - amount;
        }
        case 'FIXED_RATE': {
            const amount = invoiceValue * percentageToDecimal(percentage);
            return invoiceValue - amount;
        }
    }
};

export const calculateDiscount = (
    invoiceValue: number,
    discountType: NegotiationDiscountType,
    expirationDate: string,
    emissionDate: string,
    percentage: number
): number => {
    const expirationDateAsMoment = moment(expirationDate, moment.ISO_8601);
    const emissionDateAsMoment = moment(emissionDate, moment.ISO_8601);
    const difference = expirationDateAsMoment.diff(
        emissionDateAsMoment,
        'days'
    );

    switch (discountType) {
        case 'ANTICIPATED_MONTH_RATE': {
            const annualRate = calculateAnticipatedAnnualRate(percentage);
            const amount = calculateMonthRate(
                invoiceValue,
                annualRate,
                difference
            );
            return amount;
        }
        case 'EXPIRED_MONTH_RATE': {
            const annualRate = calculateExpiredAnnualRate(percentage);
            const amount = calculateMonthRate(
                invoiceValue,
                annualRate,
                difference
            );
            return amount;
        }
        case 'FIXED_RATE': {
            const amount = invoiceValue * percentageToDecimal(percentage);
            return amount;
        }
    }
};

const calculateExpiredAnnualRate = (percentage: number): number =>
    ((1 + percentageToDecimal(percentage)) ** 12 - 1) * 100;

const calculateAnticipatedAnnualRate = (percentage: number): number =>
    (((percentageToDecimal(percentage) * 12) / -12 + 1) ** (1 / (-1 / 12)) -
        1) *
    100;

const calculateMonthRate = (
    invoiceValue: number,
    annualRate: number,
    days: number
) => invoiceValue * (1 - 1 / (1 + annualRate / 100) ** (days / 360));

const percentageToDecimal = (percentage: number): number => percentage / 100;
