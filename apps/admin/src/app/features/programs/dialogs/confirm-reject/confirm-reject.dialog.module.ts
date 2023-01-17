import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ExplanationFormModule } from '../../components/explanation-form/explanation-form.module';
import { ConfirmRejectDialog } from './confirm-reject.dialog';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressBarModule,
    ExplanationFormModule,
    TranslateModule
];
const COMMON_DECLARATIONS = [ConfirmRejectDialog];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: [COMMON_IMPORTS],
    exports: COMMON_DECLARATIONS,
    entryComponents: COMMON_DECLARATIONS,
})
export class ConfirmRejectDialogModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };
