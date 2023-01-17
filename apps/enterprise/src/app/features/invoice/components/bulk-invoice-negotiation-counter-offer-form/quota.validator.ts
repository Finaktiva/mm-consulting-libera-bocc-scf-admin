import { FormGroup } from '@angular/forms';
import { BulkInvoiceNegotiationCounterOfferFormValue, Invoice } from '@libera/models/bulk-invoice-negotiation';

import { calculateDiscount } from '../../utils';

export const quotaValidator = (quota: number, invoices: Invoice[]) => {
    return (form: FormGroup) => {
        const value: BulkInvoiceNegotiationCounterOfferFormValue = form.value;
        const { discountType, percentage } = value;

        if (!discountType || (!percentage && percentage !== 0)) return null;

        const total: number = invoices.reduce(
            (previousValue, invoice) => invoice.amount + previousValue,
            0
        );

        const discount: number = invoices.reduce(
            (previousValue, invoice) =>
                calculateDiscount(
                    invoice.amount,
                    discountType,
                    invoice.expirationDate,
                    invoice.emissionDate,
                    percentage
                ) + previousValue,
            0
        );

        const subtotal: number = total - discount;

        return subtotal > quota
            ? {
                  quota: {
                      available: quota,
                      value: subtotal,
                  },
              }
            : null;
    };
};
