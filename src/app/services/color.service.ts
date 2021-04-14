import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:44305/api/colors';
  constructor(private httpClient:HttpClient) {}


   getColors():Observable<ListResponseModel<Color>> {
     return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"/getall");
    }
    add(color:Color):Observable<ResponseModel>
    {
      return this.httpClient.post<ResponseModel>(this.apiUrl+"/add",color);
    }
    getBrandsById(colorId:number):Observable<SingleResponseModel<Color>> {
      return this.httpClient.get<SingleResponseModel<Color>>(this.apiUrl+"/getbyid?id="+colorId);
     }
     update(color:Color):Observable<ResponseModel>
    {
      return this.httpClient.post<ResponseModel>(this.apiUrl+"/update",color);
    }
  }
