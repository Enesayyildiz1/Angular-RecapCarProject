import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;
  constructor(private toastrService:ToastrService,private formBuilder:FormBuilder,private colorService:ColorService) { }

  ngOnInit(): void {
    this.createColorAddForm()
  }
  createColorAddForm()
  {
    this.colorAddForm=this.formBuilder.group(
    {
      name:["",Validators.required]
    });
  }
  add()
  {
    if (this.colorAddForm.valid) {
      let colorModel=Object.assign({},this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(data=>
        {
              this.toastrService.success(data.message,"Renk Başarıyla Eklendi")
        },
        responseError=>
        {
          for (let i = 0; i < responseError.error.Errors.lenght; i++) {
            this.toastrService.error( responseError.error.Errors.ErrorMessage,"Doğrulama Hatası");
            
          }
        })
    }
    else 
    {
      this.toastrService.error("Form Eksik");
    }
  }
}
