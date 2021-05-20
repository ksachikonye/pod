import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterContentInit,
  OnChanges,
  SimpleChanges,
  HostListener,
  Output, EventEmitter
} from '@angular/core';
import * as d3 from 'd3';
import { DimensionsType, AccessorType } from '../utils/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements AfterContentInit, OnChanges {
  @Input() data: Array<object>;
  @Input() label: string;
  @Input() xAccessor: AccessorType;
  @Input() yAccessor: AccessorType;
  @Input() xsAccessor: AccessorType;
  @Input() ysAccessor: AccessorType;
  @Input() colorAccessor: AccessorType;
  @Output() interact = new EventEmitter<{ type: 'select' | 'on' | 'out', circle: any }>();
  public dimensions: DimensionsType;
  public xScale: any;
  public yScale: any;
  public xAccessorScaled: AccessorType;
  public yAccessorScaled: AccessorType;
  public y0AccessorScaled: AccessorType;
  public x2Scale: any;
  public y2Scale: any;
  public xsAccessorScaled: AccessorType;
  public ysAccessorScaled: AccessorType;
  @ViewChild('container', {static: true}) container: ElementRef;
  public keyAccessor: AccessorType = i => i;


  constructor() {
    this.dimensions = {
      marginTop: 40,
      marginRight: 30,
      marginBottom: 75,
      marginLeft: 75,
      height: 300,
      width: 600,
    };
    this.dimensions = {
      ...this.dimensions,
      boundedHeight: Math.max(this.dimensions.height
        - this.dimensions.marginTop
        - this.dimensions.marginBottom, 0),
      boundedWidth: Math.max(this.dimensions.width
        - this.dimensions.marginLeft
        - this.dimensions.marginRight, 0),
    };
  }


  // tslint:disable-next-line:typedef
  @HostListener('window:resize') windowResize() {
    this.updateDimensions();
  }

  // tslint:disable-next-line:typedef
  updateDimensions() {
    const width = this.container.nativeElement.offsetWidth;
    this.dimensions.width = width;
    this.dimensions.boundedWidth = Math.max(
      this.dimensions.width
      - this.dimensions.marginLeft
      - this.dimensions.marginRight,
      0
    );
    this.updateScales();
  }

  // tslint:disable-next-line:typedef
  ngAfterContentInit() {
    this.updateDimensions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateScales();
  }

  // tslint:disable-next-line:typedef
  updateScales() {
    this.xScale = d3.scaleLinear()
      .domain(d3.extent(this.data, this.xAccessor))
      .range([0, this.dimensions.boundedWidth]);

    this.yScale = d3.scaleLinear()
      .domain(d3.extent(this.data, this.yAccessor))
      .range([this.dimensions.boundedHeight, 0]);

    this.x2Scale = d3.scaleLinear()
      .domain(d3.extent(this.data, this.xsAccessor))
      .range([0, this.dimensions.boundedWidth]);

    this.y2Scale = d3.scaleLinear()
      .domain(d3.extent(this.data, this.ysAccessor))
      .range([this.dimensions.boundedHeight, 0]);

    this.xAccessorScaled = d => this.xScale(this.xAccessor(d));
    this.yAccessorScaled = d => this.yScale(this.yAccessor(d));
    this.y0AccessorScaled = this.yScale(this.yScale.domain()[0]);
    this.xsAccessorScaled = d => this.x2Scale(this.xsAccessor(d));
    this.ysAccessorScaled = d => this.y2Scale(this.ysAccessor(d));
  }

}

