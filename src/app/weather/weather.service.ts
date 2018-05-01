import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

import { Forecast } from './forecast';

// I might need to add more here... timeseries, geometry etc.

@Injectable()
export class WeatherService {
  lat = 57.651576;
  lon = 11.900016;
  myrequest = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&APPID=${environment.owmKey}`;

  constructor(private http: HttpClient) { }

  getWeather(something: any) {
    const some = this.http.jsonp<Forecast>(this.myrequest, 'callback');
    console.log(some);
    return some;
  }


}
