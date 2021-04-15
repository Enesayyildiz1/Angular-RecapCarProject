import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand:Brand;
  constructor(private brandService:BrandService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getbrands();
  }
  getbrands()
  {
    this.brandService.getBrands().subscribe(response=>
      {
        this.brands=response.data;
      }) 
  }
  delete(brand:Brand){
    
    this.brandService.getBrandsById(brand?.id).subscribe(response=>{
      let deletedBrand:Brand = response.data;
      this.brandService.delete(deletedBrand).subscribe(response => {
        this.toastrService.success(response.message, "Success")
        this.getbrands();
      },responseError=>{
        if(responseError.error.ValidationErrors != null 
          && responseError.error.ValidationErrors.length>0){
          let errorText:string;
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            //errorText += responseError.error.ValidationErrors[i].ErrorMessage + "\n";
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Validation Error");
          }
          //this.toastrService.error(errorText, "Validation Error");
        };
      })
    });
  }
  setCurrentBrand(brand:Brand)
  {
    this.currentBrand=brand;
  }
}
