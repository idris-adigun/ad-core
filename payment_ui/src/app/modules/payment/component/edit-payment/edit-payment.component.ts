import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { LocationService } from '../../../../services/location.service';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UtilService } from '../../../../services/util.service';
import { PaymentService } from '../../../../services/payment.service';
import { Countries } from '../add-payment/add-payment.component';

@Component({
  selector: 'app-edit-payment',
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
    MatSelectModule,
    MatProgressBarModule,
    MatDialogActions,
    MatDialogClose,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-payment.component.html',
  styleUrl: './edit-payment.component.css',
})
export class EditPaymentComponent {
  isLoaded = false;
  payment = {} as Payment;
  data = inject(MAT_DIALOG_DATA);

  payment_status = ['pending', 'overdue'];

  paymentForm = new FormGroup({
    payee_first_name: new FormControl({ value: '', disabled: true }),
    payee_last_name: new FormControl({ value: '', disabled: true }),
    payee_email: new FormControl({ value: '', disabled: true }),
    payee_address_line_1: new FormControl({ value: '', disabled: true }),
    payee_address_line_2: new FormControl({ value: '', disabled: true }),
    payee_country: new FormControl({ value: '', disabled: true }),
    payee_city: new FormControl({ value: '', disabled: true }),
    payee_postal_code: new FormControl({ value: '', disabled: true }),
    currency: new FormControl({ value: '', disabled: true }),
    discount_percent: new FormControl({ value: 0, disabled: true }),
    due_amount: new FormControl({ value: 0, disabled: false }, [
      Validators.required,
    ]),
    payee_due_date: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    payee_payment_status: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    payee_phone_number: new FormControl({ value: '', disabled: true }),
    payee_province_or_state: new FormControl({ value: '', disabled: true }),
    tax_percent: new FormControl({ value: 0, disabled: true }),
  });

  readonly maxDate = new Date();
  constructor(
    private utilService: UtilService,
    private paymentService: PaymentService
  ) {
    console.log(this.data);
    this.payment = this.data;
    this.paymentForm.patchValue({
      ...this.payment,
      payee_postal_code: this.payment.payee_postal_code.toString(),
      payee_phone_number: this.payment.payee_phone_number.toString(),
    });
  }

  update_payment() {
    if (this.paymentForm.invalid) {
      this.utilService.show('Please fill all the required fields', 'Close');
      return;
    }
    const dueDate = this.paymentForm.get('payee_due_date')?.value;
    if (dueDate) {
      const formattedDueDate = new Date(dueDate).toISOString().split('T')[0];
      this.paymentForm.patchValue({ payee_due_date: formattedDueDate });
    }
    this.data['payee_due_date'] = this.paymentForm.get('payee_due_date')?.value;
    this.data['payee_payment_status'] = this.paymentForm.get(
      'payee_payment_status'
    )?.value;
    this.data['due_amount'] = this.paymentForm.get('due_amount')?.value;
    this.paymentService.update_payment(this.data).subscribe(
      (data: any) => {
        console.log(data);
        this.utilService.show('Payment updatesd successfully', 'Close');
        this.paymentForm.reset();
      },
      (error) => {
        this.utilService.show('Error updating payment', 'Close');
      }
    );
  }
}
