

export type RoleFilterBy = 'DESCRIPTION' | 'ACRONYM' | 'CREATION_DATE' | 'EDITION_DATE';

export interface RoleFilterPayload {
    filter_by: RoleFilterBy;
    q: string;
}

export const ROLE_FILTER_BY: { [field in RoleFilterBy]: field } = {
    DESCRIPTION: 'DESCRIPTION',
    ACRONYM: 'ACRONYM',
    CREATION_DATE: 'CREATION_DATE',
    EDITION_DATE: 'EDITION_DATE'
};

export type RoleStatus = 'ENABLED' | 'DISABLED';
