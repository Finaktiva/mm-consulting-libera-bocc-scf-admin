import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkedLenderTableComponent } from './linked-lender-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_MODULES = [
    CommonModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [LinkedLenderTableComponent];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_MODULES,
    exports: COMMON_DECLARATIONS,
})
export class LinkedLenderTableModule {}
