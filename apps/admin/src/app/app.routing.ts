import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '@libera/shared';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthenticatedGuard],
        children: [
            {
                path: 'programs',
                loadChildren: () =>
                    import('./features/programs/programs.module').then(
                        m => m.ProgramsModule
                    ),
            },
            {
                path: 'requests',
                loadChildren: () =>
                    import('./features/request/request.module').then(
                        m => m.RequestModule
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
                path: 'role',
                loadChildren: () =>
                    import('./features/role/role.module').then(
                        m => m.RoleModule
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
                path: 'duty',
                loadChildren: () =>
                    import('./features/duty/duty.module').then(
                        m => m.DutyModule
                    ),
            },
            {
                path: '**',
                redirectTo: 'programs',
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            onSameUrlNavigation: 'reload',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
