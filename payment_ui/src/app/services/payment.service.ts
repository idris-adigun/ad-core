import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  base_url = 'http://localhost:8000';
  constructor(private http: HttpClient) {}

  get_payments(keyword: string | null, page: number, limit: number) {
    const params: { [param: string]: string } = {
      keyword: keyword || '',
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

  add_payment(payment: any) {
    return this.http.post(`${this.base_url}/payments/create-payment/`, payment);
  }

  update_payment(payment: any) {
    return this.http.put(
      `${this.base_url}/payments/update-payment/${payment._id}`,
      payment
    );
  }

  clearDatabase() {
    return this.http.get(`${this.base_url}/db/clear`);
  }

  resetDatabase() {
    return this.http.get(`${this.base_url}/db/initialize`);
  }

  uploadEvidence(payment_id: string, evidence: any) {
    const formData = new FormData();
    formData.append('file', evidence);
    return this.http.post(
      `${this.base_url}/evidence/upload/${payment_id}`,
      formData
    );
  }

  downloadEvidence(filename: string) {
    return this.http.get(`${this.base_url}/evidence/download/${filename}`, {
      responseType: 'blob',
    });
  }
}
