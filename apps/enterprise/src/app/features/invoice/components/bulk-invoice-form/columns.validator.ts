import { FormArray } from '@angular/forms';

import { BULK_INVOICE_FIELD, BulkInvoiceField, BulkInvoiceFormColumn } from '../../models';

const fields: BulkInvoiceField[] = Object.keys(
    BULK_INVOICE_FIELD
) as BulkInvoiceField[];

export const columnsValidator = (control: FormArray) => {
    const values: BulkInvoiceFormColumn[] = control.value;

    return fields.every(field =>
        values.some(value => value && value.field === field)
    )
        ? null
        : { incomplete: true };
};
