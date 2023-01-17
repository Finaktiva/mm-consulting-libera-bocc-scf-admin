import {
    EnterpriseLinkRequest,
    EnterpriseModuleRequest,
    EnterpriseModuleRequestDetail,
} from '@libera/models/enterprise-request';

export const ENTERPRISE_REQUEST_MODULE_DETAIL_MOCK: EnterpriseModuleRequestDetail = {
    requestId: 1,
    requestDate: '2019-04-24T16:18:46.114Z',
    status: 'EVALUATION_PENDING',
    enterpriseRequester: {
        id: 12,
        email: 'mediomelon@gmail.com',
        enterpriseName: 'mEDIO melon',
        nit: '123.123.123-1',
        status: 'ENABLED',
        providerDocumentType: 'NIT',
        productType: 'UNIDIRECT', 
        department: 'Bogota D.C.', 
        city: 'Bogota',
        economicActivity: {
            ciiuCode: '0111',
            description: '',
            economicSector: {
                id: 1,
                description: ''
            }
        },
        phoneExt: '54',
        phoneNumber: '1546823456',
        comesFromAPI: true,
        disbursementContract: {
            type: "ACCOUNT_DEPOSIT",
            account: {
                type: "SAVINGS",
                number: "1234567890",
                bank: {
                    code: "121",
                    name: "FINANCIERA JURISCOOP"
                }
            },
            bankCertificationFile: {
                id: "109",
                name: "archivo-pdf-rsr-test.pdf",
                url: "https://libera-bocc-dev-resources.s3.amazonaws.com/enterprises/75/disbursement-contracts/providers/%7BproviderId%7D/archivo-pdf-rsr-test.pdf?AWSAccessKeyId=AKIA5RSMBJQZT7IJRMJL&Expires=1739157267&Signature=hLsBWlPfn9R%2BF3b9KH3MXK13YRg%3D"
            }
        },
        owner: {
            id: 1,
            name: 'owner',
            firstSurname: 'last',
            secondSurname: 'name',
        },
    },
};

export const ENTERPRISE_REQUEST_MODULE_MOCKS: EnterpriseModuleRequest[] = [
    {
        requestId: 1,
        enterpriseId: 5,
        documentationCount: '6/6',
        email: 'test@gmail',
        enterpriseName: 'Medio melon',
        moduleRequested: 'FUNDING',
        modules: ['ADMIN', 'PAYER'],
        nit: '345.345.355-6',
        owner: {
            id: 5,
            name: 'Ecarin',
            firstSurname: 'tester',
            secondSurname: 'testing',
        },
        requestDate: '2019-04-24T16:18:46.114Z',
        status: 'EVALUATION_PENDING',
    },
    {
        requestId: 2,
        enterpriseId: 35,
        documentationCount: '1/6',
        email: 'test@gmail',
        enterpriseName: 'Medio melon',
        moduleRequested: 'FUNDING',
        modules: ['ADMIN', 'PAYER'],
        nit: '345.345.355-6',
        owner: {
            id: 5,
            name: 'Ecarin',
            firstSurname: 'tester',
            secondSurname: 'testing',
        },
        requestDate: '',
        status: 'EVALUATION_PENDING',
    },
    {
        requestId: 3,
        enterpriseId: 15,
        documentationCount: '4/6',
        email: '123456@gmail',
        enterpriseName: 'FACEBOOK',
        moduleRequested: 'FUNDING',
        modules: ['ADMIN', 'PAYER'],
        nit: '345.345.355-6',
        owner: {
            id: 5,
            name: 'chek0',
            firstSurname: 'tester',
            secondSurname: 'testing',
        },
        requestDate: '',
        status: 'EVALUATION_PENDING',
    },
];

export const ENTERPRISE_REQUEST_LINK_MOCKS: EnterpriseLinkRequest[] = [
    {
        requestId: 67,
        status: 'EVALUATION_PENDING',
        requestDate: '2019-04-24T16:18:46.114Z',
        vinculationType: 'PROVIDER',
        enterpriseRequester: {
            id: 1,
            email: 'thisisatest@gmail.com',
            enterpriseName: 'Medio melon',
            nit: '606.666.434-2',
            status: 'ENABLED',
            providerDocumentType: 'NIT',
            productType: 'UNIDIRECT', 
            department: 'Bogota D.C.', 
            city: 'Bogota',
            economicActivity: {
                ciiuCode: '0111',
                description: '',
                economicSector: {
                    id: 1,
                    description: ''
                }
            },
            phoneExt: '54',
            phoneNumber: '1546823456',
            comesFromAPI: true,
            disbursementContract: {
                type: "ACCOUNT_DEPOSIT",
                account: {
                    type: "SAVINGS",
                    number: "1234567890",
                    bank: {
                        code: "121",
                        name: "FINANCIERA JURISCOOP"
                    }
                },
                bankCertificationFile: {
                    id: "109",
                    name: "archivo-pdf-rsr-test.pdf",
                    url: "https://libera-bocc-dev-resources.s3.amazonaws.com/enterprises/75/disbursement-contracts/providers/%7BproviderId%7D/archivo-pdf-rsr-test.pdf?AWSAccessKeyId=AKIA5RSMBJQZT7IJRMJL&Expires=1739157267&Signature=hLsBWlPfn9R%2BF3b9KH3MXK13YRg%3D"
                }
            },
            owner: {
                id: 1,
                name: 'owner',
                firstSurname: 'last',
                secondSurname: 'name',
            },
        },
        enterpriseRequested: {
            id: 2,
            email: 'fb@gmail.com',
            enterpriseName: 'facebook',
            nit: '900.876.256-2',
            status: 'PENDING_ACCOUNT_CREATION',
            providerDocumentType: 'NIT',
            productType: 'UNIDIRECT', 
            department: 'Bogota D.C.', 
            city: 'Bogota',
            economicActivity: {
                ciiuCode: '0111',
                description: '',
                economicSector: {
                    id: 1,
                    description: ''
                }
            },
            phoneExt: '54',
            phoneNumber: '1546823456',
            comesFromAPI: true,
            disbursementContract: {
                type: "ACCOUNT_DEPOSIT",
                account: {
                    type: "SAVINGS",
                    number: "1234567890",
                    bank: {
                        code: "121",
                        name: "FINANCIERA JURISCOOP"
                    }
                },
                bankCertificationFile: {
                    id: "109",
                    name: "archivo-pdf-rsr-test.pdf",
                    url: "https://libera-bocc-dev-resources.s3.amazonaws.com/enterprises/75/disbursement-contracts/providers/%7BproviderId%7D/archivo-pdf-rsr-test.pdf?AWSAccessKeyId=AKIA5RSMBJQZT7IJRMJL&Expires=1739157267&Signature=hLsBWlPfn9R%2BF3b9KH3MXK13YRg%3D"
                }
            },
            owner: {
                id: 1,
                name: 'owner',
                firstSurname: 'last',
                secondSurname: 'name',
            },
        },
    },
];
