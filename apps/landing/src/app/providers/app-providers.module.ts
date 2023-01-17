import { NgModule } from '@angular/core';
import { API_ENDPOINT_PROVIDER, APP_ROUTES_PROVIDER, SHOULD_MOCK_PROVIDER, SECONDS_TO_EXPIRE_SESSION_PROVIDER } from '@libera/environment';
import { AppProvidersModule as ProvidersModule } from '@libera/providers';
import { AmplifyService } from 'aws-amplify-angular';

import { environment } from '../../environments/environment';

@NgModule({
    imports: [ProvidersModule],
    providers: [
        AmplifyService,
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
            provide: SECONDS_TO_EXPIRE_SESSION_PROVIDER,
            useValue: environment.secondsToExpireSession
        }
    ],
})
export class AppProvidersModule {}
