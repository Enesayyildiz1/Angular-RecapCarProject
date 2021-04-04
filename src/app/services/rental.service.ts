import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44305/api/rentals/';
  constructor(private httpClient:HttpClient) { }
  getRentals():Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"getrentaldetails");
   }
   getRentalCarControl(carId: number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "getcarcontrol?carId="+carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",rental);
  }
  
}