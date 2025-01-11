import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-add-payment',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDividerModule,
    MatListModule,
    MatDialogContent,
    CommonModule,
  ],
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.css',
})
export class AddPaymentComponent {}
