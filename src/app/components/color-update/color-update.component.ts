import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
 colors:Color;
 colorAddForm:FormGroup;
  constructor(private toastrService:ToastrService,
    private colorService:ColorService,private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void { 
  
    this.activatedRoute.params.subscribe((parametreler)=>
    {
      this.getColorsById(parametreler["colorId"]);
      
 
     
    }) 
  
}
createColorAddForm()
{
  this.colorAddForm=this.formBuilder.group({
    id:[this.colors.id,Validators.required],
    name:[this.colors.name,Validators.required]
  });
}
getColorsById(colorId:number) {
  this.colorService.getBrandsById(colorId).subscribe(response=>
    {
      this.colors=response.data;
      console.log(response.data);
       this.createColorAddForm();
    })
  }
  update()
  {
      if (this.colorAddForm.valid) {
        console.log("burda")
        let colorModel=Object.assign({},this.colorAddForm.value)
        this.colorService.update(colorModel).subscribe(response=>
          {
              this.toastrService.success("Renk başarıyla güncellendi");
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

