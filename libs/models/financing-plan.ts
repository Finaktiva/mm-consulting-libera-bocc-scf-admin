import { EnterpriseBasicInfo } from "./enterprise";

export interface CreateFinancingPlanPayload {
    [x: string]:        any;
    folio:              string;
    type:               string;
    comments:           string;
    providerOptions:    ProviderOptions;
    economicGroup:      EconomicGroup;
    totalSales:         string;
    salesCut:           string;
    minimumRate:        Rate;
    negotiatedRate:     Rate;
    isSpecialRate:      string;
    validityDays:       string;
    validityDate:       string;
    paydayInitialRange: string;
    paydayFinalRange:   string;
    termDays:           string;
    paymentMethod:      string;
    isPunctualPlan:     string;
    evidenceFilename:   string;
    clientPermissions:  string[];
}

export interface EconomicGroup {
    economicGroup:  boolean;
    enterprises:    EnterpriseBasicInfo[];
}

export interface EnterpriseGroup {
    enterpriseId: number;
    sales:        number;
    salesCut:     Date;
}

export interface Rate {
    baseType:        string;
    baseValue:       string;
    specialRate:     string;
    periodicityType: string;
    ea:              string;
    mv:              string;
}

export interface ProviderOptions {
    linkedToProvider?:              boolean;
    providerId:                    string;
    hasAgreement:                  string;
    requireAuthToPerformOperation: string;
    authDay:                       string;
    providerDocumentType?:          string;
    providerDocumentNumber?:        string;
    providerEnterpriseName?:        string;
}
