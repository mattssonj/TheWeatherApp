import { Weather } from './weather';
import { Wind } from './wind';
import { Main } from './main';

export interface Forecast {
    name: string; // only used with currentWeather
    weather: Weather[];
    wind: Wind;
    main: Main;
    dt_txt: string; // only used with five-forecast! showing date of forecast
}
