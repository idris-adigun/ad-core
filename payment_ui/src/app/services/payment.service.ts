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
}
