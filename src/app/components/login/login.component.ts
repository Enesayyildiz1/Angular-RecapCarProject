import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService) { }

  ngOnInit(): void {
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
            localStorage.setItem("token",response.data.token)
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

}
