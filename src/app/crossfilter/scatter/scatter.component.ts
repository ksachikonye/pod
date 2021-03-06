import {Component, Input, ViewChild, ElementRef, AfterContentInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import * as d3 from 'd3';
import { DimensionsType, ScaleType, AccessorType } from '../utils/types';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements AfterContentInit, OnChanges {

  constructor() {
    this.dimensions = {
      marginTop: 40,
      marginRight: 30,
      marginBottom: 75,
      marginLeft: 75,
      height: 800,
      width: 800,
    };
    this.dimensions = {
      ...this.dimensions,
      boundedHeight: Math.max(this.dimensions.height - this.dimensions.marginTop - this.dimensions.marginBottom, 0),
      boundedWidth: Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0),
    };
  }
  @Input() data: Array<object>;
  @Input() xLabel: string;
  @Input() yLabel: string;
  @Input() xAccessor: AccessorType;
  @Input() yAccessor: AccessorType;
  @Input() colorAccessor: AccessorType;
  @Output() interact = new EventEmitter<{ type: 'select' | 'on' | 'out', circle: any }>();
  public dimensions: DimensionsType;
  public xScale: any;
  public yScale: any;
  public xAccessorScaled: AccessorType;
  public yAccessorScaled: AccessorType;
  @ViewChild('container', {static: true}) container: ElementRef;
  public keyAccessor: AccessorType = i => i;

  ngAfterContentInit() {
    this.dimensions.width = this.container.nativeElement.offsetWidth;
    this.dimensions.boundedWidth = Math.max(
      this.dimensions.width
        - this.dimensions.marginLeft
        - this.dimensions.marginRight,
      0
    );
    this.updateScales();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateScales();
  }

  updateScales() {
    this.xScale = d3.scaleLinear()
      .domain(d3.extent(this.data, this.xAccessor))
      .range([0, this.dimensions.boundedWidth])
      .nice();

    this.yScale = d3.scaleLinear()
      .domain(d3.extent(this.data, this.yAccessor))
      .range([this.dimensions.boundedHeight, 0])
      .nice();

    this.xAccessorScaled = d => this.xScale(this.xAccessor(d));
    this.yAccessorScaled = d => this.yScale(this.yAccessor(d));
  }
}
