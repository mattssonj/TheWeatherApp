import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { Router } from '@angular/router';
import { Forecast } from '../weather/forecast';
import { ResultComponent } from '../result/result.component';
import { LocationService } from '../location/location.service';
import { Location } from '../location/location';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  input: string;
  @ViewChild('search')
  searchElement: ElementRef;

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private locationService: LocationService,
    private mapsAPILoader: MapsAPILoader
  ) { }

  ngOnInit() {

    // All code in here is to setup google autocomplete
    this.mapsAPILoader.load().then(() => {
      const autoComplete = new google.maps.places.Autocomplete(
        this.searchElement.nativeElement,
        { types: ['geocode'] }
      );
      autoComplete.addListener('place_changed', () => {
        const place: google.maps.places.PlaceResult = autoComplete.getPlace();
        if (!place.geometry) {
          // User entered something that was not suggested
          console.log('place changed activated');
          console.log(place.name);
        }
        const lat = place.geometry.location.lat();
        const lon = place.geometry.location.lng();
        this.getWeather(lat, lon, place.name);
      });
    });
  }

  getWeather(lat: number, lon: number, city: string) {
    if (this.isFieldEmpty()) {
      return;
    }
    console.log('Calling weatherSerivce');

    this.weatherService.getWeather(lat, lon).subscribe(
      (data: Forecast) => {
        console.log(data.name);
        this.weatherService.setObservable(data);
        this.router.navigate([`result/${city}`]);
      },
      (error: any) => {
        console.error('There was an ERROR');
        console.error(error.status);
        // TODO: Go to some error page
      }
    );
  }

  // TODO: circular dependancy on locationService atm...
  getLocation() {
    if (this.isFieldEmpty()) {
      return;
    }
    this.locationService.getPlace(this.input, this.locationCallback, this);
  }

  locationCallback(location: Location, search: SearchComponent) {
    console.log('callback was made. data given --->  ' + location);
    console.log(location);
    if (location.lat === 0 && location.lon === 0) {
      // TODO: no data was found, send to some error page
      return;
    }
    search.getWeather(location.lat, location.lon, location.name);
  }

  currentPosition() {
    console.log('current pos pressed');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        console.log(data);
      });
    }
  }

  isFieldEmpty(): boolean {
    const empty = this.input == null;
    if (empty) {
      console.log('Nothing entered in search field');
    }
    return empty;
  }

}
