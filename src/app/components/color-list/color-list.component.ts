import { Component, OnInit } from '@angular/core';
import {  ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {
colors:Color[];
currentColor:Color;
  constructor(private colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getColors();
  }
  getColors()
  {
    this.colorService.getColors().subscribe(response=>
      {
        this.colors=response.data;
      }) 
  }
  delete(color:Color){
    
    this.colorService.getBrandsById(color?.id).subscribe(response=>{
      let deletedColor:Color = response.data;
      this.colorService.delete(deletedColor).subscribe(response => {
        this.toastrService.success(response.message, "Success")
        this.getColors();
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
  setCurrentColor(color:Color)
  {
    this.currentColor=color;
  }
}
