import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carImages:CarImage[]=[];
  baseUrl="https://localhost:44305";
 
  
  constructor(private carImageService:CarImageService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parametreler)=>
    {
      this.getCarImagesByCarId(parametreler["id"]);
    })
  }
  getCarImagesByCarId(id:number)
  {
      this.carImageService.getCarImagesByCarId(id).subscribe(response=>
        {
            this.carImages= response.data;
            console.log(this.carImages);
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
}

