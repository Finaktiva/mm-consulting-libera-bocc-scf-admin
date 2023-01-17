import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
    ForgotPasswordSubmitFormModule,
} from '../../components/forgot-password-submit-form/forgot-password-submit-form.module';
import { ForgotPasswordSubmitPage } from './forgot-password-submit.page';

const COMMON_IMPORTS = [
    CommonModule,
    ForgotPasswordSubmitFormModule,
    FlexLayoutModule,
];

const COMMON_DECLARATIONS = [ForgotPasswordSubmitPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: COMMON_DECLARATIONS,
    exports: [COMMON_DECLARATIONS],
})
export class ForgotPasswordSubmitModule {}

export default { COMMON_IMPORTS, COMMON_DECLARATIONS };
