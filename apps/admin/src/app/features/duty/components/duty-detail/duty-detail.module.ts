import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material';


import { TranslateModule } from '@ngx-translate/core';
import { DutyDetailComponent } from './duty-detail.component';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    CommonModule,
    TranslateModule,
    MatDividerModule,
];

const COMMON_DECLARATIONS = [DutyDetailComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class DutyDetailModule {}
