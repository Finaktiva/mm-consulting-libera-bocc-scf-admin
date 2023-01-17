import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListModule } from './page/list.module';
import { RoleListPage } from './page/list.page';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: RoleListPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), RoleListModule],
})
export class RoleRoutingModule {}
