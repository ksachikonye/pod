import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

const ouraURL = environment.ouraURL;
const ouraKey = environment.ouraKey;

@Injectable({
  providedIn: 'root'
})
export class OuradataService {

  constructor(private http: HttpClient) {
  }

  async getOuraData(parameter): Promise<SleepDataPoint[]> {
    return (await this.http.get<{ sleep: SleepDataPoint[] }>(`${ouraURL}/${parameter}?start=2021-01-01&end=2021-04-01&access_token=${ouraKey}`)
      .toPromise()).sleep;
  }
}

// tslint:disable-next-line:class-name
export interface SleepDataPoint {
  summary_date: string;
  duration: number;
  total: number;
  awake: number;
  rem: number;
  light: number;
  deep: number;
  hr_average: number;
  efficiency: number;
  restless: number;
  temperature_delta: number;
  breath_average: number;
  restfulness: string;
}
