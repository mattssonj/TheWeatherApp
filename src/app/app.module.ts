import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientJsonpModule, HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

// This is to import bootstrap to Angular
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// This is to import font-awesome
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// This is to import Google autocomplete
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';

// Services
import { WeatherService } from './weather/weather.service';
import { LocationService } from './location/location.service';
import { PrinterService } from './printer.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleAutocomplete_key,
      libraries: ['places']
    })
  ],
  providers: [
    WeatherService,
    LocationService,
    PrinterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
