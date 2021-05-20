import {Component, Input, Output, EventEmitter} from '@angular/core';
import {AccessorType} from '../../../crossfilter/utils/types';

@Component({
  selector: '[appCircles]',
  template: `
    <svg:circle
      *ngFor="let circle of data; trackBy: keyAccessor"
      [attr.cx]="xAccessor(circle)"
      [attr.cy]="yAccessor(circle)"
      [attr.r]="radius"
      [attr.fill]="colorAccessor(circle)"
      (click)="select(circle)"
      (mouseover)="on(circle)"
      (mouseout)="out(circle)">
    </svg:circle>
  `,
  styleUrls: ['./circles.component.css']
})
export class CirclesComponent {
  @Input() data: object[];
  @Input() keyAccessor: AccessorType;
  @Input() xAccessor: AccessorType;
  @Input() yAccessor: AccessorType;
  @Input() colorAccessor: AccessorType;
  @Input() radius?: number = 3;
  @Output() interact = new EventEmitter<{ type: 'select' | 'on' | 'out', circle: any }>();

  public select(circle: any) {
    this.interact.emit({type: 'select', circle});
  }

  public on(circle: any) {
    this.interact.emit({type: 'on', circle});
  }

  public out(circle: any) {
    this.interact.emit({type: 'out', circle});
  }
}
