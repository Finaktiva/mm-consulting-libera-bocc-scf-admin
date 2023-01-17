import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';

type Status =
    | 'APPROVED'
    | 'AVAILABLE'
    | 'ACCEPTED'
    | 'COMPLETED'
    | 'CANCELLED'
    | 'DISABLED'
    | 'DELETED'
    | 'ENABLED'
    | 'ERROR'
    | 'EVALUATION_PENDING'
    | 'INCOMPLETE_ACCOUNT'
    | 'LOADED'
    | 'PENDING'
    | 'PENDING_ACCOUNT_CREATION'
    | 'PENDING_ACCOUNT_CONFIRMATION'
    | 'PENDING_VALIDATION'
    | 'PENDING_AUTHORIZATION'
    | 'PENDING_CONFIRMATION'
    | 'PENDING_COMPLETION'
    | 'PENDING_LINK_CREATION'
    | 'PROVIDER_PENDING_RESPONSE'
    | 'PAYER_PENDING_RESPONSE'
    | 'NEGOTIATION_IN_PROGRESS'
    | 'NEGOTIATION_FINISHED'
    | 'NEGOTIATION_APPROVED'
    | 'NEGOTIATION_REJECTED'
    | 'NEGOTIATION_CANCELED'
    | 'NEGOTIATION_EXPIRED'
    | 'FUNDING_IN_PROGRESS'
    | 'FUNDING_FINISHED'
    | 'PAID'
    | 'RELOAD_FILE'
    | 'REJECTED'
    | 'REQUESTED_MODULE'
    | 'CURRENT'
    | 'EXPIRED'
    | 'ABOUT_TO_EXPIRE'
    | 'CO'
    | 'FI'
    | 'EX'
    ;

type ClassName = 'success' | 'warning' | 'error' | 'alternate' | 'placeholder' | 'display';

@Component({
    selector: 'status-chip',
    templateUrl: './status-chip.component.html',
    styleUrls: ['./status-chip.component.scss'],
    host: {
        class: 'mat-body',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusChipComponent {
    @Input() set status(status: Status) {
        const element = this.hostElement.nativeElement;

        const classNames: ClassName[] = [
            'success',
            'warning',
            'error',
            'alternate',
            'placeholder',
            'display',
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
            case 'APPROVED':
            case 'AVAILABLE':
            case 'ACCEPTED':
            case 'ENABLED':
            case 'COMPLETED':
            case 'PAID':
            case 'NEGOTIATION_APPROVED':
            case 'CURRENT':
                return 'success';
            case 'EVALUATION_PENDING':
            case 'PROVIDER_PENDING_RESPONSE':
            case 'PAYER_PENDING_RESPONSE':
            case 'PENDING':
            case 'PENDING_ACCOUNT_CREATION':
            case 'PENDING_ACCOUNT_CONFIRMATION':
            case 'PENDING_AUTHORIZATION':
            case 'PENDING_VALIDATION':
            case 'PENDING_CONFIRMATION':
            case 'PENDING_LINK_CREATION':
            case 'PENDING_COMPLETION':
            case 'NEGOTIATION_IN_PROGRESS':
            case 'FUNDING_IN_PROGRESS':
            case 'LOADED':
            case 'ABOUT_TO_EXPIRE':
                return 'warning';
            case 'CANCELLED':
            case 'DELETED':
            case 'DISABLED':
            case 'ERROR':
            case 'REJECTED':
            case 'RELOAD_FILE':
            case 'INCOMPLETE_ACCOUNT':
            case 'NEGOTIATION_REJECTED':
            case 'NEGOTIATION_CANCELED':
            case 'NEGOTIATION_EXPIRED':
            case 'EXPIRED':
                return 'error';
            case 'NEGOTIATION_FINISHED':
            case 'FUNDING_FINISHED':
                return 'alternate';
            case 'CO':
            case 'FI':
            case 'EX':
                return 'display'
            default:
                return 'placeholder';
        }
    }
}
