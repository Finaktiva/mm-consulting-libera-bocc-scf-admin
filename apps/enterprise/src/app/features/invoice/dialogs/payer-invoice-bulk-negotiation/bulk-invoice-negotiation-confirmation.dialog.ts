import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BulkInvoiceNegotiationFormValue } from '@libera/models/bulk-invoice-negotiation';

import { calculateDiscount } from '../../utils';

@Component({
    selector: 'bulk-invoice-negotiation-confirmation-dialog',
    templateUrl: './bulk-invoice-negotiation-confirmation.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            p.mat-body,
            p.mat-body-2 {
                margin-top: 0 !important;
            }
        `,
    ],
})
export class BulkInvoiceNegotiationConfirmationDialog {
    constructor(
        @Inject(MAT_DIALOG_DATA) public value: BulkInvoiceNegotiationFormValue
    ) {}

    getTotal(): number {
        const invoices = this.value.invoices;

        return invoices.reduce(
            (previousValue, invoice) => invoice.payment.amount + previousValue,
            0
        );
    }

    getDiscount(): number {
        const invoices = this.value.invoices;
        const discountType = this.value.discountType;
        const percentage = this.value.percentage;

        return invoices.reduce(
            (previousValue, invoice) =>
                calculateDiscount(
                    invoice.payment.amount,
                    discountType,
                    invoice.expirationDate,
                    invoice.emissionDate,
                    percentage
                ) + previousValue,
            0
        );
    }

    getSubtotal(): number {
        const total = this.getTotal();
        const discount = this.getDiscount();
        return total - discount;
    }
}
