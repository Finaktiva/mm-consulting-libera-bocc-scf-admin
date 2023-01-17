import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AcceptProgramDialogComponent } from './accept-program-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_DECLARATIONS = [AcceptProgramDialogComponent];

const COMMON_IMPORTS = [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FlexLayoutModule,
    MatProgressBarModule,
    TranslateModule,
];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: [COMMON_IMPORTS],
    exports: COMMON_DECLARATIONS,
    entryComponents: COMMON_DECLARATIONS,
})
export class AcceptProgramDialogModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };
