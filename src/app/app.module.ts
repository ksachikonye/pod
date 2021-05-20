import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrossfilterComponent } from './crossfilter/crossfilter.component';
import { ScatterComponent } from './crossfilter/scatter/scatter.component';
import { ChartComponent } from './components/chart/chart.component';
import { AxisComponent } from './components/chart/axis/axis.component';
import { LineComponent } from './components/chart/line/line.component';
import { CirclesComponent } from './components/chart/circles/circles.component';
import { BarsComponent } from './components/chart/bars/bars.component';
import { GradientComponent } from './components/chart/gradient/gradient.component';
import { HttpClientModule } from '@angular/common/http';
import {HistogramComponent} from './crossfilter/histogram/histogram.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './crossfilter/profile/profile.component';
import { OuraComponent } from './oura/oura.component';
import { FitbitComponent } from './fitbit/fitbit.component';
import { OuratimelineComponent } from './oura/ouratimeline/ouratimeline.component';
import { TimelineComponent } from './crossfilter/timeline/timeline.component';
// import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    CrossfilterComponent,
    HomeComponent,
    ScatterComponent,
    ChartComponent,
    AxisComponent,
    LineComponent,
    CirclesComponent,
    BarsComponent,
    GradientComponent,
    HistogramComponent,
    ProfileComponent,
    OuraComponent,
    FitbitComponent,
    OuratimelineComponent,
    TimelineComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
