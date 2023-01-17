import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentationFilePayload, EnterpriseDocumentation } from '@libera/models/enterprise';
import { StateWithUI } from '@mediomelon/ng-core';
import { EnterpriseDocumentationUI } from 'libs/state/src/lib/enterprise-documentation/enterprise-documentation.store';

@Component({
    selector: 'documentation-list',
    templateUrl: './documentation-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationListComponent {
    @Input() entities: StateWithUI<
        EnterpriseDocumentation,
        EnterpriseDocumentationUI
    >[];

    @Output() upload = new EventEmitter<DocumentationFilePayload>();

    @Output() delete = new EventEmitter<number>();

    onUpload(payload: DocumentationFilePayload) {
        this.upload.emit(payload);
    }

    onDelete(id: number) {
        this.delete.emit(id);
    }

    trackBy(
        index: number,
        entity: StateWithUI<EnterpriseDocumentation, EnterpriseDocumentationUI>
    ) {
        return entity ? entity.state.id : undefined;
    }
}
