import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CrossfilterComponent} from './crossfilter/crossfilter.component';
import {OuraComponent} from './oura/oura.component';

const routes: Routes = [
  {
    path: 'crossfilter',
    component: CrossfilterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    component: OuraComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
