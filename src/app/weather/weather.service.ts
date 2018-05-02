import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';

import { Forecast } from './forecast';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class WeatherService {
  lat = 57.651576;
  lon = 11.900016;
  myrequest = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&APPID=${environment.owmKey}`;
  errorCode: any;

  observable: Observable<Forecast>;

  constructor(private http: HttpClient) { }

  getWeather(something: any): Observable<Forecast> {
    // collects data from OpenWeatherMap
    if (environment.production) {
      return this.http.jsonp<Forecast>(this.myrequest, 'callback')
        .retry(3);
    } else {
      console.log('Running dev mode');
      console.log('Delay activated in http request');
      return this.http.jsonp<Forecast>(this.myrequest, 'callback')
        .delay(1000);
    }
  }

  setObservable(forecast: Forecast) {
    this.observable = new Observable(observer => observer.next(forecast));
  }
}
