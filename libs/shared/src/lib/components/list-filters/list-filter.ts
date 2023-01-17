interface Renderable {
    renderWhenIs: string;
}

export type FilterTypes = 'SELECT' | 'QUERY';

export const FILTER_TYPES: { [type in FilterTypes]: type } = {
    QUERY: 'QUERY',
    SELECT: 'SELECT',
};

export interface QueryFilter extends Renderable {
    readonly type: FilterTypes;
    label: string;
    fieldName?: string;
}

export interface SelectOption {
    label: string;
    value: any;
}

export interface SelectFilter extends QueryFilter {
    options: SelectOption[];
}

export type InputFilter = QueryFilter | SelectFilter;

export type FilterConfig = {
    filterOptions: SelectOption[];
    filters: InputFilter[];
};
