import { User } from '@libera/models/user';

export const USER_MOCKS: User[] = [
    {
        id: 1,
        email: 'test@gmail',
        name: 'ecarin',
        firstSurname: 'tester',
        secondSurname: 'test',
        roles: [
            {
                code: "DESCRIPCION_NORMAL",
                description: "déscrípcion normal",
                acronym: "EDML",
            }
        ],
        status: 'ENABLED',
        vinculationDate: null,
    },
    {
        id: 2,
        email: 'hola@gmail',
        name: 'chek',
        firstSurname: 'tester',
        secondSurname: 'test',
        roles: [
            {
                code: "DESCRIPCION_NORMAL 2",
                description: "déscrípcion normal 2",
                acronym: "MMDD",
            }
        ],
        status: 'PENDING_ACCOUNT_CONFIRMATION',
        vinculationDate: null,
    },
    {
        id: 3,
        email: 'hola@gmail',
        name: 'rafa',
        firstSurname: 'ferrari',
        secondSurname: 'test',
        roles: [
            {
                code: "DESCRIPCION_NORMAL 3",
                description: "déscrípcion normal 3",
                acronym: "MMS",
            }
        ],
        status: 'DISABLED',
        vinculationDate: null,
    },
];
