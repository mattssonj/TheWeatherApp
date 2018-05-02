import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { Forecast } from '../weather/forecast';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  forecast: Forecast;

  constructor(private weatherService: WeatherService) {
    // The forecast instance is listening to changes on WeatherService.
    // Object is updated if search is done from SearchComponent and
    // returned a postive result.
    weatherService.observable.subscribe(observation => {
      this.forecast = observation;
    });
   }

  ngOnInit() {
  }

}
