import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CreateProgramFormModule } from '../../components/create-program-form/create-program-form.module';
import { CreateProgramDialog } from './create-program.dialog';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    CreateProgramFormModule,
    MatButtonModule,
    MatProgressBarModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [CreateProgramDialog];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_IMPORTS,
    exports: COMMON_DECLARATIONS,
    entryComponents: COMMON_DECLARATIONS,
})
export class CreateProgramDialogModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };
