import {Component, ElementRef, HostListener, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AccessorType, DimensionsType, ScaleType} from '../../shared/types';
import {getUniqueId} from '../../components/chart/utils';
import * as d3 from 'd3';

@Component({
  selector: 'app-ouratimeline',
  templateUrl: './ouratimeline.component.html',
  styleUrls: ['./ouratimeline.component.css']
})
export class OuratimelineComponent implements OnInit {

  @Input() data: Array<object>;
  @Input() label: string;
  @Input() xAccessor: AccessorType;
  @Input() yAccessor: AccessorType;
  public dimensions: DimensionsType;
  public xScale: ScaleType;
  public yScale: ScaleType;
  public xAccessorScaled: AccessorType;
  public yAccessorScaled: AccessorType;
  public y0AccessorScaled: AccessorType;
  public formatDate: (date: object) => string = d3.timeFormat('%-b %-d');
  @ViewChild('container', {static: true}) container: ElementRef;

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

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngAfterContentInit() {
    this.updateDimensions();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    this.updateScales();
  }

  // tslint:disable-next-line:typedef
  updateScales() {
    // @ts-ignore
    this.xScale = d3.scaleTime()
      .domain(d3.extent(this.data, this.xAccessor))
      .range([0, this.dimensions.boundedWidth]);

    // @ts-ignore
    this.yScale = d3.scaleLinear()
      .domain(d3.extent(this.data, this.yAccessor))
      .range([this.dimensions.boundedHeight, 0])
      .nice();

    this.xAccessorScaled = d => this.xScale(this.xAccessor(d));
    this.yAccessorScaled = d => this.yScale(this.yAccessor(d));
    this.y0AccessorScaled = this.yScale(this.yScale.domain()[0]);
  }

  ngOnInit(): void {
  }


}
