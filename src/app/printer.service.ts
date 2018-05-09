import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class PrinterService {

  constructor() { }

  /*
    This service is for debugging only
  */

  log(message: any) {
    if (!environment.production) {
      console.log(message);
    }
  }

  error(message: any) {
    if (!environment.production) {
      console.error(message);
    }
  }

}
