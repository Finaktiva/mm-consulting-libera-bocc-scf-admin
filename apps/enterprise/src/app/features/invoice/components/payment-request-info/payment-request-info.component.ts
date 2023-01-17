import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProviderPayment } from '@libera/models/provider';

@Component({
  selector: 'payment-request-info',
  templateUrl: './payment-request-info.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentRequestInfoComponent implements OnInit {
  @Input() payment: ProviderPayment;

  constructor() { }

  ngOnInit() {
  }

}
