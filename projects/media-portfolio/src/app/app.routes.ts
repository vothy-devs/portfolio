import { Routes } from '@angular/router';
import { PortfolioGridComponent } from './components/portfolio-grid/portfolio-grid';

export const routes: Routes = [
  { path: '', component: PortfolioGridComponent },
  { path: '**', redirectTo: '' }
];