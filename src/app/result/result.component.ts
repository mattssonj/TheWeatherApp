import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { Forecast } from '../weather/forecast';
import { PrinterService } from '../printer.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  forecast: Forecast;

  constructor(
    private weatherService: WeatherService,
    private logger: PrinterService
  ) { }

  ngOnInit() {
    this.getweather();
    this.logger.log(this.forecast);
  }

  getweather() {
    this.forecast = this.weatherService.forecast;
  }

}
