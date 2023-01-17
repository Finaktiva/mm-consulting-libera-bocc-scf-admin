import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AlertModule } from '@libera/shared';


import { TranslateModule } from '@ngx-translate/core';
import { DutyDetailModule } from '../components/duty-detail/duty-detail.module';
import { DutySearchModule } from '../components/duty-search/duty-search.module';
import { DutyPage } from './duty.page';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatDialogModule,
    TranslateModule,
    DutySearchModule,
    DutyDetailModule,
    AlertModule,
];

const COMMON_DECLARATIONS = [DutyPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class DutyPageModule {}
