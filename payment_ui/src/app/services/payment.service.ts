import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  base_url = 'http://localhost:8000';
  constructor(private http: HttpClient) {}

  get_payments(status: string | null, page: number, limit: number) {
    const params: { [param: string]: string } = {
      status: status || '',
      page: page.toString(),
      limit: limit.toString(),
    };
    return this.http.get(`${this.base_url}/payments/get-payments/`, { params });
  }

  delete_payment(payment_id: string) {
    return this.http.delete(
      `${this.base_url}/payments/delete-payment/${payment_id}`
    );
  }

  clearDatabase() {
    return this.http.get(`${this.base_url}/db/clear`);
  }

  resetDatabase() {
    return this.http.get(`${this.base_url}/db/initialize`);
  }
}
