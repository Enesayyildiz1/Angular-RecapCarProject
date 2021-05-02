import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44305/api/auth';
  constructor(private httpClient:HttpClient) { }
  login(user:LoginModel)
    {
        return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"/login",user);
    }
    register(user:RegisterModel)
    {
        return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"/register",user);
    }
    isAuthenticated()
    {
      if (localStorage.getItem("token")) {
        return true;
        
      }
      else
      {
        return false;
      }
    }
    getUserByEmail(email: string): Observable<SingleResponseModel<RegisterModel>> {
      let newPath = this.apiUrl + 'users/getbyemail?email=' + email;
      return this.httpClient.get<SingleResponseModel<RegisterModel>>(newPath);
    }
}
