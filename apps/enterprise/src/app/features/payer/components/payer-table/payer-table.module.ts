import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayerTableComponent } from './payer-table.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [PayerTableComponent],
    imports: [CommonModule, MatTableModule, RouterModule, TranslateModule],
    exports: [PayerTableComponent],
})
export class PayerTableModule { }
