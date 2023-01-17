import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { RequestListFilterFormModule } from '../../components/request-list-filter-form/request-list-filter-form.module';
import { RequestModuleTableModule } from '../../components/request-module-table/request-module-table.module';
import { RequestModuleListPage } from './module-list.page';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    RequestListFilterFormModule,
    RequestModuleTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatButtonModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [RequestModuleListPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class RequestModuleListModule {}
