import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customer:Customer;
  loginForm:FormGroup;
  
  currentCustomerEmail: string = '';
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private customerService:CustomerService
    ) { }

  ngOnInit(): void {
    this.setCurrentCustomerEmail();
    this.createLoginForm();
   
  }
  createLoginForm()
  {
    this.loginForm=this.formBuilder.group(
      {
        email:["",Validators.required],
        password:["",Validators.required]
      }
    )
  }
  login()
  {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginUser=Object.assign({},this.loginForm.value)
      this.authService.login(loginUser).subscribe(response=>
        {
          
          this.toastrService.success(response.message)
            console.log(response);
            localStorage.setItem("token",response.data.token);
            this.getCustomerByEmail(loginUser.email);

           
        },responseError=>

        {
          console.log(responseError);
          this.toastrService.error(responseError.error);
          
        })
    }
    else{
      this.toastrService.error("Form Eksik");
    }
  }
  getCustomerByEmail(email: string) {
    this.customerService.getCustomerByEmail(email).subscribe(responseSuccess => {
       this.customer = responseSuccess.data;
       this.localStorageService.setCurrentCustomer(this.customer);
    });
 }


 setCurrentCustomerEmail() {
    return this.localStorageService.getCurrentCustomer()
       ? this.currentCustomerEmail = this.localStorageService.getCurrentCustomer().email
       : null;
 }

}
