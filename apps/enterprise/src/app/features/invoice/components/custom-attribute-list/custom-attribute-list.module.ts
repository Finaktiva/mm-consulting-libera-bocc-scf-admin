import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomAttributeListComponent } from './custom-attribute-list.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule],
    declarations: [CustomAttributeListComponent],
    exports: [CustomAttributeListComponent],
})
export class CustomAttributeListModule {}
