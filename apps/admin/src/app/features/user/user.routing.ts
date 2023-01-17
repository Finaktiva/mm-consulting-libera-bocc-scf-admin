import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListModule } from './pages/list.module';
import { UserListPage } from './pages/list.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: UserListPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), UserListModule],
})
export class UserRoutingModule {}
