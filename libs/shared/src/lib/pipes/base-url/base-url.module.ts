import { NgModule } from '@angular/core';

import { BaseUrlPipe } from './base-url.pipe';

@NgModule({
    declarations: [BaseUrlPipe],
    exports: [BaseUrlPipe],
})
export class BaseUrlPipeModule {}
