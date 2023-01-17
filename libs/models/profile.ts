import { EnterpriseModuleName } from './enterprise';

export interface Profile {
    id: number;
    name: string;
    firstSurname: string;
    secondSurname: string;
    email: string;
    modules: EnterpriseModuleName[];
}
