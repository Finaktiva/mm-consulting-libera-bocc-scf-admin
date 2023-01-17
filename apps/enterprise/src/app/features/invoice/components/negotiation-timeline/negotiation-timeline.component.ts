import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
    NEGOTIATION_DISCOUNT_TYPE,
    NEGOTIATION_EVENT_TYPE,
    NegotiationEventType,
    NegotiationLog,
} from '@libera/models/shared';

@Component({
    selector: 'negotiation-timeline',
    templateUrl: './negotiation-timeline.component.html',
    styleUrls: ['./negotiation-timeline.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NegotiationTimelineComponent {
    @Input() entities: NegotiationLog[];

    NEGOTIATION_DISCOUNT_TYPE = NEGOTIATION_DISCOUNT_TYPE;

    NEGOTIATION_EVENT_TYPE = NEGOTIATION_EVENT_TYPE;

    getColor(type: NegotiationEventType): 'primary' | 'warn' | null {
        if (type == 'APPROVED') return 'primary';
        if (type == 'REJECTED') return 'warn';
        return null;
    }
}
