import { ValidatorFn, Validators } from '@angular/forms';
import { nitValidator } from '@libera/validators';
import {
    AUTHENTICATION_ROLE,
    AuthenticationRole,
} from '@libera/models/authentication';

export const NIT_REGEX = '(^[0-9]{8}$)';

export const ALPHANUMERIC_REGEX = '(^[A-Za-z0-9\s]+$)';

export const CIIU_REGEX = '(^[0-9]{4}$)';

export const NUMBER_REGEX = '(^[0-9]+$)';

export const LETTERS_REGEX = /[A-Za-záéíóúÁÉÍÓÚñÑ\s]/g;

export const SALES_REGEX = /\B(?=(\d{3})+(?!\d))/g;

export const ONLY_ALPHANUMERIC_REGEX = /\D/g;

export const ONLY_NUMBER_REGEX = /(\d+)/g;

export const RATE_REGEX = /^((100(\,0{1,4})?)|(\d{1,2}(\,\d{1,4})?))$/;

export const DATE_REGEX = /\d{4}-\d{2}-\d{2}/g;

export const NUMBER_TEST_REGEX = /^-?\d+$/;

export const PASSWORD_MINLENGTH = 8;

export const PASSWORD_MAXLENGTH = 32;

export const PAGE_SIZE_OPTIONS = [5, 10, 15, 25];

//15
export const DEFAULT_PAGE_SIZE = PAGE_SIZE_OPTIONS[2];

export const CODE_LENGTH = 6;

export const NAME_REGEX = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]{5,32}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const REMOVE_POINTS = /\./g;

export const LiberaErrorCodes = {
    'SCF.LIBERA.04': 'El correo ingresado ya se encuentra en uso.',
    'SCF.LIBERA.10': 'El NIT ingresado ya se encuentra en uso.',
    'SCF.LIBERA.27': 'Debe seleccionar almenos un módulo para el programa.',
};

export const nitValidators: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
    Validators.pattern(NIT_REGEX),
    nitValidator,
];

export const LANGUAGE_KEY = 'language';

export const ROLE_PATHS: { [key in AuthenticationRole]: RegExp[] } = {
    [AUTHENTICATION_ROLE.ENTERPRISE_CONSOLE_ADMIN]: [
        /users$/,
        /my-enterprise(\/(modules|documentation))?$/,
        /branding$/,
    ],
    [AUTHENTICATION_ROLE.ENTERPRISE_PROVIDER_ADMIN]: [/provider-invoices/],
    [AUTHENTICATION_ROLE.ENTERPRISE_FUNDING_ADMIN]: [
        /payers/,
        /lenders\/(requests|quota-requests)/,
    ],
    [AUTHENTICATION_ROLE.ENTERPRISE_PAYER_ADMIN]: [
        /providers/,
        /lenders$/,
        /lenders\/(available|linked)/,
        /payer-invoices/,
        /invoices/,
    ],
};
