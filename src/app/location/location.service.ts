import { Injectable } from '@angular/core';
import { Location } from './location';
import { SearchComponent } from '../search/search.component';
import { } from 'googlemaps';
import { PrinterService } from '../printer.service';

@Injectable()
export class LocationService {
  private location: Location;

  constructor(private logger: PrinterService) { }

  // How to solve circular dependy here? TODO:
  getPosition(place: string, callback: Function, search: any) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { 'address': place },
      (results, status) => {
        if (status.toString() === 'OK') {
          this.logger.log('result was gathered');
          this.logger.log(results);
          this.location = new Location(
            results[0].address_components[0].long_name,
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng());
        } else {
          this.logger.log('something must have gone wrong in google collecting');
          this.location = new Location(place, 0, 0);
        }
        callback(this.location, search);
      });
  }

  getCity(lat: number, lon: number, callback: Function, search: any) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { 'location': { lat: lat, lng: lon } },
      (results, status) => {
        // Processing result
        if (status.toString() === 'OK') {
          this.logger.log('data was gathered');
          this.logger.log(results);
          this.location = new Location(
            results[0].formatted_address,
            lat,
            lon
          );
        } else {
          this.logger.log('something must have gone wrong while geocoding');
          this.location = new Location(null, 0, 0);
        }
        callback(this.location, search);
      });
  }
}
