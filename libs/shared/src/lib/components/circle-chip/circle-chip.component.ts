import { ChangeDetectionStrategy, Component, Input, HostBinding, Renderer2, ElementRef } from '@angular/core';

type Status =
    | 'PENDING_APPROVAL'
    | 'PENDING_ACCEPTANCE'
    | 'REJECTED'
    | 'ALTERNATE'
    | 'CURRENT'
    | 'EXPIRED'
    | 'ABOUT_TO_EXPIRE'
    | 'REJECTED_BY_LIBERA'
    | 'REJECTED_BY_ENTERPRISE';

type ClassName = 'success' | 'warning' | 'error' | 'alternate' | 'placeholder' | 'pending';

@Component({
    selector: 'circle-chip',
    templateUrl: './circle-chip.component.html',
    styleUrls: ['./circle-chip.component.scss'],
    host: {
        class: 'mat-body',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircleChipComponent {

    @Input() set status(status: Status) {
        const element = this.hostElement.nativeElement;

        const classNames: ClassName[] = [
            'success',
            'warning',
            'error',
            'alternate',
            'placeholder',
            'pending'
        ];

        classNames.forEach(className =>
            this.renderer.removeClass(element, className)
        );

        const className = this.mapStatusToClass(status);

        this.renderer.addClass(element, className);
    }

    constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

    private mapStatusToClass(status: Status): ClassName {
        switch (status) {
            case 'CURRENT':
                return 'success';
            case 'ABOUT_TO_EXPIRE':
                return 'warning';
            case 'EXPIRED':
            case 'REJECTED':
            case 'REJECTED_BY_LIBERA':
            case 'REJECTED_BY_ENTERPRISE':
                return 'error';
            case 'ALTERNATE':
                return 'alternate';
            case 'PENDING_APPROVAL':
            case 'PENDING_ACCEPTANCE':
                return 'pending';
            default:
                return 'placeholder';
        }
    }
}
