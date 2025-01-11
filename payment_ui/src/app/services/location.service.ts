import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  base_url = 'https://restcountries.com/v3.1/all';
  constructor(private http: HttpClient) {}
  get_locations() {
    return this.http.get(`${this.base_url}`);
  }
}
