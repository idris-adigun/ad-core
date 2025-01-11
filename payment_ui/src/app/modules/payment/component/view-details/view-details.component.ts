import { Component, inject } from '@angular/core';
import {
  MatDialogTitle,
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';
import { Payment } from '../../../../models/payment';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../../services/payment.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-view-details',
  imports: [
    MatDialogTitle,
    MatDividerModule,
    MatListModule,
    MatDialogContent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css',
})
export class ViewDetailsComponent {
  data = inject(MAT_DIALOG_DATA);
  payment: any = {};
  constructor(private paymentService: PaymentService) {
    console.log(this.data);
    this.payment = this.data;
  }

  downloadEvidence(url: any) {
    const filename = url.split('/').pop();
    console.log(filename);
    this.paymentService.downloadEvidence(filename).subscribe((blob: any) => {
      const objectURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectURL;
      link.download = filename;
      link.click();
    });
  }
}
