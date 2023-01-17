export type ProviderBulkCreateField =
    | 'ENTERPRISE_NAME'
    | 'NIT'
    | 'NAME'
    | 'FIRST_SURNAME'
    | 'SECOND_SURNAME'
    | 'EMAIL'
    | 'PHONE_NUMBER';

export const PROVIDER_BULK_CREATE_FIELD: {
    [field in ProviderBulkCreateField]: field
} = {
    ENTERPRISE_NAME: 'ENTERPRISE_NAME',
    EMAIL: 'EMAIL',
    FIRST_SURNAME: 'FIRST_SURNAME',
    NAME: 'NAME',
    NIT: 'NIT',
    PHONE_NUMBER: 'PHONE_NUMBER',
    SECOND_SURNAME: 'SECOND_SURNAME',
};

export interface ProviderBulkFormColumn {
    field: ProviderBulkCreateField;
    cells: string[];
}
