import { Routes } from '@angular/router';
import DashboardComponent from './components/dashboard/dashboard.component';


export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'heroes', loadChildren: () => import('./components/heroes/hero.routes') },
    { path: '**', redirectTo: 'dashboard'}
  ];