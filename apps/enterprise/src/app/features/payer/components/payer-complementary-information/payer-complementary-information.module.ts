import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PayerCustomAttributesFormModule } from '../payer-custom-attributes-form/payer-custom-attributes-form.module';
import { PayerCustomAttributesListModule } from '../payer-custom-attributes-list/payer-custom-attributes-list.module';
import { PayerComplementaryInformationComponent } from './payer-complementary-information.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';

const COMMON_MODULES = [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    PayerCustomAttributesFormModule,
    PayerCustomAttributesListModule,
    TranslateModule,
    MatCardModule,
];

const COMMON_DECLARATIONS = [PayerComplementaryInformationComponent];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_MODULES,
    exports: COMMON_DECLARATIONS,
})
export class PayerComplementaryInformationModule {}
