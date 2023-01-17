import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationStoreModule } from '@libera/authentication';
import { enableBatchReducer } from '@libera/shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppProvidersModule } from './providers/app-providers.module';
import { effects } from './store/effects';
import { reducers } from './store/reducers';
import { environment } from '../environments/environment';
import { BnNgIdleService } from 'bn-ng-idle';

registerLocaleData(localeEs, 'es');

export function HttpLoaderFactory(http: HttpClient) {
    const baseUrl = environment.production ? '/enterprise' : '';
    return new TranslateHttpLoader(http, `${baseUrl}/assets/i18n/`, '.json');
}

const COMMON_IMPORTS = [
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatButtonModule,
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers, { metaReducers: [enableBatchReducer] }),
        EffectsModule.forRoot(effects),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
        }),
        AuthenticationStoreModule,
        HttpClientModule,
        MatSnackBarModule,
        AppProvidersModule,
        AppRoutingModule,
        COMMON_IMPORTS,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [BnNgIdleService],
    bootstrap: [AppComponent],
})
export class AppModule {}

export default { COMMON_IMPORTS };
