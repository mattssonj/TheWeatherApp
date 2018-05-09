import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';
import { PrinterService } from '../printer.service';

import { Forecast } from './forecast';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class WeatherService {
  errorCode: any;
  forecast: Forecast;

  constructor(
    private logger: PrinterService,
    private http: HttpClient
  ) { }

  getWeather(lat: number, lon: number): Observable<Forecast> {
    const myrequest = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${environment.owmKey}&units=metric`;
    // collects data from OpenWeatherMap
    if (environment.production) {
      return this.http.jsonp<Forecast>(myrequest, 'callback')
        .retry(3);
    } else {
      this.logger.log('Running dev mode');
      this.logger.log('Delay activated in http request');
      return this.http.jsonp<Forecast>(myrequest, 'callback')
        .delay(1000);
    }
  }
}
