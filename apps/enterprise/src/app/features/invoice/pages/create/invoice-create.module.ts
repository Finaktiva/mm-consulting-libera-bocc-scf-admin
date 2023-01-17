import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertModule } from '@libera/shared';

import { InvoiceFormModule } from '../../components/invoice-form/invoice-form.module';
import {
    CreateInvoiceRedirectDialogModule,
} from '../../dialogs/create-invoice-redirect/create-invoice-redirect.dialog.module';
import { InvoiceCreatePage } from './invoice-create.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        InvoiceFormModule,
        CreateInvoiceRedirectDialogModule,
        AlertModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        TranslateModule
    ],
    declarations: [InvoiceCreatePage],
    exports: [InvoiceCreatePage],
})
export class InvoiceCreatePageModule { }
