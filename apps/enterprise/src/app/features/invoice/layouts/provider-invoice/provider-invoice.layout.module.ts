import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { AlertModule, StatusChipModule } from '@libera/shared';

import { ProviderInvoiceLayout } from './provider-invoice.layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FlexLayoutModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        AlertModule,
        StatusChipModule,
        TranslateModule
    ],
    declarations: [ProviderInvoiceLayout],
    exports: [ProviderInvoiceLayout],
})
export class ProviderInvoiceLayoutModule { }
