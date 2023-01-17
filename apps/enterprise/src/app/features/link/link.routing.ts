import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TokenGuard } from './guards/token.guard';
import { LinkLayout } from './layout/link.layout';
import { LinkLayoutModule } from './layout/link.layout.module';
import { ConfirmLinkModule } from './pages/confirm/confirm-link.module';
import { ConfirmLinkPage } from './pages/confirm/confirm-link.page';

const routes: Routes = [
    {
        path: '',
        component: LinkLayout,
        canActivate: [TokenGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ConfirmLinkPage,
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        LinkLayoutModule,
        ConfirmLinkModule,
    ],
})
export class LinkRoutingModule {}
