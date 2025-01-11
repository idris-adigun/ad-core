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
@Component({
  selector: 'app-view-details',
  imports: [
    MatDialogTitle,
    MatDividerModule,
    MatListModule,
    MatDialogContent,
    CommonModule,
  ],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css',
})
export class ViewDetailsComponent {
  data = inject(MAT_DIALOG_DATA);
  payment: any = {};
  constructor() {
    console.log(this.data);
    this.payment = this.data;
  }
}
