import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44305/api/';
  constructor(private httpClient:HttpClient) {}


   getCars():Observable<ListResponseModel<Car>> {
      let newPath=this.apiUrl+"cars/getcardetails"
     return this.httpClient.get<ListResponseModel<Car>>(newPath);
    }

    getCarsByColorId(colorId:number):Observable<ListResponseModel<Car>> {
      let newPath=this.apiUrl+"cars/getByColorId?colorId="+colorId
      return this.httpClient.get<ListResponseModel<Car>>(newPath);
     }
     getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>> {
      let newPath=this.apiUrl+"cars/getByBrandId?brandId="+brandId
      return this.httpClient.get<ListResponseModel<Car>>(newPath);
     }
  }




