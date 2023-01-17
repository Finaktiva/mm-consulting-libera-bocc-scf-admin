import { Profile } from '@libera/models/profile';
import { UserRole } from '@libera/models/user';

export const PROFILE_MOCK: Profile = {
    id: 600,
    name: 'ecar',
    firstSurname: 'tester',
    secondSurname: 'chek0',
    email: 'ecar-y-cheko@gmail.com',
    modules: ['PAYER'],
};

export const PERMISSIONS_MOCKS: UserRole[] = 
    [
        {
            code: "PLATFORM_ADMINISTRATOR",
            description: "Administrador de plataforma",
            acronym: "ADPL",
            permissions: [
                {
                code: "READ_BOCC_USER_LIST",
                description: "Ver listado de usuarios"
                }
            ]
        },
        {
            code: "USER_ADMINISTRATOR",
            description: "Administrador de plataforma",
            acronym: "USLL",
            permissions: [
                {
                    code: "READ_BOCC_USER_LIST",
                    description: "Ver listado de usuarios"
                }
            ]
        }
    ]