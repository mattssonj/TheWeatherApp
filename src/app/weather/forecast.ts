import { Weather } from './weather';
import { Wind } from './wind';
import { Main } from './main';

export interface Forecast {
    name: string;
    weather: Weather[];
    wind: Wind;
    main: Main;
}
