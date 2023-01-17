import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { environment } from '../environments/environment';
import { BnNgIdleService } from 'bn-ng-idle';

registerLocaleData(localeEs, 'es');

export function HttpLoaderFactory(http: HttpClient) {
    const baseUrl = environment.production ? '/admin' : '';
    return new TranslateHttpLoader(http, `${baseUrl}/assets/i18n/`, '.json');
}

const COMMON_IMPORTS = [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMomentDateModule,
];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}, { metaReducers: [enableBatchReducer] }),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
        }),
        HttpClientModule,
        AppProvidersModule,
        AppRoutingModule,
        AuthenticationStoreModule,
        COMMON_IMPORTS,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    declarations: [AppComponent],
    providers: [BnNgIdleService],
    bootstrap: [AppComponent],
})
export class AppModule {}

export default { COMMON_IMPORTS };
