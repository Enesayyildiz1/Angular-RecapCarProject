import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';
import { Color } from '../models/color';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[], filterText: string): Car[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((p:Car)=>p.name.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }
 
  

}
