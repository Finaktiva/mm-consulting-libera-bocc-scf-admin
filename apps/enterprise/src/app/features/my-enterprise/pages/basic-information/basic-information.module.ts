import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EnterpriseFormModule, EnterpriseDetailModule, AdminDetailModule } from '@libera/shared';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BasicInformationPage } from './basic-information.page';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    EnterpriseFormModule,
    TranslateModule,
    EnterpriseDetailModule,
    MatIconModule,
    MatTooltipModule,
    AdminDetailModule
];

const COMMON_DECLARATIONS = [BasicInformationPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class BasicInformationModule { }
