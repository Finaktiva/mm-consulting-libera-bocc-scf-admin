import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChangePasswordFormModule } from '@libera/shared';

import { SecurityPage } from './security.page';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    ChangePasswordFormModule,
];

const COMMON_DECLARATIONS = [SecurityPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class SecurityModule {}
