import { Component, OnInit } from '@angular/core';
import {AccessorType} from '../shared/types';
import {FitbitdataService} from '../services/fitbitdata.service';

@Component({
  selector: 'app-fitbit',
  templateUrl: './fitbit.component.html',
  styleUrls: ['./fitbit.component.css']
})
export class FitbitComponent implements OnInit {
   heartrateData: Array<heartrateDataPoint>;
  parseDate: (value: string) => object;
  dateAccessor: AccessorType;
  fitbitSubscription;

  constructor(private fitbitservice: FitbitdataService) {
    this.heartrateData = [];
    this.dateAccessor = d => this.parseDate(d.dateTime);
  }


  ngOnInit(): void {
    this.getData();
  }

  public async getData(): Promise<void>{
    this.fitbitSubscription = this.fitbitservice
      .getFitbitData()
      .subscribe(data => {
        this.heartrateData = data;
      });
  }

}

// tslint:disable-next-line:no-empty-interface class-name
interface heartrateDataPoint{
  elevation: number;
  floors: number;
  steps: number;
  marginalCalories: number;
}
