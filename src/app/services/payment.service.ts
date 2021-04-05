import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { FakeCard } from '../models/fakeCard';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'https://localhost:44305/';
  constructor(private httpClient: HttpClient) {}

  pay(rental:Rental,amount:number){
    let path = this.apiUrl + "rentals/paymentadd";
    //rental.returnDate = undefined;
    this.httpClient.post<ResponseModel>(path,{payment:{amount:amount},rental:rental})
  }
}




