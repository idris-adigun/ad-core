import { Component } from '@angular/core';
import { PaymentService } from '../../../../services/payment.service';

@Component({
  selector: 'app-payment-list',
  imports: [],
  providers: [PaymentService],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css',
})
export class PaymentListComponent {
  constructor(private paymentService: PaymentService) {
    this.paymentService.get_payments().subscribe((data) => {
      console.log(data);
    });
  }
}
