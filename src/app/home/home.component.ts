import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AccessorType} from '../shared/types';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public yaxis = '';
  public xaxis = 'Time';
  fileToUpload?: any;
  token?: string;
  status?: string;
  profileData: Array<profileDataPoint> = [];
  xAccessor: AccessorType;
  yAccessor: AccessorType;


  colors = [ 'black'];

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((value => {
      this.token = value.token;
    }));
  }

  ngOnInit(): void {
    this.xAccessor = d => d[this.xaxis];
    this.yAccessor = d => d[this.yaxis];
  }

  public getAccessor(axis: string): AccessorType {
    return d => d[axis];
  }

}


// tslint:disable-next-line:class-name
interface profileDataPoint {
  x: number;
  y: number;
}
