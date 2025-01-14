import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../components/header/header.component';
import { PaymentListComponent } from '../payment-list/payment-list.component';
import { PaymentService } from '../../../../services/payment.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  imports: [HeaderComponent, PaymentListComponent],
  providers: [PaymentService, HttpClient],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {}
