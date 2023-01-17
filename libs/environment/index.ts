import { EnvironmentConfiguration } from './environment';

interface AmplifyConfig {
    readonly Auth: {
        readonly identityPoolId?: string;
        readonly region: string;
        readonly userPoolId: string;
        readonly userPoolWebClientId: string;
        readonly oauth?: {
            readonly domain: string;
            readonly scope: string[];
            readonly redirectSignIn: string;
            readonly redirectSignOut: string;
            readonly responseType: string;
        }

    };
}

export interface AppRoutes {
    landing: string;
    admin: string;
    enterprise: string;
}

export abstract class EnvironmentConfig {
    abstract readonly production: boolean;
    abstract readonly mock: boolean;
    abstract readonly api: string;
    abstract readonly amplify: AmplifyConfig;
    abstract readonly routes: AppRoutes;
    abstract readonly secondsToExpireSession: number;
}

const API_ENDPOINT_DEV = EnvironmentConfiguration.dev.api;
const API_ENDPOINT_STAGE = EnvironmentConfiguration.stage.api
const API_ENDPOINT_PROD = EnvironmentConfiguration.prod.api;

const AMPLIFY_AUTH_CONFIG_DEV: AmplifyConfig = EnvironmentConfiguration.dev;
const AMPLIFY_AUTH_CONFIG_STAGE: AmplifyConfig = EnvironmentConfiguration.stage;
const AMPLIFY_AUTH_CONFIG_PROD: AmplifyConfig = EnvironmentConfiguration.prod;

const SECONDS_TO_EXPIRE_SESSION_DEV = EnvironmentConfiguration.dev.secondsToExpireSession;
const SECONDS_TO_EXPIRE_SESSION_STAGE = EnvironmentConfiguration.stage.secondsToExpireSession
const SECONDS_TO_EXPIRE_SESSION_PROD = EnvironmentConfiguration.prod.secondsToExpireSession;

const APP_ROUTES_DEV: AppRoutes = {
    landing: 'http://localhost:4200',
    admin: 'http://localhost:4201',
    enterprise: 'http://localhost:4202',
};

const APP_ROUTES_STAGE: AppRoutes = {
    landing: '/',
    admin: '/admin',
    enterprise: '/enterprise',
};

const APP_ROUTES_PROD: AppRoutes = {
    landing: '/',
    admin: '/admin',
    enterprise: '/enterprise',
};

export const environment: EnvironmentConfig = {
    production: false,
    mock: false,
    api: API_ENDPOINT_DEV,
    amplify: AMPLIFY_AUTH_CONFIG_DEV,
    routes: APP_ROUTES_DEV,
    secondsToExpireSession: SECONDS_TO_EXPIRE_SESSION_DEV,
};

export const environmentDev: EnvironmentConfig = {
    production: true,
    mock: false,
    api: API_ENDPOINT_DEV,
    amplify: AMPLIFY_AUTH_CONFIG_DEV,
    routes: APP_ROUTES_PROD,
    secondsToExpireSession: SECONDS_TO_EXPIRE_SESSION_DEV,
};

export const environmentStage: EnvironmentConfig = {
    production: false,
    mock: false,
    api: API_ENDPOINT_DEV,
    amplify: AMPLIFY_AUTH_CONFIG_STAGE,
    routes: APP_ROUTES_PROD,
    secondsToExpireSession: SECONDS_TO_EXPIRE_SESSION_STAGE,
};

export const environmentProd: EnvironmentConfig = {
    production: true,
    mock: false,
    api: API_ENDPOINT_PROD,
    amplify: AMPLIFY_AUTH_CONFIG_PROD,
    routes: APP_ROUTES_PROD,
    secondsToExpireSession: SECONDS_TO_EXPIRE_SESSION_PROD,
};

export const environmentMock: EnvironmentConfig = {
    ...environment,
    mock: true,
};

export const PRODUCTION_PROVIDER = 'Production';

export const API_ENDPOINT_PROVIDER = 'API Endpoint';

export const SHOULD_MOCK_PROVIDER = 'Mock Environment';

export const APP_ROUTES_PROVIDER = 'App Routes';

export const SECONDS_TO_EXPIRE_SESSION_PROVIDER = 'Seconds To Expire Session';