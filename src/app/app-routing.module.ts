import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';

import { RentalComponent } from './components/rental/rental.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path:"cars",pathMatch:"full",component:CarComponent},
  {path:"rentals",component:RentalComponent},
  {path:"customers",component:CustomerComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId/brand/:brandId",component:CarComponent},
  { path: 'cars/detail/:carId', component: CarDetailComponent },
  {path:"rental/:carId", component:RentalAddComponent},
  {path:"payment/:rental",component:PaymentComponent}
  

  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



