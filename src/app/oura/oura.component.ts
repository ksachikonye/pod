import 'zone.js';
import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {AccessorType} from '../shared/types';
import {OuradataService, SleepDataPoint} from '../services/ouradata.service';

@Component({
  selector: 'app-oura',
  templateUrl: './oura.component.html',
  styleUrls: ['./oura.component.css']
})
export class OuraComponent implements OnInit {
  sleepData: Array<SleepDataPoint> = [];
  parseDate: (value: string) => object;
  dateAccessor: AccessorType;
  remAccessor: AccessorType;
  deepAccessor: AccessorType;
  lightAccessor: AccessorType;
  hrAverageAccessor: AccessorType;
  colorAccessor: AccessorType;
  parameter = 'sleep';
  public info?: any;

  colors = {
    Optimal: 'Green',

  };

  constructor(private ouraService: OuradataService) {
    this.dateAccessor = d => this.parseDate(d.summary_date);
    this.remAccessor = d => d.rem;
    this.deepAccessor = d => d.deep;
    this.hrAverageAccessor = d => d.hr_average;
    this.colorAccessor = d => d.restfulness;

  }

  ngOnInit(): void {
    this.parseDate = d3.timeParse('%m/%d/%Y');
    this.getData();
  }

  public async getData(): Promise<void> {
    this.sleepData = await this.ouraService.getOuraData(this.parameter);
  }

  public updateInfo(event: { type: 'select' | 'on' | 'out', circle: any }): void {
    if (event.type === 'select') {
      this.info = event.circle;
    } else if (event.type === 'on') {
      this.info = event.circle;
    } else if (event.type === 'out') {
      this.info = undefined;
    }
  }

}
