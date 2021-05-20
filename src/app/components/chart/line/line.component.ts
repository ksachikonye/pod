import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { AccessorType } from '../../../crossfilter/utils/types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appLine]',
  template: `
    <svg:path
      [ngClass]="type"
      [attr.d]="lineString"
      [style.fill]="fill">
    </svg:path>
  `,
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnChanges {
  @Input() type: 'area' | 'line' = 'line';
  @Input() data: object[];
  @Input() xAccessor: AccessorType;
  @Input() yAccessor: AccessorType;
  @Input() y0Accessor?: AccessorType;
  // tslint:disable-next-line:ban-types
  @Input() interpolation?: Function = d3.curveLinear;
  @Input() fill?: '#87CEFA';
  public lineString = '';

  updateLineString(): void {
    const lineGenerator = (d3[this.type] as any)()
    .x(this.xAccessor)
    .y(this.yAccessor)
    .curve(this.interpolation);

    if (this.type === 'area') {
      lineGenerator
        .y0(this.y0Accessor)
        .y1(this.yAccessor);
    }

    this.lineString = lineGenerator(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateLineString();
  }

}
