import { NgModule } from '@angular/core';

import { StatusChipComponent } from './status-chip.component';

const COMMON_IMPORTS = [];

const COMMON_DECLARATIONS = [StatusChipComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class StatusChipModule {}
