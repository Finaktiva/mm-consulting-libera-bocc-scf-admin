import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { CustomAttributeTableComponent } from './custom-attribute-table.component';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        TranslateModule,
    ],
    declarations: [CustomAttributeTableComponent],
    exports: [CustomAttributeTableComponent],
})
export class CustomAttributeTableModule {}
