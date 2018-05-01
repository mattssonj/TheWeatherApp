import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  something = 'hello';
  id = `${this.something}_mah_sir`;
  // TODO: weather should not be string, just dummy class
  city: string;

  constructor(
    private weatherService: WeatherService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getWeather() {
    if (!this.city) {
      console.log('Nothing entered in search field');
      return;
    }
    console.log('Calling weatherSerivce');
    this.weatherService.getWeather(this.city).subscribe(
      // weather => this.router.navigate([`result/${this.city}`])
      weather => {
      // this.router.navigate([`result/12`]);
      console.log(weather.weather[0].description);
      console.log(weather);
      });
  }

  showResult(cityName: string) {

  }

}
