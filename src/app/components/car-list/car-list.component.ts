import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { RealCar } from 'src/app/models/realCar';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
cars:RealCar[];
currentCar:RealCar;
  constructor(private carService:CarService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCars();
  }
  getCars() {
    this.carService.getCarss().subscribe(response=>
      {
        this.cars=response.data;
        
      })
    }
    delete(car:RealCar){
    
      this.carService.getCarsById(car?.id).subscribe(response=>{
        let deletedCar:RealCar = response.data;
        this.carService.delete(deletedCar).subscribe(response => {
          this.toastrService.success(response.message, "Success")
          this.getCars();
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
    setCurrentCar(car:RealCar)
    {
      this.currentCar=car;
    }
}
