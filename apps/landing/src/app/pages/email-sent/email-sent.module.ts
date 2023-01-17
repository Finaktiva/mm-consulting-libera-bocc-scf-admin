import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { EmailSentPage } from './email-sent.page';

const COMMON_IMPORTS = [CommonModule, MatButtonModule, FlexLayoutModule];

const COMMON_DECLARATIONS = [EmailSentPage];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule],
    declarations: COMMON_DECLARATIONS,
    exports: COMMON_DECLARATIONS,
})
export class EmailSentPageModule {}

export default { COMMON_IMPORTS, COMMON_DECLARATIONS };
