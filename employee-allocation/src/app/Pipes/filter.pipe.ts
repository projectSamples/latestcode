import {Pipe, PipeTransform} from '@angular/core';
import {ICountry} from '../services/employee-data.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], args: string) {
    if (!args) {
      return items;
    }
    return items.filter(item => item.name.toLowerCase().indexOf(args.toLocaleLowerCase()) !== -1);
  }
}
