import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FundingRequestLog, FundingRequestEventType } from '@libera/models/lender';
import { FUDING_REQUEST_EVENT_TYPE } from '@libera/models/lender';

@Component({
  selector: 'funding-request-timeline',
  templateUrl: './funding-request-timeline.component.html',
  styleUrls: ['./funding-request-timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FundingRequestTimelineComponent {

  @Input() entities: FundingRequestLog[];
  FUDING_REQUEST_EVENT_TYPE = FUDING_REQUEST_EVENT_TYPE;

  getColor(type: FundingRequestEventType): 'primary' | 'warn' | null {
    if (type == 'APPROVED') return 'primary';
    if (type == 'REJECTED') return 'warn';
    return null;
  }

}
