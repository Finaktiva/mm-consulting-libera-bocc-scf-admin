import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { LinkLayout } from './link.layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatButtonModule,
        TranslateModule
    ],
    declarations: [LinkLayout],
    exports: [LinkLayout],
})
export class LinkLayoutModule { }
