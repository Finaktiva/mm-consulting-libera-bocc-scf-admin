import { Injectable } from '@angular/core';
import { SubmitQuery } from '@mediomelon/ng-core';
import { CreateFundingRequestStore } from './create-funding-request.store';


@Injectable({
  providedIn: 'root',
})
export class CreateFundingRequestQuery extends SubmitQuery {
  constructor(private store: CreateFundingRequestStore) {
    super(store);
  }
}