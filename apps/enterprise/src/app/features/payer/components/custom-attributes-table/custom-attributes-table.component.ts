import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { LenderCustomAttribute } from '@libera/models/lender';

@Component({
    selector: 'custom-attributes-table',
    templateUrl: './custom-attributes-table.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAttributesTableComponent implements OnInit {
    @Input() entities: LenderCustomAttribute[];

    @Output() delete = new EventEmitter();

    readonly displayedColumns: string[] = ['name', 'creationDate', 'actions'];

    ngOnInit() {}

    onDelete(id: number) {
        this.delete.emit(id);
    }
}
