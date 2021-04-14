import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { RealCar } from '../models/realCar';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


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
    getCarById(carId:number):Observable<SingleResponseModel<Car>> {
      let newPath=this.apiUrl+"cars/getcardetailsbyid?carId="+carId
     return this.httpClient.get<SingleResponseModel<Car>>(newPath);
    }
    getCarsById(carId:number):Observable<SingleResponseModel<RealCar>> {
      let newPath=this.apiUrl+"cars/getbyid?id="+carId
     return this.httpClient.get<SingleResponseModel<RealCar>>(newPath);
    }
    

    getCarsByColorId(colorId:number):Observable<ListResponseModel<Car>> {
      let newPath=this.apiUrl+"cars/getByColorId?colorId="+colorId
      return this.httpClient.get<ListResponseModel<Car>>(newPath);
     }
     getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>> {
      let newPath=this.apiUrl+"cars/getByBrandId?brandId="+brandId
      return this.httpClient.get<ListResponseModel<Car>>(newPath);
     }
     getCarsByColorIdBrandId(colorId:number,brandId:number):Observable<ListResponseModel<Car>> {
      let newPath=this.apiUrl+"cars/getbycolorandbrandid?colorId="+colorId+"&brandId="+brandId;
      return this.httpClient.get<ListResponseModel<Car>>(newPath);
     }
     add(car:RealCar):Observable<ResponseModel>
     {
       return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
     }
     update(car:RealCar):Observable<ResponseModel>
     {
       return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
     }

  }




