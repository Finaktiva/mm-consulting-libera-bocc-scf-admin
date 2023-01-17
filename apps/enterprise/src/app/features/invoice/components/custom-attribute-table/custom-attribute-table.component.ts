import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CustomAttributeWithUI } from '../../state/custom-attribute.query';

@Component({
    selector: 'custom-attribute-table',
    templateUrl: './custom-attribute-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAttributeTableComponent {
    @Input() entities: CustomAttributeWithUI[];

    @Output() delete = new EventEmitter<number>();

    displayedColumns: string[] = ['name', 'creationDate', 'menu'];

    onDelete(id: number) {
        this.delete.emit(id);
    }
}
