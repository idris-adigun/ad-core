import { Component, ViewChild } from '@angular/core';
import { PaymentService } from '../../../../services/payment.service';
import { Payment } from '../../../../models/payment';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-payment-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [PaymentService],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css',
})
export class PaymentListComponent {
  payment_data = new MatTableDataSource<Payment>([]);
  displayedColumns: string[] = [
    'currency',
    'discount_percent',
    'due_amount',
    'evidence_url',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.payment_data.paginator = this.paginator;
  }

  constructor(private paymentService: PaymentService) {
    this.paymentService.get_payments(null, 2, 10).subscribe((data: any) => {
      const paymentData = data as Payment[];
      this.payment_data.data = paymentData;
      console.log(paymentData);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.payment_data.filter = filterValue.trim().toLowerCase();

    if (this.payment_data.paginator) {
      this.payment_data.paginator.firstPage();
    }
  }
}
