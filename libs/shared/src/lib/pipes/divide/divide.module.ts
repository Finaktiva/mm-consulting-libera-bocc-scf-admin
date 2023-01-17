import { NgModule } from '@angular/core';

import { DividePipe } from './divide.pipe';

@NgModule({
    declarations: [DividePipe],
    exports: [DividePipe],
})
export class DividePipeModule {}
