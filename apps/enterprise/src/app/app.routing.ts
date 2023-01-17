import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '@libera/shared';

import { DocumentationGuard } from './guards/documentation.guard';
import { EnabledGuard } from './guards/enabled.guard';
import { SelectedRoleGuard } from './guards/selected-role.guard';
import { CoreLayout } from './layout/core.layout';
import { CoreLayoutModule } from './layout/core.module';

const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'roles',
    },
    {
        path: 'documentation',
        canActivate: [DocumentationGuard],
        loadChildren: () =>
            import('./documentation.routing').then(
                m => m.DocumentationRoutingModule
            ),
    },
    {
        path: 'roles',
        canActivate: [EnabledGuard],
        loadChildren: () =>
            import('./features/role/role.module').then(m => m.RoleModule),
    },
    {
        path: 'link',
        loadChildren: () =>
            import('./features/link/link.module').then(m => m.LinkModule),
    },
    {
        path: 'core',
        component: CoreLayout,
        canActivate: [EnabledGuard, SelectedRoleGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'users',
            },
            {
                path: 'providers',
                loadChildren: () =>
                    import('./features/provider/provider.module').then(
                        m => m.ProviderModule
                    ),
            },
            {
                path: 'users',
                loadChildren: () =>
                    import('./features/user/user.module').then(
                        m => m.UserModule
                    ),
            },
            {
                path: 'profile',
                loadChildren: () =>
                    import('./features/profile/profile.module').then(
                        m => m.ProfileModule
                    ),
            },
            {
                path: 'branding',
                loadChildren: () =>
                    import('./features/branding/branding.module').then(
                        m => m.BrandingModule
                    ),
            },
            {
                path: 'my-enterprise',
                loadChildren: () =>
                    import('./features/my-enterprise/my-enterprise.module').then(
                        m => m.MyEnterpriseModule
                    ),
            },
            {
                path: 'payers',
                loadChildren: () =>
                    import('./features/payer/payer.module').then(
                        m => m.PayerModule
                    ),
            },
            {
                path: 'invoices',
                loadChildren: () =>
                    import('./features/invoice/invoice.module').then(
                        m => m.InvoiceModule
                    ),
            },
            {
                path: 'payer-invoices',
                loadChildren: () =>
                    import('./features/invoice/payer-invoice.module').then(
                        m => m.PayerInvoiceModule
                    ),
            },
            {
                path: 'provider-invoices',
                loadChildren: () =>
                    import('./features/invoice/provider-invoice.module').then(
                        m => m.ProviderInvoiceModule
                    ),
            },
            {
                path: 'lenders',
                loadChildren: () =>
                    import('./features/lender/lender.module').then(
                        m => m.LenderModule
                    ),
            },
        ],
    },
    {
        path: '**',
        redirectTo: '/roles',
    },
];

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthenticatedGuard],
        children: appRoutes,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), CoreLayoutModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
