import {Component, OnInit, ViewChild} from '@angular/core';
import {AccessorType} from '../shared/types';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crossfilter',
  templateUrl: './crossfilter.component.html',
  styleUrls: ['./crossfilter.component.scss'],
})
export class CrossfilterComponent implements OnInit {
  public axis1 = 'Mass';
  public axis2 = 'Intensity';

  public adduct = '';
  public lipidClass = '';
  public lipidSpecies = '';
  // tslint:disable-next-line:variable-name
  public raw_id = '';

  public massFilter = 300.0;
  public intn = 1000000.000;
  public intensityFilter = 10000000.00;
  public errorThreshold = 0.0;

  public info?: any;

  scatterData: Array<scatterDataPoint> = [];
  peakData: Array<peakDataPoint> = [];
  peakData2: Array<peakDataPoint> = [];
  peakData3: Array<peakDataPoint> = [];
  peakData4: Array<peakDataPoint> = [];
  peakData5: Array<peakDataPoint> = [];
  peakData6: Array<peakDataPoint> = [];
  peakData7: Array<peakDataPoint> = [];
  peakData8: Array<peakDataPoint> = [];
  peakData9: Array<peakDataPoint> = [];
  peakData10: Array<peakDataPoint> = [];
  centroidData: Array<peakDataPoint> = [];

  chromData: Array<chromDataPoint> = [];
  peakframeData: Array<peakframeDataPoint> = [];
  lipidClasses: Array<string> = [];
  lipidspecies: Array<string> = [];
  lipidadducts: Array<string> = [];

  @ViewChild('lipidClasses', {static: true}) lipidClassesAC: NgbTypeahead;
  focusLipidClasses$ = new Subject<string>();
  clickLipidClasses$ = new Subject<string>();

  @ViewChild('lipidspecies', {static: true}) lipidspeciesAC: NgbTypeahead;
  focusLipidspecies$ = new Subject<string>();
  clickLipidspecies$ = new Subject<string>();

  @ViewChild('lipidadducts', {static: true}) lipidadductsAC: NgbTypeahead;
  focusLipidadducts$ = new Subject<string>();
  clickLipidadducts$ = new Subject<string>();

  xAccessor: AccessorType;
  yAccessor: AccessorType;
  zAccessor: AccessorType;
  intAccessor: AccessorType;

  colors = {
    DAG: 'red',
    CE: 'blue',
    PS: '#dced8c',
    LPA: 'yellow',
    LPC: '#b6d7a8',
    LPI: 'lime',
    CL: 'indigo',
    PI: '#b215da',
    PC: '#93c47d',
    PE: '#3c78d8',
    'PE O-': 'blue-gery',
    'LPE O-': 'orange',
    'LPC O-': 'brown',
  };

  token?: string;

  public refreshInProgress = false;
  public analysisInProgress = false;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((value => {
      this.token = value.token;
    }));
  }

  public ngOnInit(): void {
    this.xAccessor = d => d[this.axis1];
    this.yAccessor = d => d[this.axis2];
    this.zAccessor = d => this.colors[d.LipidClass] ? this.colors[d.LipidClass] : 'black';
    this.intAccessor = d => d[this.axis2];
    this.change();
  }

  public getAccessor(axis: string): AccessorType {
    return d => d[axis];
  }

  public async change(): Promise<void> {
    this.refreshInProgress = true;
    // tslint:disable-next-line:max-line-length
    this.http.get<any>(`${environment.endpoint}/results?token=${this.token}&massFilter=${this.massFilter}&intensityFilter=${this.intensityFilter}&errorThreshold=${this.errorThreshold}&lipidClass=${encodeURIComponent(this.lipidClass)}&lipidSpecies=${encodeURIComponent(this.lipidSpecies)}&adduct=${encodeURIComponent(this.adduct)}&raw_id=${encodeURIComponent(this.raw_id)}`)
      .subscribe((data: any) => {
        this.scatterData = data.results;
        this.lipidClasses = data.autocomplete.lipid_classes;
        this.lipidspecies = data.autocomplete.lipid_species_groups;
        this.lipidadducts = data.autocomplete.adduct_groups;
        this.refreshInProgress = false;
      });
  }

  public async analyze(): Promise<void> {
    this.analysisInProgress = true;
    // tslint:disable-next-line:max-line-length
    this.http.get<any>(`${environment.endpoint}/analysis?token=${this.token}&lipidClass=${encodeURIComponent(this.lipidClass)}&lipidSpecies=${encodeURIComponent(this.lipidSpecies)}&adduct=${encodeURIComponent(this.adduct)}`)
      .subscribe((data: any) => {
        this.peakData = data.peak1;
        this.peakData2 = data.peak2;
        this.peakData3 = data.peak3;
        this.peakData4 = data.peak4;
        this.peakData5 = data.peak5;
        this.peakData6 = data.peak6;
        this.peakData7 = data.peak7;
        this.peakData8 = data.peak8;
        this.peakData9 = data.peak9;
        this.peakData10 = data.peak10;
        this.chromData = data.chrom;
        this.peakframeData = data.frmr;
        this.analysisInProgress = false;
      });
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

  public searchLipidClasses: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickLipidClasses$.pipe(filter(() => !this.lipidClassesAC.isPopupOpen()));
    const inputFocus$ = this.focusLipidClasses$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term: string) => (term === '' ? this.lipidClasses
        : this.lipidClasses.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  public searchLipidspecies: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickLipidspecies$.pipe(filter(() => !this.lipidspeciesAC.isPopupOpen()));
    const inputFocus$ = this.focusLipidspecies$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term: string) => (term === '' ? this.lipidspecies
        : this.lipidspecies.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  public searchLipidadducts: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickLipidadducts$.pipe(filter(() => !this.lipidadductsAC.isPopupOpen()));
    const inputFocus$ = this.focusLipidadducts$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term: string) => (term === '' ? this.lipidadducts
        : this.lipidadducts.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

}

// tslint:disable-next-line:class-name
interface scatterDataPoint {
  x: number;
  y: number;
}

// tslint:disable-next-line:class-name
interface peakDataPoint {
  x: number;
  y: number;
}

// tslint:disable-next-line:class-name
interface chromDataPoint {
  x: number;
  y: number;
}

// tslint:disable-next-line:class-name
interface peakframeDataPoint{
  x: number;
  y: number;

}


