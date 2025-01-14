import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
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
export interface Countries {
  name: any;
  currency: any;
  timezones: any;
}
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
    MatSelectModule,
    MatProgressBarModule,
    MatDialogActions,
    MatDialogClose,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.css',
})
export class AddPaymentComponent {
  isLoaded = false;
  payment = {} as Payment;
  countries = [] as Countries[];

  payment_status = ['pending'];

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
    payee_phone_number: new FormControl('', [Validators.required]),
    payee_province_or_state: new FormControl('', [Validators.required]),
    tax_percent: new FormControl(0, [Validators.required]),
  });

  readonly maxDate = new Date();
  constructor(
    private locationService: LocationService,
    private utilService: UtilService,
    private paymentService: PaymentService,
    private dialogRef: MatDialogRef<AddPaymentComponent>
  ) {
    this.get_all_locations();
  }

  get_all_locations() {
    this.isLoaded = false;
    this.paymentForm.disable();
    this.locationService.get_locations().subscribe((data: any) => {
      if (data.length > 0) {
        let mappedData = data.map((item: any) => {
          return {
            name: item.name,
            timezones: item.timezones,
          };
        });
        this.countries = mappedData;
        this.isLoaded = true;
        this.paymentForm.enable();
      }
    });
  }

  add_payment() {
    if (this.paymentForm.invalid) {
      this.utilService.show('Please fill all the required fields', 'Close');
      return;
    }
    const dueDate = this.paymentForm.get('payee_due_date')?.value;
    if (dueDate) {
      const formattedDueDate = new Date(dueDate).toISOString().split('T')[0];
      this.paymentForm.patchValue({ payee_due_date: formattedDueDate });
    }
    this.paymentService.add_payment(this.paymentForm.value).subscribe(
      (data: any) => {
        console.log(data);
        this.utilService.show('Payment added successfully', 'Close');
        this.paymentForm.reset();

        this.dialogRef.close();
      },
      (error) => {
        this.utilService.show('Error adding payment', 'Close');
      }
    );
  }
}
