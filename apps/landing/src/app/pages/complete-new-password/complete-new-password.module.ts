import { NgModule } from '@angular/core';
import { CompleteNewPasswordPage } from './complete-new-password.page';
import { CommonModule } from '@angular/common';
import { CompleteNewPasswordFormModule } from '../../components/complete-new-password-form/complete-new-password-form.module';

const COMMON_IMPORTS = [CommonModule, CompleteNewPasswordFormModule];
const COMMON_DECLARATIONS = [CompleteNewPasswordPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: COMMON_DECLARATIONS,
    exports: COMMON_DECLARATIONS,
})
export class CompleteNewPasswordPageModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };
