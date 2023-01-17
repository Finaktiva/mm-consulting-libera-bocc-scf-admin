import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ConfirmSignInFederatedFormModule } from '../../components/confirm-sign-in-federated-form/confirm-sign-in-federated-form.module';
import { ConfirmSignInFederatedPage } from './confirm-sign-in-federated.page';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    ConfirmSignInFederatedFormModule,
    CommonModule,
];

const COMMON_DECLARATIONS = [ConfirmSignInFederatedPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ConfirmSignInFederatedModule {}
