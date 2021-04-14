import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private brandService:BrandService) {}

  ngOnInit(): void {
    this.createBrandAddForm();
  }
  createBrandAddForm()
  {
    this.brandAddForm=this.formBuilder.group({
      name:["",Validators.required]
    });
  }
  add()
  {
    if (this.brandAddForm.valid) {
      let brandModel=Object.assign({}, this.brandAddForm.value);
    this.brandService.add(brandModel).subscribe(data=>
      {
        this.toastrService.success(data.message,"Marka Ekleme Başarılı");
      },responseError=>
      {
       for (let i = 0; i < responseError.error.Errors.length; i++) {
        this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası");
        
         
       }
      }
        
      );
    }
    else{
      this.toastrService.error("Form Eksik!!")
    }
    
  }
}
