import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';
import { PrinterService } from '../printer.service';

import { Forecast } from './forecast';
import { Subscription } from 'rxjs/Subscription';
import { FiveForecast } from './five-forecast';

@Injectable()
export class WeatherService {
  errorCode: any;
  forecast: Forecast;
  fiveForecast: FiveForecast;

  constructor(
    private logger: PrinterService,
    private http: HttpClient
  ) { }

  // get current weather from Open Weather Map
  getCurrentWeather(lat: number, lon: number): Observable<Forecast> {
    const request = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${environment.owmKey}&units=metric`;
    // collects data from OpenWeatherMap
    if (environment.production) {
      return this.http.jsonp<Forecast>(request, 'callback')
        .retry(3);
    } else {
      this.logger.log('Running dev mode');
      this.logger.log('Delay activated in http request');
      return this.http.jsonp<Forecast>(request, 'callback')
        .delay(1000);
    }
  }

  // get weather 5 days forwards in 3 hour intervals
  getForecast(lat: number, lon: number): Observable<FiveForecast> {
    const request = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${environment.owmKey}&units=metric`;

    if (environment.production) {
      return this.http.jsonp<FiveForecast>(request, 'callback')
        .retry(3);
    } else {
      this.logger.log('Running dev mode');
      this.logger.log('Delay activated in http request');
      return this.http.jsonp<FiveForecast>(request, 'callback')
        .delay(1000);
    }
  }
}
