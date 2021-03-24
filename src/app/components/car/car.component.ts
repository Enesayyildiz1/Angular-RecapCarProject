import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { HttpClient } from '@angular/common/http';

import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  currentCar:Car;
  filterText="";

 dataLoaded=false;

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService) {}

  ngOnInit(): void {
   this.activatedRoute.params.subscribe(parametreler=>{
     if(parametreler["brandId"])
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
   }
    )
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
  
}
