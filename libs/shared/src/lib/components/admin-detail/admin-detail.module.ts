import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CircleChipModule } from '../circle-chip/circle-chip.module';
import { TranslateModule } from '@ngx-translate/core';
import { AdminDetailComponent } from './admin-detail.component';


const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    MatTooltipModule,
    CircleChipModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [AdminDetailComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class AdminDetailModule { }
