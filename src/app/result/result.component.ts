import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { Forecast } from '../weather/forecast';
import { PrinterService } from '../printer.service';
import { Router } from '@angular/router';

import { Main } from '../weather/main';
import { Weather } from '../weather/weather';
import { environment } from '../../environments/environment';
import { FiveForecast } from '../weather/five-forecast';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  forecast: FiveForecast;
  days: Forecast[][];
  showingDay: number;

  constructor(
    private weatherService: WeatherService,
    private logger: PrinterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getweather();
    this.testcase();

    this.createDayData();

    this.showingDay = 0;
    this.logger.log(this.forecast);
  }

  testcase(): void {
    if (this.forecast || environment.production) {
      return;
    }
    this.logger.log('Forecast was null, setting up test forecast');
    const m = {
      'temp': 23.54,
      'pressure': null,
      'humidity': null,
      'temp_min': null,
      'temp_max': null
    };

    const wa: Weather[] = [
      {
        'id': null,
        'main': null,
        'description': 'Fucking sunny',
        icon: '01d'
      }
    ];


    const forecast = {
      'name': 'Göteborg',
      'weather': wa,
      'wind': {
        'speed': 5,
        'deg': 150
      },
      'main': m,
      'dt_txt': '2018-05-30 12:00'
    };

    this.forecast = {
      'city': { 'name': 'Göteborg' },
      'list': [
        forecast,
        forecast,
        forecast,
        forecast,
        forecast,
        forecast,
        forecast,
        forecast
      ]
    };
  }

  getweather(): void {
    this.forecast = this.weatherService.fiveForecast;
  }

  /**
   * This method create a matrix were each row is day
   * and col is 3 hour intervall of forecast
   */
  createDayData(): void {
    this.days = [];

    let day = -1;
    let hour = 0;
    let currentDay: string;

    for (const weather of this.forecast.list) {
      const date = this.getDate(weather.dt_txt);

      if (date === currentDay) {
        this.days[day][hour++] = weather;
      } else {
        currentDay = date;
        day++;
        hour = 0;
        this.days[day] = [];
        this.days[day][hour++] = weather;
      }
    }
  }

  getDate(data: string): string {
    return data.substring(0, 10);
  }

  getTime(data: string) {
    return data.substring(11, 16);
  }

  parseInt(double: number) {
    return Math.round(double);
  }

  decrementDay() {
    if (this.showingDay > 0) {
      this.showingDay--;
    }
  }

  incrementDay() {
    if (this.showingDay < this.days.length - 1) {
      this.showingDay++;
    }
  }

  goBack() {
    // Go to search page again
    this.router.navigate(['search']);
  }

  // This method returns a translated icon from
  // open weather map to custom weather icons
  // See result css for more info about icons
  getIconCode(weather: Weather) {
    switch (weather.icon) {
      case '01d':
        return 'wi-day-sunny';
      case '01n':
        return 'wi-night-clear';
      case '02d':
        return 'wi-day-cloudy';
      case '02n':
        return 'wi-night-alt-cloudy';
      case '03d':
        return 'wi-cloud';
      case '03n':
        return 'wi-cloud';
      case '04d':
        return 'wi-cloudy';
      case '04n':
        return 'wi-cloudy';
      // Not sure what is best here. Will use one for day
      // and one for night to start with. Change here else
      case '09d':
        return 'wi-day-showers';
      case '09n':
        return 'wi-night-alt-showers'; // might change both these to f01a
      case '10d':
        return 'wi-day-rain';
      case '10n':
        return 'wi-night-alt-rain'; // might change both these to f019
      case '11d':
        return 'wi-day-thunderstorm';
      case '11n':
        return 'wi-night-thunderstorm';
      case '13d':
        return 'wi-day-snow';
      case '13n':
        return 'wi-night-snow';
      case '50d':
        return 'wi-day-fog';
      case '50n':
        return 'wi-night-fog';
    }
    // https://openweathermap.org/weather-conditions
    // link to owm icons and codes
  }

  // TODO: This is not being used at the moment
  // might never use it. Remove if so
  getIconColor(): string {
    const icon = this.forecast.list[0].weather[0].icon;
    let color: string;
    switch (icon.charAt(icon.length - 1)) {
      case 'd': // its day
        color = 'orange';
        break;
      case 'n': // its night
        color = 'rgb(25, 25, 112)';
        break;
    }
    return `style="color: ${color};"`;
  }

}
