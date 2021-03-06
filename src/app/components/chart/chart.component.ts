import { Component, Input } from '@angular/core';
import { DimensionsType } from '../../crossfilter/utils/types';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @Input() dimensions: DimensionsType;
}
