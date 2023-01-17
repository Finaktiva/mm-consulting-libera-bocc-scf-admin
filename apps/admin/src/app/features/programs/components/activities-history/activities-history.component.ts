import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivityHistory, ENTERPRISE_ENTITY_RECORD, ENTERPRISE_EVENT_RECORD_TYPE } from '@libera/models/enterprise';

@Component({
  selector: 'activities-history',
  templateUrl: './activities-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivitiesHistoryComponent implements OnInit {

  @Input() history: ActivityHistory[];

  ENTERPRISE_EVENT_RECORD_TYPE = ENTERPRISE_EVENT_RECORD_TYPE;

  ENTERPRISE_ENTITY_RECORD = ENTERPRISE_ENTITY_RECORD;

  constructor() { }

  ngOnInit() { }

}
