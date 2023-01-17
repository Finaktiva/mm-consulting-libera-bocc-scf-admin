import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DutyPageModule } from './page/duty.module';
import { DutyPage } from './page/duty.page';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DutyPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), DutyPageModule],
})
export class DutyRoutingModule {}
