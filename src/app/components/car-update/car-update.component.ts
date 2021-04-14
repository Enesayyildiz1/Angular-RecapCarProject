import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RealCar } from 'src/app/models/realCar';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  cars: RealCar;
  carAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parametreler) => {
      this.getCarsById(parametreler['carId']);
    });
  }
  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      id: [this.cars.id, Validators.required],
      name: [this.cars.name, Validators.required],
      brandId: [this.cars.brandId, Validators.required],
      colorId: [this.cars.colorId, Validators.required],
      modelYear: [this.cars.modelYear, Validators.required],
      dailyPrice: [this.cars.dailyPrice, Validators.required],
      descriptions: [this.cars.descriptions, Validators.required],
    });
  }
  getCarsById(carId: number) {
    this.carService.getCarsById(carId).subscribe((response) => {
      this.cars = response.data;
      console.log(response.data);
      this.createCarAddForm();
    });
  }
  update() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.update(carModel).subscribe((response) => 
      {
        this.toastrService.success('Araç başarıyla güncellendi');
      },
      responseError=>
      {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası");
          
           
         }
      });
    }
    else{
      this.toastrService.error("Form Eksik!!");
    }
  }
}
