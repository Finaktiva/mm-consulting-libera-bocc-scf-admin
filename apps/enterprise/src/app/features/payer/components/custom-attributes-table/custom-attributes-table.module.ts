import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomAttributesTableComponent } from './custom-attributes-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_MODULES = [
    CommonModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [CustomAttributesTableComponent];

@NgModule({
    imports: COMMON_MODULES,
    declarations: COMMON_DECLARATIONS,
    exports: COMMON_DECLARATIONS,
})
export class CustomAttributesTableModule { }
