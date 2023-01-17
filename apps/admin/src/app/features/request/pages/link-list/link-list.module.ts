import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { RequestLinkTableModule } from '../../components/request-link-table/request-link-table.module';
import { RequestListFilterFormModule } from '../../components/request-list-filter-form/request-list-filter-form.module';
import { RequestLinkListPage } from './link-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { AlertModule } from '@libera/shared';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    RequestLinkTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatButtonModule,
    RequestListFilterFormModule,
    TranslateModule,
    AlertModule,
];

const COMMON_DECLARATIONS = [RequestLinkListPage];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class RequestLinkListModule {}
