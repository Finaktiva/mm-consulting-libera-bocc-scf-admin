import { NgModule } from '@angular/core';

import { CircleChipComponent } from './circle-chip.component';

const COMMON_IMPORTS = [];

const COMMON_DECLARATIONS = [CircleChipComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class CircleChipModule {}
