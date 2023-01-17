import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@libera/shared';

import { ProviderListFilterFormModule } from '../../components/provider-list-filter-form/provider-list-filter-form.module';
import { ProviderTableModule } from '../../components/provider-table/provider-table.module';
import { AddProviderDialogModule } from '../../dialogs/add-provider/add-provider.module';
import { ProviderListPage } from './list.page';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    ProviderTableModule,
    ProviderListFilterFormModule,
    AddProviderDialogModule,
    AlertModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [ProviderListPage];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ProviderListPageModule { }
