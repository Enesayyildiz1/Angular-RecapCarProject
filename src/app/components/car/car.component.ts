import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { HttpClient } from '@angular/common/http';

import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  colors: Color[] =[];
  brands:Brand[]=[];
  currentCar:Car;
  filterText="";

 dataLoaded=false;

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService,
    private colorService:ColorService,
    private brandService:BrandService) {}
    brandFilter: Number;
    colorFilter: Number;
  ngOnInit(): void {
   this.activatedRoute.params.subscribe(parametreler=>{
    if(parametreler["colorId"] && parametreler["brandId"]){
      this.getCarsByColorIdAndBrandId(parametreler["colorId"],parametreler["brandId"]);
    }
    else if(parametreler["brandId"])
     {
      
       this.getCarsByBrandId(parametreler["brandId"]);
     }
     else if(parametreler["colorId"])
     {
      this.getCarsByColorId(parametreler["colorId"]);
     }
     else
     {
       this.getCars();
     }
   })
   this.getColors();
   this.getBrands();
 
    
  }
  setCurrentCar(car:Car)
  {
    this.currentCar=car;
  }
  getCars() {
  this.carService.getCars().subscribe(response=>
    {
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
  getCarsByColorId(colorId:number) {
    this.carService.getCarsByColorId(colorId).subscribe(response=>
      {
        this.cars=response.data;
        this.dataLoaded=true;
      })
    }
    getCarsByBrandId(brandId:number) {
      this.carService.getCarsByBrandId(brandId).subscribe(response=>
        {
          this.cars=response.data;
          this.dataLoaded=true;
        })
      }
      getCarsByColorIdAndBrandId(colorId:number,brandId:number) {
        this.carService.getCarsByColorIdBrandId(colorId,brandId).subscribe(response=>
          {
            this.cars=response.data;
            if(colorId===3)
            {
              this.toastrService.info("Sıkıntı");
            }
          })
        }
      addToCart(car:Car)
      {
        if(car.id===1)
        {
          this.toastrService.error("Bu Ürün Sepete Eklenemez",car.brandName);
        }
        else{
          this.toastrService.success("Sepete Eklendi",car.brandName);
          this.cartService.addToCart(car);
        }
       
      }
      getColors() {
        this.colorService.getColors().subscribe(response=>
          {
            this.colors=response.data;
            
          })
        }
        getBrands() {
          this.brandService.getBrands().subscribe(response=>
            {
              this.brands=response.data;
              
            })
          }
         
          getSelectedBrand(brandId: Number) {
            if (this.brandFilter == brandId)
              return true;
            else
              return false;
          }
          getSelectedColor(colorId: Number) {
            if (this.colorFilter == colorId)
              return true;
            else
              return false;
          }
}
