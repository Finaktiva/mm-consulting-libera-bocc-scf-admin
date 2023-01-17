import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { LENDER_CUSTOM_ATTRIBUTE_TYPES } from '@libera/models/lender';
import { PayerCustomAttribute } from '@libera/models/payer';

@Component({
    selector: 'payer-custom-attributes-list',
    templateUrl: './payer-custom-attributes-list.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayerCustomAttributesListComponent implements OnInit {
    @Input() entities: PayerCustomAttribute[];
    @Input() isDeleting: boolean;
    @Input() hasUnansweredAttributes: boolean;

    @Output() delete: EventEmitter<number> = new EventEmitter();
    @Output() capture = new EventEmitter();

    shouldHideButton: boolean;

    TYPES = LENDER_CUSTOM_ATTRIBUTE_TYPES;

    ngOnInit() {
        this.shouldHideButton = this.entities.some(attribute => {
            return attribute.type == 'CHECKBOX'
                ? attribute.options.some(option => option.isChecked)
                : !!attribute.value;
        });
    }

    onDelete(id: number) {
        this.delete.emit(id);
    }

    onCapture() {
        this.capture.emit();
    }
}
