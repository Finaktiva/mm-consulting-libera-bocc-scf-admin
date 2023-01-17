import { Injectable } from "@angular/core";
import { ActivityHistory } from '@libera/models/enterprise';
import { EntityQuery } from '@mediomelon/ng-core';
import { ActivitiesHistoryStore } from './activities-history.store';

@Injectable({
  providedIn: 'root'
})

export class ActivitiesHistoryQuery extends EntityQuery<
ActivityHistory>{
  constructor(private store: ActivitiesHistoryStore) {
    super(store);
  }
}