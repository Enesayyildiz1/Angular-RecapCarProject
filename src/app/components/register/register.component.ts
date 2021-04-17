import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private router:Router,private authService:AuthService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm()
  {
    this.registerForm=this.formBuilder.group(
      {
        firstName:["",Validators.required],
        lastName:["",Validators.required],
        email:["",Validators.required],
        password:["",Validators.required]
      }
    )
  }
  register()
  {
    if (this.registerForm.valid) {

      console.log(this.registerForm.value);
      let registerUser=Object.assign({},this.registerForm.value);
      this.authService.register(registerUser).subscribe(response=>
        {
          console.log(response);
          this.toastrService.success("Başarıyla kayıt oluşturuldu");
          localStorage.setItem("token",response.data.token);
         
        },errorResponse=>
        {
          this.toastrService.error("Bir sorun oluştu");
     
        })
        this.router.navigate(['/login']);
      
    }
    else{
      this.toastrService.error("Form Eksik");
    }
  }
  
}
