import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@libera/shared';

import { PayerListPage } from './payer-list.page';
import { PayerListFilterFormModule } from '../../components/payer-list-filter-form/payer-list-filter-form.module';
import { PayerTableModule } from '../../components/payer-table/payer-table.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatPaginatorModule,
        AlertModule,
        PayerListFilterFormModule,
        PayerTableModule,
        TranslateModule,
    ],
    declarations: [PayerListPage],
    exports: [PayerListPage],
})
export class PayerListModule { }
