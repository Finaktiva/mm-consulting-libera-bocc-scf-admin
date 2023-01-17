import { NgModule } from '@angular/core';

import { AlertComponent } from './alert.component';

const COMMON_IMPORTS = [];

const COMMON_DECLARATIONS = [AlertComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS]
})
export class AlertModule{}