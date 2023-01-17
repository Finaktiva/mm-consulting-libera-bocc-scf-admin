import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EnterpriseDocumentationFile } from '@libera/models/enterprise';

@Component({
    selector: 'documentation-card',
    templateUrl: './documentation-card.component.html',
    styleUrls: ['./documentation-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationCardComponent {
    @Input() file: EnterpriseDocumentationFile;

    @Input() isDeleting: boolean;

    @Output() delete = new EventEmitter();

    onDelete() {
        this.delete.emit();
    }
}
