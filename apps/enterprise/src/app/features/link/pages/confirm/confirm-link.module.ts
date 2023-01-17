import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from "@angular/material/card";
import { AlertModule } from '@libera/shared';

import { ConfirmLinkPage } from './confirm-link.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        AlertModule,
        MatCardModule,
        TranslateModule
    ],
    declarations: [ConfirmLinkPage],
    exports: [ConfirmLinkPage],
})
export class ConfirmLinkModule { }
