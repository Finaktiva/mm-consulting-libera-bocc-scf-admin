import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RoleCardModule } from '../../components/role-card/role-card.module';
import { RoleSelectorPage } from './role-selector.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, RoleCardModule, TranslateModule],
    declarations: [RoleSelectorPage],
    exports: [RoleSelectorPage],
})
export class RoleSelectorModule { }
