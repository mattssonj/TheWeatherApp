import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { Router } from '@angular/router';
import { Forecast } from '../weather/forecast';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  input: string;

  constructor(
    private weatherService: WeatherService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getWeather() {
    if (!this.input) {
      console.log('Nothing entered in search field');
      return;
    }
    console.log('Calling weatherSerivce');

    this.weatherService.getWeather(this.input).subscribe(
      (data: Forecast) => {
        console.log(data.name);
        this.weatherService.setObservable(data);
        this.router.navigate([`result/${this.input}`]);
      },
      (error: any) => {
        console.error('There was an ERROR');
        console.error(error.status);
        // TODO: Go to some error page
      }
    );
  }

}
