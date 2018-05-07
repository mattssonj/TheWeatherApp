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
  errorCode: any;
  observable$: Observable<Forecast>;

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number): Observable<Forecast> {
    const myrequest = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${environment.owmKey}`;
    // collects data from OpenWeatherMap
    if (environment.production) {
      return this.http.jsonp<Forecast>(myrequest, 'callback')
        .retry(3);
    } else {
      console.log('Running dev mode');
      console.log('Delay activated in http request');
      return this.http.jsonp<Forecast>(myrequest, 'callback')
        .delay(1000);
    }
  }

  setObservable(forecast: Forecast) {
    this.observable$ = new Observable(observer => observer.next(forecast));
  }
}
