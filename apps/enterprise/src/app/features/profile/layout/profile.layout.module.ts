import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { ProfileLayout } from './profile.layout';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [FlexLayoutModule, MatTabsModule, MatMenuModule];

const COMMON_DECLARATIONS = [ProfileLayout];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule, TranslateModule],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ProfileLayoutModule { }
