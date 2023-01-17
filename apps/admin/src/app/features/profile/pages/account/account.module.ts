import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfileFormModule } from '@libera/shared';
import { CircleChipModule } from '@libera/shared';

import { AccountPage } from './account.page';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    ProfileFormModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    CircleChipModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [AccountPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class AccountModule {}
