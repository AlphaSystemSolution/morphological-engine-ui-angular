import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MorphologicalChartComponent } from './components/morphological-chart/morphological-chart.component';
import { StagingComponent } from './components/staging/staging.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'staging',
    component: StagingComponent
  },
  {
    path: 'morphological-chart',
    component: MorphologicalChartComponent,
    pathMatch: 'full'
  }
];

export const appRoutes =
  RouterModule.forRoot(routes);
