import { Injectable } from '@angular/core';
import { UnionQuery } from '@mediomelon/ng-core';
import { ActivitiesHistoryUnionStore } from './activities-history.union.store';

@Injectable({
  providedIn: 'root',
})

export class ActivitiesHistoryUnionQuery extends UnionQuery {
  constructor(
    private store: ActivitiesHistoryUnionStore
  ) {
    super(store);
  }
}