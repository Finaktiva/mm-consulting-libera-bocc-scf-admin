export interface EnterpriseSector {
    id: number;
    name: string;
}

export interface CountryCallingCode {
    id: number;
    code: string;
    country: string;
}

export interface Currency {
    code: string;
    description: string;
}

export interface Language {
    code: string;
    description: string;
}

export interface CitiesAndDepartments {
    cities: City[];
    departments: Department[];
}

export interface City {
    cityCode: String;
    cityName: String;
}
export interface Department {
    departmentCode: String;
    departmentName: String;
}

export interface Bank {
    code:String;
    businessName:String;
    codeAchCenit:String;
}

export interface DocumentType {
    [x: string]: any;
    templateUrl: string;
    required: boolean;
    code: string;
    description: string;
    announcement:string;
    monthEffectiveness: number;
}

export interface yesNoOptions {
    label: string,
    value: boolean;
    checked: boolean;
};

export const initialStateYNOptions: yesNoOptions[] =[
    {
        label: 'YES',
        value: true,
        checked: false
    },
    {
        label: 'NO',
        value: false,
        checked: false
    }
];

export interface BankRegions {
    id: string,
    description: string
}

export type PlanFilter =
    | 'TYPE'
    | 'STATUS'
    | 'OBSERVATION'
    | 'DESCRIPTION'
    | 'PROVIDER'
    | 'DOCUMENT_NUMBER';

export enum PlanFilterFields {
    TYPE = 'TYPE',
    STATUS = 'STATUS',
    OBSERVATION = 'OBSERVATION',
    DESCRIPTION = 'DESCRIPTION',
    PROVIDER = 'PROVIDER',
    DOCUMENT_NUMBER = 'DOCUMENT_NUMBER',
}

export interface PlanFiltersPayload {
    filter_by: PlanFilter;
    q: string;
}

export interface DailyRate {
    type:              string;
    percent:           number;
    startValidityDate: string;
    endValidityDate:   string;
}

export interface RolePermission {
    code:        string;
    description: string;
    segment:     {
        code: string,
        description: string,
        order: number
    };
    appliesTo:   string;
    order: number;
}
