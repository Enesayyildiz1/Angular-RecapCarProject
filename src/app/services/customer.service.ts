import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = 'https://localhost:44305/api/';
  constructor(private httpClient:HttpClient) { }
  getCustomers():Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getall';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
   }
   getCustomerById(customerId: number): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getbyid?id=' + customerId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomerByUserId(userId: number): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getbyuserid?userId=' + userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }
  getCustomerByEmail(email: string): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getbyemail?email=' + email;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }

  
}
