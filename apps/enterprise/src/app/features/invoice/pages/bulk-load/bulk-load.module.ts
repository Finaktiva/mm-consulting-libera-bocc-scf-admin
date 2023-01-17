import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertModule } from '@libera/shared';

import { BulkInvoiceFormModule } from '../../components/bulk-invoice-form/bulk-invoice-form.module';
import { BulkLoadPage } from './bulk-load.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        AlertModule,
        BulkInvoiceFormModule,
        TranslateModule
    ],
    declarations: [BulkLoadPage],
    exports: [BulkLoadPage],
})
export class BulkLoadPageModule { }
