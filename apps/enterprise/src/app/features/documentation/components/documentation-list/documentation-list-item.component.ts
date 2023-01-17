import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentationFilePayload, EnterpriseDocumentation } from '@libera/models/enterprise';

@Component({
    selector: 'documentation-list-item',
    templateUrl: './documentation-list-item.component.html',
    styleUrls: ['./documentation-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationListItemComponent {
    @Input() documentation: EnterpriseDocumentation;

    @Input() isUploading: boolean;

    @Input() error: any;

    @Input() isDeleting: boolean;

    @Output() upload = new EventEmitter<DocumentationFilePayload>();

    @Output() delete = new EventEmitter<number>();

    onSubmit(file: File) {
        this.upload.emit({ id: this.documentation.id, file });
    }

    onDelete() {
        this.delete.emit(this.documentation.id);
    }
}
