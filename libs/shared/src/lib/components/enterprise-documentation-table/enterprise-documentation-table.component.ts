import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EnterpriseDocumentation, EnterpriseStatus } from '@libera/models/enterprise';
import { DocumentationFilePayload } from '@libera/models/enterprise';
import { StateWithUI } from '@mediomelon/ng-core';
import { EnterpriseDocumentationUI } from 'libs/state/src/lib/enterprise-documentation/enterprise-documentation.store';

@Component({
    selector: 'enterprise-documentation-table',
    templateUrl: './enterprise-documentation-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterpriseDocumentationTableComponent {
    @Input() entities: StateWithUI<
        EnterpriseDocumentation,
        EnterpriseDocumentationUI
    >[];

    @Input() enterpriseStatus: EnterpriseStatus;

    @Input() showActions: boolean;

    @Input() canAdmin: boolean;

    @Input() canDelete: boolean;

    @Output() upload = new EventEmitter<DocumentationFilePayload>();

    @Output() delete = new EventEmitter<number>();

    @Output() changeStatus = new EventEmitter();

    private withActions = [
        'document',
        'file',
        //'uploadDate',
        'updateDate',
        'validityDate',
        'status',
        'comments',
        'actions',
    ];

    private withoutActions = [
        'document',
        'file',
        //'uploadDate',
        'updateDate',
        'validityDate',
        'status',
        'comments',
    ];

    onDelete(id: number) {
        this.delete.emit(id);
    }

    onUpload(id: number, file: File) {
        this.upload.emit({ id, file });
    }

    onChangeStatus(id: number, status: string) {
        this.changeStatus.emit({ id, status });
    }

    get displayedColumns() {
        return this.showActions ? this.withActions : this.withoutActions;
    }
}
