import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'documentation-card',
    templateUrl: './documentation-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.mat-elevation-z1]': 'true',
    },
    styles: [
        `
            :host {
                display: flex;
                flex-direction: column;
                place-content: center;
                align-items: stretch;
                height: 200px;
                padding: 0 12px;
            }
        `,
    ],
})
export class DocumentationCardComponent {
    @Input() file: { name: string };

    @Input() isDeleting: boolean;

    @Output() delete = new EventEmitter();

    onDelete() {
        this.delete.emit();
    }
}
