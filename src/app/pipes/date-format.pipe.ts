import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';


@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      if (args) {
        return moment(value, environment.serverSideDateFormat).format(args);
      } else {
        return moment(value, environment.serverSideDateFormat).format(environment.uiSideDateFormat);
      }
    } else {
      return '';
    }
  }
}
