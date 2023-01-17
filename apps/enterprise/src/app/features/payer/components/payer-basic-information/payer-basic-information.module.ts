import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PayerBasicInformationComponent } from './payer-basic-information.component';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_DECLARATIONS = [PayerBasicInformationComponent];

const COMMON_MODULES = [CommonModule, FlexLayoutModule, TranslateModule];

@NgModule({
    imports: COMMON_MODULES,
    declarations: COMMON_DECLARATIONS,
    exports: COMMON_DECLARATIONS,
})
export class PayerBasicInformationModule { }
