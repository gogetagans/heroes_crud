
import { Routes } from '@angular/router';
import HeroListComponent  from './hero-list/hero-list.component';
import HeroDetailComponent from './hero-detail/hero-detail.component';

export default [
  { path: '', component: HeroListComponent },
  { path: ':id', component: HeroDetailComponent },
  { path: 'heroes/new', component: HeroDetailComponent, fullpath: true},
] as Routes;