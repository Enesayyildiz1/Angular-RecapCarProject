import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';


import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car:Car;
  carImages:CarImage[]=[];
  baseUrl="https://localhost:44305";
  rentalControl = false;
  rentalMessage="";

  
  constructor(private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private rentalService:RentalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parametreler)=>
    {
      this.getCarImagesByCarId(parametreler["carId"]);
     this.getCarById(parametreler["carId"]);
     this.getCarRentalControl(parametreler["carId"])
     
    }) 
    
  }
  getCarImagesByCarId(id:number)
  {
      this.carImageService.getCarImagesByCarId(id).subscribe(response=>
        {
            this.carImages= response.data;
          
        }
        

        )
       
  }
 
  getSliderClassName(index: Number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }
  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data[0];
      console.log(this.car);
    
    });
  }
    getCarRentalControl(carId:number) {
      this.rentalService.getRentalCarControl(carId).subscribe((response) => { 
        this.rentalControl=response.success;
        this.rentalMessage=response.message; 
      });

}
}

