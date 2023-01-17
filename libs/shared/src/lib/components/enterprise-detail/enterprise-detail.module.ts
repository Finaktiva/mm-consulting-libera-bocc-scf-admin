import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EnterpriseDetailComponent } from './enterprise-detail.component';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [CommonModule, FlexLayoutModule, TranslateModule];

const COMMON_DECLARATIONS = [EnterpriseDetailComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class EnterpriseDetailModule {}
