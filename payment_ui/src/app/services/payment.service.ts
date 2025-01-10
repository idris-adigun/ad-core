import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  base_url = 'http://localhost:8000';
  constructor(private http: HttpClient) {}
  get_payments() {
    return this.http.get(`${this.base_url}/payments/get-payments/`);
  }
}
