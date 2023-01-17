import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LinkedLender } from '@libera/models/lender';
import { StateWithUI, UIState } from '@mediomelon/ng-core';

@Component({
    selector: 'linked-lender-table',
    templateUrl: './linked-lender-table.component.html',
    styles: [],
})
export class LinkedLenderTableComponent {
    @Input() entities: StateWithUI<LinkedLender, UIState>[];

    @Output() updateQuota: EventEmitter<number> = new EventEmitter();
    @Output() requestQuotaExpansion: EventEmitter<number> = new EventEmitter();

    displayedColumns: string[] = [
        'lender',
        'nit',
        'assignedQuota',
        'availableQuota',
        'interestRate',
        'action',
    ];

    onUpdateQuota(id: number) {
        this.updateQuota.emit(id);
    }

    onRequestQuotaExpansion(id: number) {
        this.requestQuotaExpansion.emit(id);
    }
}
