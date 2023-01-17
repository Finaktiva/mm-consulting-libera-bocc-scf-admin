import { NgModule } from '@angular/core';

import { CurrencySymbolPipe } from './currency-symbol.pipe';

@NgModule({
    declarations: [CurrencySymbolPipe],
    exports: [CurrencySymbolPipe],
})
export class CurrencySymbolPipeModule {}
