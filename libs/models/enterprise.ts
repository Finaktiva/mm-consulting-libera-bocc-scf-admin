import { Moment } from 'moment';

import { CountryCallingCode, EnterpriseSector } from './catalog';

export interface Enterprise {
    [x: string]: any;
    id: number;
    enterpriseName: string;
    sector: EnterpriseSector;
    enterpriseType: EnterpriseType;
    phone: {
        extension: string;
        number: string;
    };
    bankRegion:{
        id: number,
        description: string
    }
    nit: string;
    vinculationDate: string;
    email: string;
    owner: {
        id: number;
        name: string;
        firstSurname: string;
        secondSurname: string;
        email: string;
        modules: ModuleName[];
        documentType: string;
        documentNumber: string;
    };
    status: EnterpriseStatus;
    modules: EnterpriseModuleName[];
    economicActivity: {
        ciiuCode: string;
        description: string;
        economicSector: {
            id: number;
            description: string;
        };
    };
    documentType: string;
    productType: string;
    department: string;
    city: string;
    relationshipManager: string;
    sales: number;
    salesCut: string;
}

export interface EnterpriseBasicInfo {
    id: number;
    enterpriseName: string;
    documentType: string;
    documentNumber: string;
    sales: number;
    salesCut: string;
}

export interface UpdateModulesProductsPayload {
    id: number;
    phone: {
        phoneExt: string;
        number:string;
    };
    owner: {
        id: number;
        secondSurname: string;
        modules: ModuleName[];
        documentNumber: string;
        documentType: string;
    };
    productType: string;
    relationshipManager: string;
    sales: number;
    salesCut: string;
    bankRegion:{
        id: number
        description?: string
    };
}

export type EnterpriseType = 'PRIVATE' | 'PUBLIC' | 'MIXED' | 'SELF_MANAGEMENT';

export const ENTERPRISE_TYPE: { [type in EnterpriseType]: type } = {
    MIXED: 'MIXED',
    PRIVATE: 'PRIVATE',
    PUBLIC: 'PUBLIC',
    SELF_MANAGEMENT: 'SELF_MANAGEMENT',
};

export const DOCUMENT_TYPE = {
    IDENTIFICATION_CARD: 'IDENTIFICATION_CARD',
    FOREIGNER_ID: 'FOREIGNER_ID',
    AUTONOMOUS_HERITAGE: 'AUTONOMOUS_HERITAGE',
    PASSPORT: 'PASSPORT',
};

export const SALE = {
    SALE: 'SALE',    
};

export const SALE_CUT = {
    SALE_CUT: 'SALE_CUT',    
};

export const FORM_OF_DISBURSEMENT_TYPE = {
    CREDIT: 'CREDIT',
    CHECK: 'CHECK',
};

export const PRODUCT_TYPE = {
    UNIDIRECT:"UNIDIRECT",
    FIRM_FACTORY:"FIRM_FACTORY",
    CONFIRMING:"CONFIRMING",
    DOCUMENT_DISCOUNT:"DOCUMENT_DISCOUNT"
}

export type EnterpriseStatus =
    | 'PENDING_ACCOUNT_CREATION'
    | 'PENDING_ACCOUNT_CONFIRMATION'
    | 'ENABLED'
    | 'REJECTED'
    | 'INCOMPLETE_ACCOUNT'
    | 'EVALUATION_PENDING'
    | 'DISABLED'
    | 'REQUESTED_MODULE';

export const ENTERPRISE_STATUS: { [status in EnterpriseStatus]: status } = {
    PENDING_ACCOUNT_CREATION: 'PENDING_ACCOUNT_CREATION',
    PENDING_ACCOUNT_CONFIRMATION: 'PENDING_ACCOUNT_CONFIRMATION',
    ENABLED: 'ENABLED',
    REJECTED: 'REJECTED',
    INCOMPLETE_ACCOUNT: 'INCOMPLETE_ACCOUNT',
    EVALUATION_PENDING: 'EVALUATION_PENDING',
    DISABLED: 'DISABLED',
    REQUESTED_MODULE: 'REQUESTED_MODULE',
};

export interface EnterpriseDocumentation {
    id: number;
    creationDate: string;
    status: EnterpriseDocumentationStatus;
    modificationDate: string;
    file: EnterpriseDocumentationFile;
    documentTypeDescription:string,
    expeditionDate:string,
    effectiveness:string,
    effectivenessDate:string,
    type: {
        templateUrl: string;
        required: boolean;
        code: string;
        description: string;
        announcement:string;
        monthEffectiveness: number;
    };
    comment: string;
}

export interface EnterpriseDocumentationFile {
    id: number;
    name: string;
    url: string;
}

export type EnterpriseDocumentationStatus =
    | 'ACCEPTED'
    | 'REJECTED'
    | 'PENDING'
    | 'LOADED'
    | 'EVALUATION_PENDING'
    | 'DISABLED'
    | 'RELOAD_FILE'
    | 'CURRENT'
    | 'EXPIRED'
    | 'ABOUT_TO_EXPIRE';

export enum EnterpriseStatusLabels {
    PENDING_ACCOUNT_CONFIRMATION = 'Pendiente de activación',
    ENABLED = 'Activo',
    REJECTED = 'Rechazado',
    INCOMPLETE_ACCOUNT = 'Documentación faltante',
    EVALUATION_PENDING = 'Aprobación pendiente',
    DISABLED = 'Deshabilitado',
    REQUESTED_MODULE = 'Solicitud de módulo',
}

export enum EnterpriseModules {
    PAYER = 'Pagador',
    PROVIDER = 'Proveedor',
    FUNDING = 'Fondeador',
    ADMIN = 'Administrador',
}

export const EnterpriseListStatus = {
    ENABLED: 'ENABLED',
    DISABLED: 'DISABLED',
    REQUEST: 'REQUEST',
};

export enum EnterpriseFilterFields {
    NIT = 'NIT',
    DATE = 'DATE',
    ENTERPRISE_NAME = 'ENTERPRISE_NAME',
    REGION = 'REGION',
    MODULE = 'MODULE',
    STATUS = 'STATUS',
}

export interface DocumentationFilePayload {
    id: number;
    file: File;
}

export interface CreateProgramPayload {
    city: string;
    department: string;
    documentNumber: string;
    documentType: string;
    economicActivity: {
        ciiuCode: string,
        description: string,
        economicSector:{
            id: number,
            description: string
        }
    };
    email: string;
    enterpriseDocumentType: string;
    enterpriseName: string;
    firstSurname: string;
    idOwner: number;
    idRegister: number;
    modules: string[];
    modulesHelper: string;
    name: string;
    nit: string;
    phoneExt: number;
    phoneNumber: number;
    productType: string;
    relationshipManager: string;
    bankRegion?:{
        description: string
        id: number
    };
    sales: number;
    salesPerYear: string;
    secondSurname: string;
    referenceRequestId?: number;
}

export type ProgramFilter =
    | 'NIT'
    | 'DATE'
    | 'PAYER'
    | 'FUNDING'
    | 'PROVIDER'
    | 'ENTERPRISE_NAME'
    | 'MODULE';

    export type DocumentFilter =
    | 'NIT'
    | 'IDENTIFICATION_CARD'
    | 'FOREIGNER_ID'
    | 'AUTONOMOUS_HERITAGE'
    | 'PASSPORT';

export type ProgramStatus = 'ENABLED' | 'PENDING_ACCOUNT_CONFIRMATION' | 'REJECTED' | 'INCOMPLETE_ACCOUNT' | 'EVALUATION_PENDING' | 'PENDING_ACCOUNT_CREATION';

export type ProviderStatus = 'ENABLED' | 'DISABLED' | 'PENDING';

export type ModuleFilter = 'PROVIDER' | 'PAYER' | 'FUNDING';

export interface ProgramFiltersPayload {
    filter_by: ProgramFilter;
    q: string;
    documentType: DocumentFilter;
    module: ModuleFilter;
}

export type ChangeDocumentationStatus = 'ACCEPTED' | 'RELOAD_FILE' | 'REJECTED';

export interface ChangeDocumentationStatusPayload {
    status: ChangeDocumentationStatus;
    explanation: string;
    expeditionDate: string;
}

export type SaveNewDocument = {
    documentType:string;
    documentTypeDescription:string;
    timeType:string;
    effectiveness:string;
    comment:string;
}

export interface ChangeProgramStatusPayload {
    explanation: string;
    expeditionDate: string;
    status: EnterpriseStatus;
}

export interface ChangeProgramStatusPayloadSuccess {
    status: EnterpriseStatus;
    explanation: string;
}

export type EnterpriseModuleName = 'PAYER' | 'PROVIDER' | 'FUNDING' | 'ADMIN';
export type ModuleName = 'PAYER' | 'PROVIDER' | 'FUNDING' | 'ADMIN';

export const ENTERPRISE_MODULES: {
    [module in EnterpriseModuleName]: module
} = {
    PAYER: 'PAYER',
    PROVIDER: 'PROVIDER',
    FUNDING: 'FUNDING',
    ADMIN: 'ADMIN',
};

export interface EnterpriseUser {
    id: number;
    name: string;
    firstSurname: string;
    secondSurname: string;
    email: string;
    modules: EnterpriseModuleName[];
    vinculationDate: string;
    status: EnterpriseStatus;
}

export enum EnterpriseUserFilterByFields {
    ROLE = 'ROLE',
    MODULE = 'MODULE',
    STATUS = 'STATUS',
}

export type EnterpriseUserFilterBy = 'ROLE' | 'MODULE' | 'STATUS';

export const ENTERPRISE_USER_FILTER_FIELDS = {
    MODULE: 'MODULE',
    STATUS: 'STATUS',
};

export interface EnterpriseUserFilterPayload {
    filter_by: EnterpriseUserFilterBy;
    q: string;
}

export interface ToggleEnterpriseUserStatusPayload {
    id: number;
    enabled: boolean;
}

export type EnterpriseModuleStatus =
    | 'ENABLED'
    | 'DISABLED'
    | 'VALIDATING_REQUEST'
    | 'REJECTED';

export const ENTERPRISE_MODULE_STATUS: {
    [status in EnterpriseModuleStatus]: status
} = {
    ENABLED: 'ENABLED',
    DISABLED: 'DISABLED',
    REJECTED: 'REJECTED',
    VALIDATING_REQUEST: 'VALIDATING_REQUEST',
};

export interface EnterpriseModule {
    name: EnterpriseModuleName;
    description: string;
    status: EnterpriseModuleStatus;
    activationDate: string;
    requiredDocumentation: string;
    documentationId: number;
}

export interface EnterpriseUserPayload {
    name: string;
    firstSurname: string;
    secondSurname: string;
    email: string;
    modules: EnterpriseModuleName[];
}

export interface RequestEnterpriseModuleActivationPayload {
    module: EnterpriseModuleName;
    documentationId: number;
}

export type EnterpriseLinkStatus =
    | 'PENDING_LINK_CREATION'
    | 'PENDING_CONFIRMATION'
    | 'PENDING_AUTHORIZATION'
    | 'PENDING_VALIDATION'
    | 'ENABLED'
    | 'DISABLED'
    | 'REJECTED';

export const ENTERPRISE_LINK_STATUS: {
    [status in EnterpriseLinkStatus]: status
} = {
    PENDING_LINK_CREATION: 'PENDING_LINK_CREATION',
    PENDING_VALIDATION: 'PENDING_VALIDATION',
    PENDING_AUTHORIZATION: 'PENDING_AUTHORIZATION',
    PENDING_CONFIRMATION: 'PENDING_CONFIRMATION',
    ENABLED: 'ENABLED',
    DISABLED: 'DISABLED',
    REJECTED: 'REJECTED',
};

export interface EnterpriseProvider {
    id: number;
    enterpriseName: string;
    nit: string;
    vinculationDate: string;
    sector: EnterpriseSector;
    enterpriseType: EnterpriseType;
    phone: {
        countryCode: {
            id: number;
            code: string;
            country: string;
        };
        number: string;
    };
    owner: {
        id: number;
        name: string;
        firstSurname: string;
        secondSurname: string;
        email: string;
    };
    status: EnterpriseStatus;
    modules: EnterpriseModuleName[];
    linkStatus: EnterpriseLinkStatus;
}

export interface EnterpriseProviderFilterPayload {
    filter_by?: 'NIT' | 'ENTERPRISE_NAME' | 'STATUS';
    status?: 'ENABLED' | 'DISABLED' | 'PENDING';
    q?: string;
    documentType?: 'NIT' | 'PASSPORT' | 'FOREIGNER_ID' | 'IDENTIFICATION_CARD' | 'AUTONOMOUS_HERITAGE';
}

export interface EnterpriseProviderPayload {
    enterpriseName: string;
    nit: string;
    comesFromApi: boolean;
    owner: {
        name: string;
        firstSurname: string;
        secondSurname: string;
        email: string;
    };
    phone: {
        extension:string,
        number:string,
    };
    providerDocumentType:string;
    productType: string,
    department: string,
    city: string,
    economicActivity: {
        ciiuCode: string
    },
    disbursementContract: {
        type: string,
        account: {
            type: string,
            number: string,
            bank: {
                code: string
            }
        },
        bankCertificationFilename: string
    }
}

export interface UpdateEnterprisePayload {
    city: string;
    enterpriseName: string;
    department: string;
    sectorId: number;
    phone: {
        extension: string;
        number: string;
    };
    owner: {
        name: string;
        firstSurname: string;
        secondSurname: string;
    };
    bankRegion:{
        id: number
    };
}

export interface EnterpriseProviderBulkCreatePayload {
    file: File;
    requests: EnterpriseProviderPayload[];
}

export interface EnterpriseProviderBulkCreateRequestPayload {
    enterpriseRequestBulkId: number;
    requests: EnterpriseProviderPayload[];
}

export type EnterpriseProviderBulkStatus =
    | 'PENDING_COMPLETION'
    | 'COMPLETED'
    | 'ERROR';

export const ENTERPRISE_PROVIDER_BULK_STATUS: {
    [status in EnterpriseProviderBulkStatus]: status
} = {
    COMPLETED: 'COMPLETED',
    ERROR: 'ERROR',
    PENDING_COMPLETION: 'PENDING_COMPLETION',
};

export interface EnterpriseProviderBulk {
    id: number;
    filename: string;
    folio: string;
    status: EnterpriseProviderBulkStatus;
    creationDate: string;
    totalRequests: number;
    completedRequests: number;
}

export type EnterpriseProviderTokenStatus = 'ACTIVE' | 'EXPIRED' | 'APPLIED';

export interface EnterpriseProviderTokenVerification {
    status: EnterpriseProviderTokenStatus;
    enterpriseRequesterName: string;
}

export type EnterpriseProviderLinkConfirmation = 'ACCEPTED' | 'REJECTED';

export type EnterpriseCustomAttributeType =
    | 'INTEGER'
    | 'DECIMAL'
    | 'TEXT'
    | 'DATE';

export const ENTERPRISE_CUSTOM_ATTRIBUTE_TYPE: {
    [type in EnterpriseCustomAttributeType]: type
} = {
    DATE: 'DATE',
    DECIMAL: 'DECIMAL',
    INTEGER: 'INTEGER',
    TEXT: 'TEXT',
};

export interface EnterpriseCustomAttribute {
    id: number;
    name?: string;
    type?: EnterpriseCustomAttributeType;
    value?: string | number;
    creationDate?: string;
}

export interface EnterpriseCustomAttributeFormPayload {
    id: number;
    name: string;
    type: EnterpriseCustomAttributeType;
    value: string | number | Moment;
}

export interface AvailableEnterprise {
    id: number;
    enterpriseName: string;
    nit: string;
    availableQuota: number;
}

export type AvailableEnterpriseType = 'PROVIDER' | 'FUNDING';

export const AVAILABLE_ENTERPRISE_TYPE: {
    [type in AvailableEnterpriseType]: type
} = {
    FUNDING: 'FUNDING',
    PROVIDER: 'PROVIDER',
};

export type EnterpriseEventRecordType =
    | 'CREATION'
    | 'RESEND_INVITE'
    | 'DOCUMENT_APPROVED'
    | 'DOCUMENT_REJECTED'
    | 'DOCUMENT_REQUESTED'
    | 'ENTERPRISE_REJECTED'
    | 'ENTERPRISE_APPROVED'
    | 'MODULE_APPROVED'
    | 'MODULE_REJECTED'
    | 'PROFILE_UPDATED'
    | 'MODULE_REQUESTED';

export const ENTERPRISE_EVENT_RECORD_TYPE: {
    [type in EnterpriseEventRecordType]: type
} = {
    CREATION: 'CREATION',
    RESEND_INVITE: 'RESEND_INVITE',
    DOCUMENT_APPROVED: 'DOCUMENT_APPROVED',
    DOCUMENT_REJECTED: 'DOCUMENT_REJECTED',
    DOCUMENT_REQUESTED: 'DOCUMENT_REQUESTED',
    ENTERPRISE_REJECTED: 'ENTERPRISE_REJECTED',
    ENTERPRISE_APPROVED: 'ENTERPRISE_APPROVED',
    MODULE_APPROVED: 'MODULE_APPROVED',
    MODULE_REJECTED: 'MODULE_REJECTED',
    PROFILE_UPDATED: 'PROFILE_UPDATED',
    MODULE_REQUESTED: 'MODULE_REQUESTED',
};

export type EnterpriseEntityRecord =
    | 'ENTERPRISE_NAME'
    | 'OWNER_NAME'
    | 'ENTERPRISE_TYPE'
    | 'ENTERPRISE_SECTOR'
    | 'OWNER_FIRST_SURNAME'
    | 'OWNER_SECOND_SURNAME'
    | 'LADA'
    | 'PHONE'
    | 'PAYER'
    | 'PROVIDER'
    | 'LENDER'
    | 'CHAMBER_OF_COMMERCE_CERTIFICATE'
    | 'ENROLLMENT_FORM'
    | 'FUNDING_AGREEMENT'
    | 'LEGAL_REPRESENTATIVE_ID'
    | 'PAYER_AGREEMENT'
    | 'PROVIDER_AGREEMENT'
    | 'RUT'
    | 'SHAREHOLDING_STRUCTURE';

export const ENTERPRISE_ENTITY_RECORD: {
    [type in EnterpriseEntityRecord]: type
} = {
    ENTERPRISE_NAME: 'ENTERPRISE_NAME',
    OWNER_NAME: 'OWNER_NAME',
    ENTERPRISE_TYPE: 'ENTERPRISE_TYPE',
    ENTERPRISE_SECTOR: 'ENTERPRISE_SECTOR',
    OWNER_FIRST_SURNAME: 'OWNER_FIRST_SURNAME',
    OWNER_SECOND_SURNAME: 'OWNER_SECOND_SURNAME',
    LADA: 'LADA',
    PHONE: 'PHONE',
    PAYER: 'PAYER',
    PROVIDER: 'PROVIDER',
    LENDER: 'LENDER',
    CHAMBER_OF_COMMERCE_CERTIFICATE: 'CHAMBER_OF_COMMERCE_CERTIFICATE',
    ENROLLMENT_FORM: 'ENROLLMENT_FORM',
    FUNDING_AGREEMENT: 'FUNDING_AGREEMENT',
    LEGAL_REPRESENTATIVE_ID: 'LEGAL_REPRESENTATIVE_ID',
    PAYER_AGREEMENT: 'PAYER_AGREEMENT',
    PROVIDER_AGREEMENT: 'PROVIDER_AGREEMENT',
    RUT: 'RUT',
    SHAREHOLDING_STRUCTURE: 'SHAREHOLDING_STRUCTURE',
};

export interface ActivityHistory {
    id: string;
    liberaUser: {
        name: string;
        firstSurname: string;
        secondSurname: string;
    };
    event: {
        eventType: EnterpriseEventRecordType;
        entity: EnterpriseEntityRecord;
        value: string;
        date: string;
        comment: string;
    };
}

export interface DocumentNumber {
    message: string;
    isValid: any;
    id: number;
}

export interface FinancialPlan {
    folio:              string;
    type:               string;
    comments:           string;
    providerOptions:    ProviderOptions;
    economicGroup:      EconomicGroup[];
    totalSales:         number;
    salesCut:           Date;
    minimumRate:        Rate;
    negotiatedRate:     Rate;
    isSpecialRate:      boolean;
    validityDays:       number;
    validityDate:       Date;
    paydayInitialRange: number;
    paydayFinalRange:   number;
    termDays:           number;
    paymentMethod:      string;
    isPunctualPlan:     boolean;
    evidenceFilename:   string;
    clientPermissions:  string[];
}

export interface FinancialPlanDetail {
    id:                     number;
    folio:                  string;
    type:                   string;
    comments:               string;
    providerOptions:        ProviderOptionsDetail;
    economicGroup:          EconomicGroupDetail[];
    totalSales:             number;
    salesCut:               string;
    minimumRate:            RateDetail;
    negotiatedRate:         RateDetail;
    isSpecialRate:          boolean;
    validityDays:           number;
    validityDate:           string;
    paydayInitialRange:     number;
    paydayFinalRange:       number;
    termDays:               number;
    paymentMethod:          string;
    isPunctualPlan:         boolean;
    creationDate:           string;
    modificationDate:       string;
    acceptanceDate:         string;
    evidenceFile:           evidenceFileDetail;
    clientPermissions:      string[];
    approvalUser:           FinancialPlanUserDetail;
    acceptanceUser:         FinancialPlanUserDetail;
    creationUser:           FinancialPlanUserDetail;
  }


export interface evidenceFileDetail{
    id: number,
    name: string,
    url: string
}
export interface EconomicGroupDetail{
        enterpriseId: number,
        enterpriseName: string,
        documentType: string,
        documentNumber: string,
        sales: number,
        salesCut: string
}

export interface ProviderOptionsDetail {
    provider: {
      id: number,
      document: string,
      documentType: string
      name: string,
    },
    hasAgreement: boolean,
    requireAuthToPerformOperation: boolean,
    authDay: number
  }

export interface RateDetail {
    baseType: string,
    baseValue: number,
    specialRate: number,
    periodicityType: string,
    ea: number,
    mv: number,
}  

export interface FinancialPlanUserDetail {
    id: number,
    name: string,
    firstSurname: string,
    secondSurname: string
    email: string;
}

export interface EconomicGroup {
    enterpriseId: number;
    sales:        number;
    salesCut:     Date;
}

export interface Rate {
    baseType:        string;
    baseValue:       number;
    specialRate:     number;
    periodicityType: string;
    ea:              number;
    mv:              number;
}

export interface ProviderOptions {
    providerId:                    number;
    hasAgreement:                  boolean;
    requireAuthToPerformOperation: boolean;
    authDay:                       number;
}

export interface BasicFinancialPlan {
    [x: string]:  any;
    id:           number;
    folio:        string;
    type:         string;
    comments:     string;
    status:       string;
    effectivenessDate: string;
    observations: string[];
    summary:      Summary;
    provider:     Provider;
}

export interface Summary {
    termDays:       number;
    negotiatedRate: NegotiatedRate;
}

export interface NegotiatedRate {
    baseType:        Type;
    specialRate:     number;
    periodicityType: Type;
}

export interface Type {
    code:        string;
    description: string;
}

export interface Provider {
    id:             number;
    enterpriseName: string;
    documentNumber: string;
}