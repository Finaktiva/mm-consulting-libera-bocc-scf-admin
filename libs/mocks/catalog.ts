import {
    BankRegions,
    CountryCallingCode,
    Currency,
    EnterpriseSector,
    Language,
    RolePermission,
} from '@libera/models/catalog';
import { UserRole } from '@libera/models/user';

export const COUNTRY_CALLING_CODE_MOCKS: CountryCallingCode[] = [
    {
        id: 1,
        code: '+52',
        country: 'México',
    },
    {
        id: 2,
        code: '+1',
        country: 'Estados Unidos',
    },
    {
        id: 3,
        code: '+12',
        country: 'Colombia',
    },
];

export const ENTERPRISE_SECTOR_MOCKS: EnterpriseSector[] = [
    {
        id: 1,
        name: 'Sector 1',
    },
    {
        id: 2,
        name: 'Sector 2',
    },
    {
        id: 3,
        name: 'Sector 3',
    },
];

export const CURRENCY_MOCKS: Currency[] = [
    {
        code: 'MXN',
        description: 'Peso Mexicano',
    },
    {
        code: 'USD',
        description: 'United States Dollar',
    },
];

export const LANGUAGE_MOCK: Language[] = [
    {
        code: 'es',
        description: 'Español',
    },
    {
        code: 'en',
        description: 'Inglés',
    },
];

export const BANK_REGIONS_MOCK: BankRegions[] = [
    {
        id: "1",
        description: "BOGOTA"
    }
]

export const USER_ROLE_MOCK: UserRole[] = [
    {
      code: "DESCRIPCION_NORMAL",
      description: "déscrípcion normal",
      appliesTo: "LIBERA_USER",
      creationDate: "2022-09-24T00:14:04.000Z",
      modificationDate: "2022-09-26T00:14:04.000Z",
      acronym: "EDML",
      associatedUsers: 0,
      status: "ENABLED"
    },
    {
      code: "DESCRIPCION_NORMAL 2",
      description: "déscrípcion normal 2",
      appliesTo: "LIBERA_USER",
      creationDate: "2022-09-24T00:32:33.000Z",
      modificationDate: "2022-09-25T00:32:33.000Z",
      acronym: "MMDD",
      associatedUsers: 0,
      status: "DISABLED"
    },
    {
        code: "DESCRIPCION_NORMAL 3",
        description: "déscrípcion normal 3",
        appliesTo: "LIBERA_USER",
        creationDate: "2022-09-24T00:32:33.000Z",
        modificationDate: "2022-09-24T00:32:33.000Z",
        acronym: "MMS",
        associatedUsers: 1,
        status: "ENABLED"
    }
  ]

export const ROLE_PERMISSION_MOCK: RolePermission[] = [
    {
        code: "CREATE_ACCOUNT_STATEMENTS",
        description: "Generar y exportar estados de cuenta",
        segment: {
            code: "REPORTS",
            description: "Reportes",
            order: 8
        },
        appliesTo: "BOTH",
        order: 1
    },
    {
        code: "READ_OPERATIONS_STATUS",
        description: "Visualizar estado de las operaciones",
        segment: {
            code: "REPORTS",
            description: "Reportes",
            order: 8
        },
        appliesTo: "BOTH",
        order: 2
    },
    {
        code: "MANAGE_ENTERPRISE_USERS",
        description: "Consulta/Modificación/Eliminación de usuarios Empresas (clientes y proveedores)",
        segment: {
            code: "USER_MANAGEMENT",
            description: "Administración de usuarios",
            order: 1
        },
        appliesTo: "LIBERA_USER",
        order: 9
    },
    {
      code: "CREATE_ENTERPRISE",
      description: "Agregar empresa cliente Unidirecto - Administrador",
      segment: {
        code: "USER_MANAGEMENT",
        description: "Administración de usuarios",
        order: 1
      },
      appliesTo: "LIBERA_USER",
      order: 1
    },
    {
      code: "CREATE_ENTERPRISE_USER_ADMIN",
      description: "Agregar usuario Administrador (empresa cliente Unidirecto)",
      segment: {
        code: "USER_MANAGEMENT",
        description: "Administración de usuarios",
        order: 1
      },
      appliesTo: "LIBERA_USER",
      order: 2
    },
    {
      code: "CREATE_PROVIDER",
      description: "Agregar empresa proveedor (Unidirecto)",
      segment: {
        code: "USER_MANAGEMENT",
        description: "Administración de usuarios",
        order: 1
      },
      appliesTo: "BOTH",
      order: 4
    },
    {
      code: "READ_ENTERPRISE_LINKINGS_LIST",
      description: "Validar vinculación de empresas (proveedores)",
      segment: {
        code: "USER_MANAGEMENT",
        description: "Administración de usuarios",
        order: 1
      },
      appliesTo: "LIBERA_USER",
      order: 5
    },
    {
      code: "READ_ENTERPRISE_LIST",
      description: "Consultar empresas creadas (clientes Unidirecto y proveedores)",
      segment: {
        code: "USER_MANAGEMENT",
        description: "Administración de usuarios",
        order: 1
      },
      appliesTo: "LIBERA_USER",
      order: 6
    },
    {
      code: "READ_PROVIDERS_LINKINGS",
      description: "Consultar empresas relacionadas con el proveedor",
      segment: {
        code: "USER_MANAGEMENT",
        description: "Administración de usuarios",
        order: 1
      },
      appliesTo: "BOTH",
      order: 7
    },
    {
      code: "MANAGE_BOCC_USERS",
      description: "Consulta/Modificación/Eliminación de usuarios Banco",
      segment: {
        code: "USER_MANAGEMENT",
        description: "Administración de usuarios",
        order: 1
      },
      appliesTo: "LIBERA_USER",
      order: 8
    },
    {
      code: "ENABLE_OR_DISABLE_BOCC_USER",
      description: "Acticar/Inactivar usuarios",
      segment: {
        code: "USER_MANAGEMENT",
        description: "Administración de usuarios",
        order: 1
      },
      appliesTo: "LIBERA_USER",
      order: 10
    }
  ]
