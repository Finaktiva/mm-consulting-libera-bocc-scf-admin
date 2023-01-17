    import {
    ActivityHistory,
    AvailableEnterprise,
    Enterprise,
    EnterpriseCustomAttribute,
    EnterpriseDocumentation,
    EnterpriseDocumentationFile,
    EnterpriseModule,
    EnterpriseProvider,
    EnterpriseProviderBulk,
    EnterpriseProviderTokenVerification,
    EnterpriseUser,
    FinancialPlanDetail,
} from '@libera/models/enterprise';

export const ENTERPRISE_MOCK: Enterprise = {
    id: 1,
    email: 'test@test.com',
    enterpriseName: 'Medio melon',
    nit: '900.000.000-1',
    phone: {
        extension:'',
        number: '900-00-343',
    },
    bankRegion:{
        id: 1,
        description: "BOGOTA"
    },
    sector: {
        id: 1,
        name: 'Algun sector',
    },
    owner: {
        id: 1,
        name: 'Pedrito',
        firstSurname: 'Ferrari',
        secondSurname: null,
        email: 'program1@mock.com',
        modules: ['PAYER'],
        documentType: null,
        documentNumber: null
    },
    enterpriseType: 'SELF_MANAGEMENT',
    modules: ['PAYER'],
    status: 'ENABLED',
    vinculationDate: '2019-04-24T16:18:46.114Z',
    economicActivity: {
        ciiuCode: "0111",
        description: "Cultivo de cereales (excepto arroz), legumbres y semillas oleaginosas",
        economicSector: {
            id: 1, 
            description: "AGRICULTURA, GANADERÍA, SILVICULTURA Y PESCA (DIVISIÓN 1,2 Y 3)"
        }
    },
    documentType: "Desconocido",
    productType: "Desconocido",
    department: "Desconocido",
    city: "Desconocido",
    relationshipManager: "Desconocido",
    sales: 100000000,
    salesCut: "Desconocido"
};

// export const ENTERPRISE_DOCUMENTATION_MOCK = [];

export const ENTERPRISE_DOCUMENTATION_MOCK: EnterpriseDocumentation[] = [
    {
        id: 1,
        comment: 'Algo salió mal aqui como que no me gusta',
        creationDate: '2019-04-24T16:18:46.114Z',
        file: {
            id: 5,
            name: 'Someti.pdf',
            url: null,
        },
        modificationDate: '2019-04-24T16:18:46.114Z',
        status: 'RELOAD_FILE',
        documentTypeDescription: null,
        expeditionDate: null,
        effectiveness: null,
        effectivenessDate: null,
        type: {
            code: null,
            description: 'Formulario de matricula',
            required: true,
            templateUrl:
                'https://source.android.com/compatibility/8.1/android-8.1-cdd.pdf',
            announcement:null,
            monthEffectiveness: 0,
        },
    },
    {
        id: 2,
        comment: null,
        creationDate: '2019-04-24T16:18:46.114Z',
        file: {
            id: 5,
            name: 'ANOTHER.pdf',
            url: 'https://source.android.com/compatibility/android-cdd.pdf',
        },
        modificationDate: '2019-04-24T16:18:46.114Z',
        status: 'PENDING',
        documentTypeDescription: null,
        expeditionDate: null,
        effectiveness: null,
        effectivenessDate: null,
        type: {
            code: null,
            description: 'Acuerdo',
            required: true,
            templateUrl: null,
            announcement: null,
            monthEffectiveness: 0,
        },
    },
    {
        id: 3,
        comment: null,
        creationDate: '2019-04-24T16:18:46.114Z',
        file: null,
        modificationDate: '2019-04-24T16:18:46.114Z',
        status: 'ACCEPTED',
        documentTypeDescription: null,
        expeditionDate: null,
        effectiveness: null,
        effectivenessDate: null,
        type: {
            description: 'Camara de comercio',
            code: null,
            required: true,
            templateUrl: null,
            announcement: null,
            monthEffectiveness: 0,
        },
    },
    {
        id: 4,
        comment: null,
        creationDate: '2019-04-24T16:18:46.114Z',
        file: null,
        modificationDate: '2019-04-24T16:18:46.114Z',
        status: 'ACCEPTED',
        documentTypeDescription: null,
        expeditionDate: null,
        effectiveness: null,
        effectivenessDate: null,
        type: {
            description: 'Copia de cedula de representante legal',
            code: null,
            required: true,
            templateUrl: null,
            announcement: null,
            monthEffectiveness: 0,
        },
    },
    {
        id: 5,
        comment: null,
        creationDate: '2019-04-24T16:18:46.114Z',
        file: null,
        modificationDate: '2019-04-24T16:18:46.114Z',
        status: 'ACCEPTED',
        documentTypeDescription: null,
        expeditionDate: null,
        effectiveness: null,
        effectivenessDate: null,
        type: {
            description: 'RUT',
            code: null,
            required: true,
            templateUrl: null,
            announcement: null,
            monthEffectiveness: 0,
        },
    },
    {
        id: 6,
        comment: null,
        creationDate: '2019-04-24T16:18:46.114Z',
        file: null,
        modificationDate: '2019-04-24T16:18:46.114Z',
        status: 'EVALUATION_PENDING',
        documentTypeDescription: null,
        expeditionDate: null,
        effectiveness: null,
        effectivenessDate: null,
        type: {
            description: 'Composicion accionaria',
            code: null,
            required: true,
            templateUrl: null,
            announcement: null,
            monthEffectiveness: 0,
        },
    },
];

export const ENTERPRISE_DOCUMENTATION_FILE_MOCK: EnterpriseDocumentationFile = {
    id: 100,
    name: 'test.pdf',
    url: 'https://source.android.com/compatibility/8.1/android-8.1-cdd.pdf',
};

export const ENTERPRISE_USER_MOCKS: EnterpriseUser[] = [
    {
        id: 1,
        email: 'test@test.com',
        name: 'Test',
        firstSurname: 'Testing',
        secondSurname: 'Tester',
        modules: ['ADMIN'],
        vinculationDate: '2019-04-24T16:18:46.114Z',
        status: 'ENABLED',
    },
    {
        id: 2,
        email: 'chek0@test.com',
        name: 'Chej0',
        firstSurname: 'Testing',
        secondSurname: 'Tester',
        modules: ['FUNDING', 'ADMIN'],
        vinculationDate: '2019-04-24T16:18:46.114Z',
        status: 'INCOMPLETE_ACCOUNT',
    },
    {
        id: 3,
        email: 'ecar@test.com',
        name: 'Ecar',
        firstSurname: 'ecarin',
        secondSurname: 'Tester',
        modules: ['PAYER'],
        vinculationDate: '',
        status: 'DISABLED',
    },
];

export const ENTERPRISE_USER_MOCK: EnterpriseUser = {
    id: 99,
    email: 'newtest@test',
    name: 'test',
    firstSurname: 'sdsa',
    secondSurname: 'ssa',
    modules: ['PROVIDER'],
    vinculationDate: null,
    status: 'INCOMPLETE_ACCOUNT',
};

export const ENTERPRISE_MODULES_MOCK: EnterpriseModule[] = [
    {
        name: 'ADMIN',
        description: 'Administrador',
        activationDate: '',
        requiredDocumentation: '',
        documentationId: 1,
        status: 'ENABLED',
    },
    {
        name: 'FUNDING',
        description: 'Fondeador',
        activationDate: '2019-04-24T16:18:46.114Z',
        requiredDocumentation: '',
        documentationId: 2,
        status: null,
    },
    {
        name: 'PAYER',
        description: 'Pagador',
        activationDate: '2019-04-24T16:18:46.114Z',
        requiredDocumentation: '',
        documentationId: 3,
        status: 'ENABLED',
    },
    {
        name: 'PROVIDER',
        description: 'Proveedor',
        activationDate: '',
        requiredDocumentation:
            'https://source.android.com/compatibility/8.1/android-8.1-cdd.pdf',
        documentationId: 4,
        status: 'ENABLED',
    },
];

export const ENTERPRISE_PROVIDER_MOCKS: EnterpriseProvider[] = [
    {
        id: 1,
        enterpriseName: 'medio',
        linkStatus: 'DISABLED',
        modules: ['PROVIDER'],
        status: 'ENABLED',
        nit: '900-900',
        enterpriseType: 'PRIVATE',
        phone: {
            countryCode: {
                id: 1,
                code: '+52',
                country: 'México',
            },
            number: '2322113',
        },
        sector: {
            id: 1,
            name: 'Sector 1',
        },
        owner: {
            id: 90,
            name: 'ecarin',
            firstSurname: 'test',
            secondSurname: 'tester',
            email: 'testblaaaaaaaaabla2323sss34343aa@gmail',
        },
        vinculationDate: '',
    },
    {
        id: 2,
        enterpriseName: 'google',
        linkStatus: 'PENDING_AUTHORIZATION',
        modules: ['PROVIDER', 'FUNDING'],
        status: 'ENABLED',
        nit: '900-900',
        enterpriseType: 'PRIVATE',
        phone: {
            countryCode: {
                id: 1,
                code: '+52',
                country: 'México',
            },
            number: '2322113',
        },
        sector: {
            id: 1,
            name: 'Sector 1',
        },
        owner: {
            id: 990,
            name: 'ecarin',
            firstSurname: 'test',
            secondSurname: 'tester',
            email: 'test@gmail',
        },
        vinculationDate: '',
    },
    {
        id: 4,
        enterpriseName: 'facebook',
        linkStatus: 'ENABLED',
        modules: ['PROVIDER', 'FUNDING'],
        status: 'ENABLED',
        nit: '900-900',
        enterpriseType: 'PUBLIC',
        phone: {
            countryCode: {
                id: 1,
                code: '+52',
                country: 'México',
            },
            number: '2322113',
        },
        sector: {
            id: 1,
            name: 'Sector 1',
        },
        owner: {
            id: 990,
            name: 'ecarin',
            firstSurname: 'test',
            secondSurname: 'tester',
            email: 'test@gmail',
        },
        vinculationDate: '',
    },
];

export const ENTERPRISE_PROVIDER_MOCK: EnterpriseProvider = {
    id: 40,
    enterpriseName: 'insert',
    linkStatus: 'ENABLED',
    modules: ['PROVIDER', 'FUNDING'],
    status: 'ENABLED',
    nit: '900-900',
    enterpriseType: 'PUBLIC',
    phone: {
        countryCode: {
            id: 1,
            code: '+52',
            country: 'México',
        },
        number: '2322113',
    },
    sector: {
        id: 1,
        name: 'Sector 1',
    },
    owner: {
        id: 990,
        name: 'ecarin',
        firstSurname: 'test',
        secondSurname: 'tester',
        email: 'test@gmail',
    },
    vinculationDate: '',
};

export const PROVIDER_BULK_MOCKS: EnterpriseProviderBulk[] = [
    {
        id: 1,
        status: 'COMPLETED',
        folio: '123123',
        filename: 'file.xlsx',
        completedRequests: 50,
        totalRequests: 50,
        creationDate: '',
    },
    {
        id: 2,
        status: 'PENDING_COMPLETION',
        folio: '123123',
        filename: 'file.xlsx',
        completedRequests: 40,
        totalRequests: 50,
        creationDate: '',
    },
    {
        id: 3,
        status: 'ERROR',
        folio: '123123',
        filename: 'file.xlsx',
        completedRequests: 1,
        totalRequests: 50,
        creationDate: '',
    },
];

export const PROVIDER_BULK_MOCK: EnterpriseProviderBulk = {
    id: 87,
    status: 'PENDING_COMPLETION',
    folio: 'sadfas',
    filename: 'file.xlsx',
    completedRequests: 0,
    totalRequests: 50,
    creationDate: '',
};

export const ENTERPRISE_PROVIDER_TOKEN_VERIFICATION: EnterpriseProviderTokenVerification = {
    enterpriseRequesterName: 'Medio Melon',
    status: 'APPLIED',
};

export const ENTERPRISE_CUSTOM_ATTRIBUTE_MOCKS: EnterpriseCustomAttribute[] = [
    {
        id: 1,
        name: 'Nombre',
        type: 'TEXT',
        creationDate: '',
    },
    {
        id: 2,
        name: 'Fecha',
        type: 'DATE',
        creationDate: '',
    },
    {
        id: 3,
        name: 'Entero',
        type: 'INTEGER',
        creationDate: '',
    },
    {
        id: 4,
        name: 'Decimal',
        type: 'DECIMAL',
        creationDate: '',
    },
];

export const AVAILABLE_ENTERPRISE_MOCKS: AvailableEnterprise[] = [
    {
        id: 1,
        enterpriseName: 'Medio melon',
        nit: '900.900.899-1',
        availableQuota: 900000000,
    },
    {
        id: 2,
        enterpriseName: 'Facebook',
        nit: '111.900.899-1',
        availableQuota: 35000,
    },
    {
        id: 3,
        enterpriseName: 'Google',
        nit: '431.777.899-4',
        availableQuota: 503340,
    },
];

export const ENTERPRISE_ACTIVITIES_HISTORY_MOCK: ActivityHistory[] = [
    {
        id: '14',
        liberaUser: {
            name: 'Carmen',
            firstSurname: 'Cruz',
            secondSurname: 'Arreaga',
        },
        event: {
            eventType: 'CREATION',
            entity: null,
            value: '',
            date: new Date().toISOString(),
            comment: null,
        },
    },
    {
        id: '144',
        liberaUser: {
            name: 'Carmen',
            firstSurname: 'Cruz',
            secondSurname: 'Arreaga',
        },
        event: {
            eventType: 'CREATION',
            entity: 'PAYER',
            value: 'string',
            date: new Date().toISOString(),
            comment: 'No cumplia con los requerimientos',
        },
    },
    {
        id: '1',
        liberaUser: {
            name: 'Carmen',
            firstSurname: 'Cruz',
            secondSurname: 'Arreaga',
        },
        event: {
            eventType: 'RESEND_INVITE',
            entity: 'PAYER',
            value: 'string',
            date: new Date().toISOString(),
            comment: 'No cumplia con los requerimientos',
        },
    },
    {
        id: '456',
        liberaUser: {
            name: 'Carmen',
            firstSurname: 'Cruz',
            secondSurname: 'Arreaga',
        },
        event: {
            eventType: 'RESEND_INVITE',
            entity: 'PAYER',
            value: 'string',
            date: new Date().toISOString(),
            comment: 'No cumplia con los requerimientos',
        },
    },
    {
        id: '543tg1',
        liberaUser: {
            name: 'Carmen',
            firstSurname: 'Cruz',
            secondSurname: 'Arreaga',
        },
        event: {
            eventType: 'RESEND_INVITE',
            entity: 'PAYER',
            value: 'string',
            date: new Date().toISOString(),
            comment: 'No cumplia con los requerimientos',
        },
    },
    {
        id: '1dsadsadsa',
        liberaUser: {
            name: 'Carmen',
            firstSurname: 'Cruz',
            secondSurname: 'Arreaga',
        },
        event: {
            eventType: 'RESEND_INVITE',
            entity: 'PAYER',
            value: 'string',
            date: new Date().toISOString(),
            comment: 'No cumplia con los requerimientos',
        },
    },
    {
        id: '1dsfgdfgadsadsa',
        liberaUser: {
            name: 'Carmen',
            firstSurname: 'Cruz',
            secondSurname: 'Arreaga',
        },
        event: {
            eventType: 'MODULE_REQUESTED',
            entity: 'PAYER',
            value: '',
            date: new Date().toISOString(),
            comment: 'No cumplia con los requerimientos',
        },
    },
    {
        id: '1dsagfdgfddsadsa',
        liberaUser: {
            name: 'Carmen',
            firstSurname: 'Cruz',
            secondSurname: 'Arreaga',
        },
        event: {
            eventType: 'DOCUMENT_REJECTED',
            entity: 'PAYER',
            value: 'string',
            date: new Date().toISOString(),
            comment: 'No cumplia con los requerimientos',
        },
    },
];

export const FINANCIAL_PLANS_DEATIL_MOCK: FinancialPlanDetail = {
    id: 51,
    folio: "9e22d73b-dbf5-478e-9582-ae46480feb2f",
    type: "COMMISSION",
    comments: "Comentario mock",
    providerOptions: {
      provider: {
        id: 141,
        document: "2555566666",
        name: "TestJ",
        documentType: "NIT"
      },
      hasAgreement: true,
      requireAuthToPerformOperation: true,
      authDay: 2
    },
    economicGroup: [
      {
        enterpriseId: 13,
        enterpriseName: "Provider empresa 3",
        documentType: "NIT",
        documentNumber: "901.203.875-8",
        sales: 50,
        salesCut: "2022-05-19"
      },
      {
        enterpriseId: 19,
        enterpriseName: "Empresa Demo02",
        documentType: "NIT",
        documentNumber: "100.003.876-1",
        sales: 19,
        salesCut: "2022-04-12"
      }
    ],
    paydayInitialRange: 3,
    paydayFinalRange: 10,
    totalSales: 91200054,
    salesCut: "1984-12-01T00:00:00.000Z",
    minimumRate: {
      baseType: "IBR",
      baseValue: 10.04,
      periodicityType: "TV",
      ea: 1,
      mv: 1,
      specialRate: 2.32
    },
    negotiatedRate: {
      baseType: "IBR",
      baseValue: 9.02,
      periodicityType: "TV",
      ea: 1,
      mv: 1,
      specialRate: 4.23
    },
    isSpecialRate: true,
    validityDays: 66,
    validityDate: "2022-10-15",
    termDays: 5,
    paymentMethod: "INTEREST_PER_MONTH_AND_CAPITAL_AT_MATURITY",
    isPunctualPlan: true,
    creationDate: "2022-09-02T20:08:18.000Z",
    modificationDate: "2022-09-10T20:08:18.000Z",
    acceptanceDate: "2022-11-03T20:08:18.000Z",
    evidenceFile: {
        id: 1567,
        name: "C03-T0_0+-+IntroduccioÌn.pdf",
        url: ""
    },
    approvalUser: {
        id: 0,
        name: "Luis",
        firstSurname: "",
        secondSurname: "Salazar",
        email: ""
    },
    acceptanceUser: {
        id: 0,
        name: "Ivan",
        firstSurname: "",
        secondSurname: "",
        email: ""
    },
    creationUser: {
        id: 0,
        name: "Ivan",
        firstSurname: "",
        secondSurname: "",
        email: ""
    },
    clientPermissions: [
        "RATE",
        "DAYS"
    ]
  }