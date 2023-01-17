import 'crypto-js/lib-typedarrays';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Amplify from 'aws-amplify';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

Amplify.configure(environment.amplify);

if (environment.mock) {
    console.warn('App is running in mock environment.');
}

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
