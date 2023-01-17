import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
    BulkInvoiceNegotiationCounterOfferFormValue,
    BulkInvoiceNegotiationCounterOfferPayload,
    Invoice,
} from '@libera/models/bulk-invoice-negotiation';
import { NEGOTIATION_DISCOUNT_TYPE } from '@libera/models/shared';
import { FormBase } from '@mediomelon/ng-core';

import { calculateDiscount } from '../../utils';
import { quotaValidator } from './quota.validator';

@Component({
    selector: 'bulk-invoice-negotiation-counter-offer-form',
    templateUrl: './bulk-invoice-negotiation-counter-offer-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'standard' },
        },
    ],
})
export class BulkInvoiceNegotiationCounterOfferFormComponent extends FormBase
    implements OnInit {
    @Input() invoices: Invoice[];

    @Input() availableQuota: number;

    DISCOUNT_TYPE = NEGOTIATION_DISCOUNT_TYPE;

    tomorrow: Date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    constructor(private formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.form = this.formBuilder.group(
            {
                discountType: [null, Validators.required],
                percentage: [
                    null,
                    [
                        Validators.required,
                        Validators.min(0),
                        Validators.max(100),
                    ],
                ],
                expectedPaymentDate: [null, Validators.required],
                discountDueDate: [null, Validators.required],
            },
            { validators: quotaValidator(this.availableQuota, this.invoices) }
        );
    }

    getFormValue(): BulkInvoiceNegotiationCounterOfferPayload {
        const {
            expectedPaymentDate,
            discountDueDate,
            discountType,
            percentage,
        } = this.form.value as BulkInvoiceNegotiationCounterOfferFormValue;

        const invoices = this.invoices;

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

        const subtotal: number =
            discount || discount == 0 ? total - discount : total;

        return {
            percentage,
            discountType,
            expectedPaymentDate: expectedPaymentDate.toISOString(),
            discountDueDate: discountDueDate.toISOString(),
            currentAmount: subtotal,
        };
    }
}
