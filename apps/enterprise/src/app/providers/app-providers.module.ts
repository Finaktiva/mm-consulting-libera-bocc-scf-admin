import { DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { API_ENDPOINT_PROVIDER, APP_ROUTES_PROVIDER, PRODUCTION_PROVIDER, SHOULD_MOCK_PROVIDER, SECONDS_TO_EXPIRE_SESSION_PROVIDER } from '@libera/environment';
import { AppProvidersModule as ProvidersModule } from '@libera/providers';
import { AmplifyService } from 'aws-amplify-angular';

import { environment } from '../../environments/environment';
import { AuthenticationRoleStore } from '../state/authentication-role/authentication-role.store';
import { initRole } from './init-role';

@NgModule({
    imports: [ProvidersModule],
    providers: [
        AmplifyService,
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: MAT_MOMENT_DATE_FORMATS,
        },
        {
            provide: PRODUCTION_PROVIDER,
            useValue: environment.production,
        },
        {
            provide: API_ENDPOINT_PROVIDER,
            useValue: environment.api,
        },
        {
            provide: SHOULD_MOCK_PROVIDER,
            useValue: environment.mock,
        },
        {
            provide: APP_ROUTES_PROVIDER,
            useValue: environment.routes,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initRole,
            deps: [DOCUMENT, AuthenticationRoleStore],
            multi: true,
        },
        {
            provide: SECONDS_TO_EXPIRE_SESSION_PROVIDER,
            useValue: environment.secondsToExpireSession
        }
    ],
})
export class AppProvidersModule {}
