import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import{HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import {ToastrModule} from "ngx-toastr";
import { DatePipe } from '@angular/common';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { CarAddComponent } from './components/car-add/car-add.component'

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    NaviComponent,
    CarComponent,
    CustomerComponent,
    RentalComponent,
  
    CarDetailComponent,
    
    FilterPipePipe,
    
    CartSummaryComponent,
    
    PaymentComponent,
    
    RentalAddComponent,
    
    CarAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      {
        positionClass:"toast-bottom-right"
      }
    )
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
