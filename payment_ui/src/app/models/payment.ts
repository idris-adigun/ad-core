export interface Payment {
  currency: string;
  discount_percent: number;
  due_amount: number;
  evidence_url: string;
  payee_added_date_utc: number;
  payee_address_line_1: string;
  payee_address_line_2: string;
  payee_city: string;
  payee_country: string;
  payee_due_date: string;
  payee_email: string;
  payee_first_name: string;
  payee_last_name: string;
  payee_payment_status: string;
  payee_phone_number: number;
  payee_postal_code: number;
  payee_province_or_state: string;
  tax_percent: number;
  _id: string;
}
