import { Injectable } from '@angular/core';
import { SubmitQuery } from '@mediomelon/ng-core';
import { CreatePaymentRequestStore } from './create-payment-request.store';


@Injectable({
  providedIn: 'root',
})
export class CreatePaymentRequestQuery extends SubmitQuery {
  constructor(private store: CreatePaymentRequestStore) {
    super(store);
  }
}