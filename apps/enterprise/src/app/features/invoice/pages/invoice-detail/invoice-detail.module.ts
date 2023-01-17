import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertModule } from '@libera/shared';

import { CustomAttributeListModule } from '../../components/custom-attribute-list/custom-attribute-list.module';
import { EnterpriseFormModule } from '../../components/enterprise-form/enterprise-form.module';
import { EnterpriseInfoModule } from '../../components/enterprise-info/enterprise-info.module';
import { InvoiceInfoModule } from '../../components/invoice-info/invoice-info.module';
import { InvoiceDetailPage } from './invoice-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule,
        AlertModule,
        InvoiceInfoModule,
        CustomAttributeListModule,
        EnterpriseInfoModule,
        EnterpriseFormModule,
        TranslateModule
    ],
    declarations: [InvoiceDetailPage],
    exports: [InvoiceDetailPage],
})
export class InvoiceDetailPageModule { }
