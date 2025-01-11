import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Payment } from '../../../../models/payment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';

@Component({
  selector: 'app-add-payment',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDividerModule,
    MatListModule,
    MatDialogContent,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.css',
})
export class AddPaymentComponent {
  payment = {} as Payment;

  paymentForm = new FormGroup({
    payee_first_name: new FormControl('', [Validators.required]),
    payee_last_name: new FormControl('', [Validators.required]),
    payee_email: new FormControl('', [Validators.required, Validators.email]),
    payee_address_line_1: new FormControl('', [Validators.required]),
    payee_address_line_2: new FormControl(''),
    payee_country: new FormControl('', [Validators.required]),
    payee_city: new FormControl('', [Validators.required]),
    payee_postal_code: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
    discount_percent: new FormControl(0, [Validators.required]),
    due_amount: new FormControl(0, [Validators.required]),
    payee_added_date_utc: new FormControl(0, [Validators.required]),
    payee_due_date: new FormControl('', [Validators.required]),
    payee_payment_status: new FormControl('', [Validators.required]),
    payee_phone_number: new FormControl(0, [Validators.required]),
    payee_province_or_state: new FormControl('', [Validators.required]),
    tax_percent: new FormControl(0, [Validators.required]),
  });

  constructor() {}
}
