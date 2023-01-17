import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RejectLinkDialog } from './reject-link.dialog';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule,
    MatProgressBarModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [RejectLinkDialog];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    entryComponents: [RejectLinkDialog],
    exports: [RejectLinkDialog],
})
export class RejectLinkDialogModule {}
