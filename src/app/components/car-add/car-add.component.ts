import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { provideRoutes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;
  constructor(private FormBuilder:FormBuilder,private carService:CarService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCarAddForm();
  }
  createCarAddForm(){
      this.carAddForm=this.FormBuilder.group({
        name:["",Validators.required],
        brandId:["",Validators.required],
        colorId:["",Validators.required],
        modelYear:["",Validators.required],
        dailyPrice:["",Validators.required],
        descriptions:["",Validators.required],
      })
  }
  add(){

    if(this.carAddForm.valid)
    {
       let carModel=Object.assign({}, this.carAddForm.value);
       console.log("buraya geldi")
       this.carService.add(carModel).subscribe(data=>
        {
          console.log(data);
             this.toastrService.success(data.message,"Ürün ekleme başarılı.");
        },responseError=>{
          console.log(responseError)
          this.toastrService.error(responseError.error)
        });
     
    }
    else 
    {
      this.toastrService.error("Formunuz Eksik");
    }

   
 
  }
 
}
