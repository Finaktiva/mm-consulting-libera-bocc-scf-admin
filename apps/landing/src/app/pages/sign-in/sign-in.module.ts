import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInFormModule } from '../../components/sign-in-form/sign-in-form.module';
import { SignInPage } from './sign-in.page';

const COMMON_IMPORTS = [SignInFormModule, CommonModule];

const COMMON_DECLARATIONS = [SignInPage];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class SignInModule {}

export default { COMMON_IMPORTS, COMMON_DECLARATIONS };
