import { Injectable } from '@angular/core';
import { Location } from './location';
import { SearchComponent } from '../search/search.component';
import { } from 'googlemaps';

@Injectable()
export class LocationService {
  private location: Location;

  constructor() { }

  // How to solve circular dependy here? TODO:
  getPlace(place: string, callback: Function, search: any) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { 'address': place },
      (results, status) => {
        this.processResult(results, status);
        if (!this.location) {
          // returning dummy object if location was not found.
          // want to keep the place string
          this.location = new Location(place, 0, 0);
        }
        callback(this.location, search);
      });
  }

  private processResult(results, status) {
    if (status.toString() === 'OK') {
      console.log('result was gathered');
      console.log(results);
      this.location = new Location(
        results[0].address_components[0].long_name,
        results[0].geometry.location.lat(),
        results[0].geometry.location.lng());
    } else {
      console.log('something must have gone wrong in google collecting');
      // do nothing with location, getPlace method is.
    }
  }
}
