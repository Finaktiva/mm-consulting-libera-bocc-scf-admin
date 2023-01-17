import { FormArray } from '@angular/forms';

import { PROVIDER_BULK_CREATE_FIELD, ProviderBulkCreateField, ProviderBulkFormColumn } from '../../models';

const fields: ProviderBulkCreateField[] = Object.keys(
    PROVIDER_BULK_CREATE_FIELD
) as ProviderBulkCreateField[];

export const columnsValidator = (control: FormArray) => {
    const values: ProviderBulkFormColumn[] = control.value;

    return fields.every(field =>
        values.some(value => value && value.field === field)
    )
        ? null
        : { incomplete: true };
};
