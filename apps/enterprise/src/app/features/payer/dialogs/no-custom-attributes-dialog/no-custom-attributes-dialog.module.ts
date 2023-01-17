import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NoCustomAttributesDialogComponent } from './no-custom-attributes-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_MODULES = [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FlexLayoutModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [NoCustomAttributesDialogComponent];

@NgModule({
    imports: [COMMON_MODULES, RouterModule],
    declarations: COMMON_DECLARATIONS,
    exports: COMMON_DECLARATIONS,
    entryComponents: COMMON_DECLARATIONS,
})
export class NoCustomAttributesDialogModule { }
