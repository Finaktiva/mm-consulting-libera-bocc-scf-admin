import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TranslateModule } from '@ngx-translate/core';
import { DutySearchComponent } from './duty-search.component';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    TranslateModule,
    MatProgressBarModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
];

const COMMON_DECLARATIONS = [DutySearchComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class DutySearchModule {}
