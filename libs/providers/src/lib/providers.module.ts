import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { LabelOptions, MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';

import { AppInterceptor } from './app-interceptor';
import { CustomMatPaginatorIntl } from './custom-mat-paginator-intl';
import { TrimInterceptor } from './trim-interceptor';
import { WINDOW_PROVIDERS } from './window';

const matLabelDefaultOptions: LabelOptions = {
    float: 'always',
};

const matFormFieldDefaultOptions: MatFormFieldDefaultOptions = {
    appearance: 'outline',
};

const matSnackbarDefaultOptions: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    duration: 5000,
};

const matDialogConfig: MatDialogConfig = {
    minWidth: '400px',
    hasBackdrop: true,
    closeOnNavigation: true,
    maxWidth: '80vw',
    role: 'dialog',
};

@NgModule({
    providers: [
        WINDOW_PROVIDERS,
        { provide: LOCALE_ID, useValue: 'es-CO' },
        { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: matSnackbarDefaultOptions,
        },
        { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: matLabelDefaultOptions },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: matFormFieldDefaultOptions,
        },
        { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TrimInterceptor, multi: true },
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: matDialogConfig },
    ],
})
export class AppProvidersModule {}
