import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brands:Brand;
  brandAddForm:FormGroup;
 
 
  constructor(private brandService:BrandService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void { 
  
    this.activatedRoute.params.subscribe((parametreler)=>
    {
      this.getBrandsById(parametreler["brandId"]);
      
 
     
    }) 
  
}
createBrandAddForm()
{
  this.brandAddForm=this.formBuilder.group({
    id:[this.brands.id,Validators.required],
    name:[this.brands.name,Validators.required]
  });
}
getBrandsById(brandId:number) {
  this.brandService.getBrandsById(brandId).subscribe(response=>
    {
      this.brands=response.data;
      console.log(response.data);
       this.createBrandAddForm();
    })
  }
  update()
  {
      if (this.brandAddForm.valid) {
        console.log("burda")
        let brandModel=Object.assign({},this.brandAddForm.value)
        this.brandService.update(brandModel).subscribe(response=>
          {
              this.toastrService.success("Marka başarıyla güncellendi");
          },responseError=>
          {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası");
              
               
             }
          });
      }
      else
      {
        this.toastrService.error("Form Eksik");
      }
  }


}

 