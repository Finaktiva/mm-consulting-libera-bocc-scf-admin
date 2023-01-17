import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IncompleteAccountGuard } from './features/documentation/guards/incomplete-account.guard';
import { PendingGuard } from './features/documentation/guards/pending.guard';
import { DocumentationLayout } from './features/documentation/layout/documentation.layout';
import { DocumentationLayoutModule } from './features/documentation/layout/layout.module';
import { DocumentationStatusModule } from './features/documentation/pages/documentation-status/documentation-status.module';
import { DocumentationStatusPage } from './features/documentation/pages/documentation-status/documentation-status.page';
import { UploadDocumentationModule } from './features/documentation/pages/upload-documentation/upload-documentation.module';
import { UploadDocumentationPage } from './features/documentation/pages/upload-documentation/upload-documentation.page';

const routes: Routes = [
    {
        path: '',
        component: DocumentationLayout,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: UploadDocumentationPage,
                canActivate: [IncompleteAccountGuard],
            },
            {
                path: 'status',
                component: DocumentationStatusPage,
                canActivate: [PendingGuard],
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        DocumentationLayoutModule,
        UploadDocumentationModule,
        DocumentationStatusModule,
    ],
})
export class DocumentationRoutingModule {}
