import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RoleCardComponent } from './role-card.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatButtonModule, MatIconModule, TranslateModule],
    declarations: [RoleCardComponent],
    exports: [RoleCardComponent],
})
export class RoleCardModule { }
