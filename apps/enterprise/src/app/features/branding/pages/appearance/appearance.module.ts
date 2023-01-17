import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseUrlPipeModule } from '@libera/shared';

import { ImageFormModule } from '../../components/image-form/image-form.module';
import { ThemeFormModule } from '../../components/theme-form/theme-form.module';
import { AppearancePage } from './appearance.page';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    CommonModule,
    ThemeFormModule,
    ImageFormModule,
    BaseUrlPipeModule,
    MatProgressBarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [AppearancePage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class AppearanceModule {}
