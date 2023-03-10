export type UserStatus =
    | 'ENABLED'
    | 'DISABLED'
    | 'PENDING_ACCOUNT_CONFIRMATION';

export const USER_STATUS: { [status in UserStatus]: status } = {
    DISABLED: 'DISABLED',
    ENABLED: 'ENABLED',
    PENDING_ACCOUNT_CONFIRMATION: 'PENDING_ACCOUNT_CONFIRMATION',
};

export interface UserPayload {
    name: string,
    firstSurname: string,
    secondSurname: string,
    email?: string,
    roles: string[]
  }

export interface UserRoleCreatePayload {
    description: string;
    acronym:     string;
    permissions: string[];
}

export interface UserRoleUpdatePayload {
    acronym:     string;
    permissions: RolePermission[];
}

export interface UserRole {
    id?: number,
    code: string,
    description: string,
    appliesTo?: string,
    creationDate?: string,
    modificationDate?: string,
    acronym: string,
    associatedUsers?: number,
    status?: string,
    permissions?: RolePermission[],
}

export interface RolePermission{
    code: string;
    description: string;
}

export interface User {
    id: number;
    name: string;
    firstSurname: string;
    secondSurname: string;
    email: string;
    vinculationDate: string;
    status: UserStatus;
    roles: UserRole[];
}

export type UserFilterBy = 'STATUS' | 'ROLE' | 'FULL_NAME' | 'EMAIL' | 'VINCULATION_DATE';

export type UserFilterByStatus = 'ENABLED' | 'PENDING' | 'DISABLED';

export enum CodePermission {
    ACTIVATE_FINANCING_PLAN = 'ACTIVATE_FINANCING_PLAN',
    APPROVE_CHANGE_AGREEMENTS = 'APPROVE_CHANGE_AGREEMENTS',
    APPROVE_CONVENTION_RULES = 'APPROVE_CONVENTION_RULES',
    APPROVE_DATA_CHANGES = 'APPROVE_DATA_CHANGES',
    APPROVE_DOCUMENTS = 'APPROVE_DOCUMENTS',
    APPROVE_FINANCING_PLAN = 'APPROVE_FINANCING_PLAN',
    APPROVE_INVOICE_DISBURSEMENT = 'APPROVE_INVOICE_DISBURSEMENT',
    APPROVE_UPLOAD_INVOICE_NEGOTIATION = 'APPROVE_UPLOAD_INVOICE_NEGOTIATION',
    AUTHORIZE_FINANCING_PLAN = 'AUTHORIZE_FINANCING_PLAN',
    CANCEL_FINANCING_PLAN = 'CANCEL_FINANCING_PLAN',
    CONSULT_OBLIGATION = 'CONSULT_OBLIGATION',
    CREATE_ACCOUNT_STATEMENTS = 'CREATE_ACCOUNT_STATEMENTS',
    CREATE_CONVENTION_RULES = 'CREATE_CONVENTION_RULES',
    CREATE_ENTERPRISE = 'CREATE_ENTERPRISE',
    CREATE_ENTERPRISE_USER = 'CREATE_ENTERPRISE_USER',
    CREATE_ENTERPRISE_USER_ADMIN = 'CREATE_ENTERPRISE_USER_ADMIN',
    CREATE_FINANCING_PLAN = 'CREATE_FINANCING_PLAN',
    CREATE_INVOICE_NEGOTIATION = 'CREATE_INVOICE_NEGOTIATION',
    CREATE_INVOICES = 'CREATE_INVOICES',
    CREATE_OBLIGATION_NUMBER = 'CREATE_OBLIGATION_NUMBER',
    CREATE_PROVIDER = 'CREATE_PROVIDER',
    DELETE_DOCUMENTS = 'DELETE_DOCUMENTS',
    DELETE_FINANCING_PLAN = 'DELETE_FINANCING_PLAN',
    ENABLE_OR_DISABLE_BOCC_USER = 'ENABLE_OR_DISABLE_BOCC_USER',
    MANAGE_BOCC_USERS = 'MANAGE_BOCC_USERS',
    MANAGE_ENTERPRISE_USERS = 'MANAGE_ENTERPRISE_USERS',
    READ_AVAILABILITIES = 'READ_AVAILABILITIES',
    READ_ENTERPRISE_DETAIL = 'READ_ENTERPRISE_DETAIL',
    READ_ENTERPRISE_DOCUMENTATION = 'READ_ENTERPRISE_DOCUMENTATION',
    READ_ENTERPRISE_LINKINGS_LIST = 'READ_ENTERPRISE_LINKINGS_LIST',
    READ_ENTERPRISE_LIST = 'READ_ENTERPRISE_LIST',
    READ_FILED_OPERATIONS = 'READ_FILED_OPERATIONS',
    READ_FINANCING_PLAN_LIST = 'READ_FINANCING_PLAN_LIST',
    READ_INVOICES_LIST = 'READ_INVOICES_LIST',
    READ_INVOICES_PENDING_AUTHORIZATION = 'READ_INVOICES_PENDING_AUTHORIZATION',
    READ_NEGOTIATED_INVOICES = 'READ_NEGOTIATED_INVOICES',
    READ_OPERATIONS_STATUS = 'READ_OPERATIONS_STATUS',
    READ_PROVIDERS_LINKINGS = 'READ_PROVIDERS_LINKINGS',
    REQUEST_DOCUMENTS = 'REQUEST_DOCUMENTS',
    SET_TERM_NO_COST = 'SET_TERM_NO_COST',
    UNIFY_INVOICES = 'UNIFY_INVOICES',
    UPDATE_AGREEMENT_CONDITIONS = 'UPDATE_AGREEMENT_CONDITIONS',
    UPDATE_DOCUMENTS = 'UPDATE_DOCUMENTS',
    UPDATE_ENTERPRISE = 'UPDATE_ENTERPRISE',
    UPDATE_FINANCING_PLAN = 'UPDATE_FINANCING_PLAN',
    UPDATE_INVOICES = 'UPDATE_INVOICES',
    UPLOAD_DOCUMENTS = 'UPLOAD_DOCUMENTS',
    READ_ROLE_LIST = 'READ_ROLE_LIST',
    UPDATE_ROLE = 'UPDATE_ROLE',
    CREATE_ROLE = 'CREATE_ROLE',
    ENABLE_OR_DISABLE_ROLE = 'ENABLE_OR_DISABLE_ROLE',
}

export const USER_FILTER_BY: { [field in UserFilterBy]: field } = {
    STATUS: 'STATUS',
    ROLE: 'ROLE',
    FULL_NAME: 'FULL_NAME',
    EMAIL: 'EMAIL',
    VINCULATION_DATE: 'VINCULATION_DATE'
};

export const USER_FILTER_BY_STATUS: {
    [status in UserFilterByStatus]: status
} = {
    DISABLED: 'DISABLED',
    ENABLED: 'ENABLED',
    PENDING: 'PENDING',
};

export interface UserPaginationFilterPayload {
    filter_by: UserFilterBy;
    q: UserFilterByStatus | string;
}

export interface ToggleUserStatusPayload {
    id: number;
    enabled: boolean;
}
