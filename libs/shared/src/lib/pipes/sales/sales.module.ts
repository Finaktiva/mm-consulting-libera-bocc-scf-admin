import { NgModule } from '@angular/core';

import { SalesPipe } from './sales.pipe';

@NgModule({
    declarations: [SalesPipe],
    exports: [SalesPipe],
})
export class SalesPipeModule {}