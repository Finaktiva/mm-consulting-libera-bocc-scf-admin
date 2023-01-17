import { Enterprise } from '@libera/models/enterprise';

export const enterprises: Enterprise[] = [
    {
        id: 1,
        email: 'lorem@mm.com',
        enterpriseName: 'Lorem',
        nit: '901.456.789-8',
        enterpriseType: 'SELF_MANAGEMENT',
        phone: {
            extension: '+52',
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
        vinculationDate: new Date().toISOString(),
        status: 'ENABLED',
        modules: ['PAYER'],
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
    },
    {
        id: 2,
        email: 'mock@mm.com',
        enterpriseType: 'MIXED',
        enterpriseName: 'Mock',
        nit: '900.876.256-2',
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
            id: 31,
            name: 'Ecarin',
            firstSurname: 'Tester',
            secondSurname: 'Testing',
            email: 'program1@mock.com',
            modules: ['PAYER', 'PROVIDER', 'FUNDING'],
            documentType: null,
            documentNumber: null
        },
        vinculationDate: new Date().toISOString(),
        status: 'PENDING_ACCOUNT_CONFIRMATION',
        modules: ['PAYER', 'PROVIDER', 'FUNDING'],
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
    },
    {
        id: 3,
        email: 'mock@mock.com',
        enterpriseType: 'PUBLIC',
        enterpriseName: 'Mock 2',
        nit: '901.456.783-4',
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
            id: 3,
            name: 'Cheko',
            firstSurname: 'Ferrari',
            secondSurname: 'hola',
            email: 'program1@mock.com',
            modules: ['FUNDING'],
            documentType: null,
            documentNumber: null
        },
        vinculationDate: new Date().toISOString(),
        status: 'INCOMPLETE_ACCOUNT',
        modules: ['FUNDING'],
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
    },
    {
        id: 5,
        enterpriseType: 'PUBLIC',
        email: 'lorem@mm.com',
        enterpriseName: 'Lorem',
        nit: '901.456.789-8',
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
        vinculationDate: new Date().toISOString(),
        status: 'ENABLED',
        modules: ['PAYER'],
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
    },
    {
        id: 6,
        enterpriseType: 'SELF_MANAGEMENT',
        email: 'mock@mm.com',
        enterpriseName: 'Mock',
        nit: '900.876.256-2',
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
            modules: ['PAYER', 'PROVIDER', 'FUNDING'],
            documentType: null,
            documentNumber: null
        },
        vinculationDate: new Date().toISOString(),
        status: 'EVALUATION_PENDING',
        modules: ['PAYER', 'PROVIDER', 'FUNDING'],
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
    },
    {
        id: 7,
        enterpriseType: 'SELF_MANAGEMENT',
        email: 'mock@mock.com',
        enterpriseName: 'Mock 2',
        nit: '901.456.783-4',
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
            modules: ['FUNDING'],
            documentType: null,
            documentNumber: null
        },
        vinculationDate: new Date().toISOString(),
        status: 'INCOMPLETE_ACCOUNT',
        modules: ['FUNDING'],
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
    },
    {
        id: 8,
        enterpriseType: 'SELF_MANAGEMENT',
        email: 'lorem@mm.com',
        enterpriseName: 'Lorem',
        nit: '901.456.789-8',
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
        vinculationDate: new Date().toISOString(),
        status: 'ENABLED',
        modules: ['PAYER'],
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
    },
    {
        id: 9,
        enterpriseType: 'SELF_MANAGEMENT',
        email: 'mock@mm.com',
        enterpriseName: 'Mock',
        nit: '900.876.256-2',
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
            modules: ['PAYER', 'PROVIDER', 'FUNDING'],
            documentType: null,
            documentNumber: null
        },
        vinculationDate: new Date().toISOString(),
        status: 'EVALUATION_PENDING',
        modules: ['PAYER', 'PROVIDER', 'FUNDING'],
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
    },
    {
        id: 10,
        enterpriseType: 'SELF_MANAGEMENT',
        email: 'mock@mock.com',
        enterpriseName: 'Mock 2',
        nit: '901.456.783-4',
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
            modules: ['FUNDING', 'ADMIN'],
            documentType: null,
            documentNumber: null
        },
        vinculationDate: new Date().toISOString(),
        status: 'INCOMPLETE_ACCOUNT',
        modules: ['FUNDING', 'ADMIN'],
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
    },
];
