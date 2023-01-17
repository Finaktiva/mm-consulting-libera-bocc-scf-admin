import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { ForgotPasswordFormModule } from '../../components/forgot-password-form/forgot-password-form.module';
import { ForgotPasswordPage } from './forgot-password.page';

const COMMON_IMPORTS = [
    ForgotPasswordFormModule,
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
];

const COMMON_DECLARATIONS = [ForgotPasswordPage];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ForgotPasswordModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };
