import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

const fitbitURL = environment.fitbitURL;
const fitbitKey = environment.fitbitKey;
const fitbitid = environment.fitbituserid;

@Injectable({
  providedIn: 'root'
})
export class FitbitdataService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getFitbitData(){
    return this.http.get<any>(`${fitbitURL}/${fitbitid}/activities/date/today/30d.json`).pipe(
      tap(value => {
        console.log(value);
      })
    );

  }
}
