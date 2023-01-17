import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { RoleLayout } from './role.layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        MatToolbarModule,
        MatButtonModule,
        TranslateModule
    ],
    declarations: [RoleLayout],
    exports: [RoleLayout],
})
export class RoleLayoutModule { }
