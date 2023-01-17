import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocumentationFilePayload } from '@libera/models/enterprise';
import {
    EnterpriseDocumentationQuery,
} from 'apps/enterprise/src/app/state/enterprise-documentation/enterprise-documentation.query';
import {
    EnterpriseDocumentationStoreService,
} from 'apps/enterprise/src/app/state/enterprise-documentation/enterprise-documentation.store.service';
import { EnterpriseQuery } from 'apps/enterprise/src/app/state/enterprise/enterprise.query';

@Component({
    selector: 'documentation-status',
    templateUrl: './documentation-status.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationStatusPage implements OnInit {
    isLoading$ = this.query.selectEntityLoading();

    enterpriseStatus$ = this.enterpriseQuery.selectEnterpriseStatus();

    error$ = this.query.selectEntityError();

    entities$ = this.query.selectEntitiesWithUI();

    constructor(
        private query: EnterpriseDocumentationQuery,
        private enterpriseQuery: EnterpriseQuery,
        private storeService: EnterpriseDocumentationStoreService
    ) {}

    ngOnInit() {
        this.fetchDocumentation();
    }

    onRetry() {
        this.fetchDocumentation();
    }

    private fetchDocumentation() {
        this.storeService.fetch().subscribe();
    }

    onUpload({ id, file }: DocumentationFilePayload, explanation: string, expeditionDate: string) {
        this.storeService.uploadFile(id, file, explanation, expeditionDate).subscribe();
    }

    onDelete(id: number) {
        this.storeService.deleteFile(id).subscribe();
    }
}
