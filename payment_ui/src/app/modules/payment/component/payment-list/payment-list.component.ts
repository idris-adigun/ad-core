import { Component, inject, ViewChild } from '@angular/core';
import { PaymentService } from '../../../../services/payment.service';
import { Payment } from '../../../../models/payment';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UtilService } from '../../../../services/util.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewDetailsComponent } from '../view-details/view-details.component';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
@Component({
  selector: 'app-payment-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [PaymentService],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css',
})
export class PaymentListComponent {
  payment_data = new MatTableDataSource<Payment>([]);
  dialog = inject(MatDialog);
  pageSize = 0;
  displayedColumns: string[] = [
    'payee_first_name',
    'payee_last_name',
    'payee_email',
    'currency',
    'total_due',
    'payee_payment_status',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.payment_data.paginator = this.paginator;
  }

  constructor(
    private paymentService: PaymentService,
    private utilService: UtilService
  ) {
    this.getPayments();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.payment_data.filter = filterValue.trim().toLowerCase();

    if (this.payment_data.paginator) {
      this.payment_data.paginator.firstPage();
    }
  }

  getPayments(currentPage: number = 1) {
    this.paymentService.get_payments(null, currentPage, 10).subscribe(
      (data: any) => {
        const paymentData = data?.payments as Payment[];
        const totalPages = data?.total_pages;
        this.pageSize = totalPages * this.paginator.pageSize;
        this.payment_data.data = paymentData;
      },
      (error) => {
        this.payment_data.data = [];
      }
    );
  }

  onPageChange(event: any) {
    const pageIndex = event.pageIndex;
    if (pageIndex < 0 || pageIndex >= this.paginator.getNumberOfPages()) {
      return;
    }
    this.getPayments(pageIndex);
  }

  viewDetails(row: Payment) {
    this.dialog.open(ViewDetailsComponent, {
      data: row,
    });
  }

  addPayment() {
    this.dialog.open(AddPaymentComponent);
  }

  editDetails(row: Payment) {
    console.log(row);
  }

  updatePayment(row: Payment) {
    console.log(row);
  }

  uploadEvidence(row: Payment) {
    console.log(row);
  }

  deletePayment(row: Payment) {
    let payment_id = row._id;
    this.paymentService.delete_payment(payment_id).subscribe(
      (data: any) => {
        if (data.success) {
          // show Alert
          this.utilService.show('Payment Deleted Successfully', 'Close');
          this.getPayments(this.paginator.pageIndex + 1);
        }
      },
      (error) => {
        this.utilService.show('Error Deleting Payment', 'Close');
      }
    );
  }

  resetDatabase() {
    this.paymentService.resetDatabase().subscribe(
      (data: any) => {
        if (data) {
          // show Alert
          this.utilService.show('Database Reset Successfully', 'Close');
          this.getPayments(1);
        }
      },
      (error) => {
        this.utilService.show('Error Resetting Database', 'Close');
      }
    );
  }

  clearDatabase() {
    this.paymentService.clearDatabase().subscribe(
      (data: any) => {
        if (data) {
          // show Alert
          this.utilService.show('Database Reset Successfully', 'Close');
          this.getPayments(1);
        }
      },
      (error) => {
        this.utilService.show('Error Resetting Database', 'Close');
      }
    );
  }
}
