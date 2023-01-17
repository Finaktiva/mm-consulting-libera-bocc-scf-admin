import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ProviderFormModule } from '../../components/provider-form/provider-form.module';
import { AddProviderDialog } from './add-provider.dialog';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    ProviderFormModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [AddProviderDialog];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    entryComponents: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class AddProviderDialogModule { }
