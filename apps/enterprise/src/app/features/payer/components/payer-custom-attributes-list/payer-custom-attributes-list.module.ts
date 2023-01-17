import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FunctionalPipesModule } from '@libera/shared';
import { PayerCustomAttributesListComponent } from './payer-custom-attributes-list.component';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_MODULES = [
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FunctionalPipesModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [PayerCustomAttributesListComponent];

@NgModule({
    imports: COMMON_MODULES,
    declarations: COMMON_DECLARATIONS,
    exports: COMMON_DECLARATIONS,
})
export class PayerCustomAttributesListModule { }
