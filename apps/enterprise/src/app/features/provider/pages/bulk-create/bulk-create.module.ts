import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProviderBulkFormModule } from '../../components/provider-bulk-form/provider-bulk-form.module';
import { ProviderBulkCreatePage } from './bulk-create.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, ProviderBulkFormModule, TranslateModule],
    declarations: [ProviderBulkCreatePage],
    exports: [ProviderBulkCreatePage],
})
export class ProviderBulkCreateModule { }
