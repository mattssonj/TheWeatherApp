import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { Router } from '@angular/router';
import { Forecast } from '../weather/forecast';
import { LocationService } from '../location/location.service';
import { Location } from '../location/location';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { PrinterService } from '../printer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  input: string;
  @ViewChild('search') searchElement: ElementRef;

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private locationService: LocationService,
    private mapsAPILoader: MapsAPILoader,
    private logger: PrinterService,
    private ngZone: NgZone
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
          this.logger.log('place changed activated');
          this.logger.log(place.name);
        }
        const lat = place.geometry.location.lat();
        const lon = place.geometry.location.lng();
        this.getWeather(lat, lon, place.name);
      });
    });
  }

  getWeather(lat: number, lon: number, city: string) {
    this.logger.log('Calling weatherSerivce');

    this.weatherService.getWeather(lat, lon).subscribe(
      (data: Forecast) => {
        this.logger.log(data.name);
        this.weatherService.forecast = data;

        this.ngZone.run(() => this.router.navigateByUrl(`result/${city}`));
        // this.router.navigate([`result/${city}`]); // This code seems to be bugged and therefore using ngZone
      },
      (error: any) => {
        this.logger.error('There was an ERROR');
        this.logger.error(error.status);
        // TODO: Go to some error page
      }
    );
  }

  // TODO: circular dependancy on locationService atm...
  getLocation() {
    if (this.isFieldEmpty()) {
      return;
    }
    this.locationService.getPosition(this.input, this.locationCallback, this);
  }

  locationCallback(location: Location, search: SearchComponent) {
    search.logger.log('callback was made. data given --->  ' + location);
    search.logger.log(location);
    if ((location.lat === 0 && location.lon === 0) || location.name == null) {
      // TODO: no data was found, send to some error page
      search.logger.log('no position was found');
      return;
    }
    search.getWeather(location.lat, location.lon, location.name);
  }

  currentPosition() {
    this.logger.log('current pos pressed');
    if (navigator.geolocation) {
      // Sending in callback to locationCallback method.
      navigator.geolocation.getCurrentPosition(data => {
        this.locationService.getCity(
          data.coords.latitude,
          data.coords.longitude,
          this.locationCallback,
          this
        );
      });
    }
  }

  isFieldEmpty(): boolean {
    const empty = this.input == null;
    if (empty) {
      this.logger.log('Nothing entered in search field');
    }
    return empty;
  }

}
