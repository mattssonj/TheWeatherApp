import { Forecast } from './forecast';

export interface FiveForecast {
    list: Forecast[];
    city: { name: string; };
}
