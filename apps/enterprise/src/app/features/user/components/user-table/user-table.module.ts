import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { StatusChipModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';
import { UserTableComponent } from './user-table.component';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    MatTableModule,
    MatChipsModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    StatusChipModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [UserTableComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class UserTableModule { }
