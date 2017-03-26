import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MorphologicalChartComponent } from './shared/morphological-chart/morphological-chart.component';
import { EmptyComponent } from './shared/empty/empty.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full'
  },
  {
    path: 'empty',
    component: EmptyComponent
  },
  {
    path: 'morphological-chart',
    component: MorphologicalChartComponent,
    pathMatch: 'full'
  }
];

export const appRoutes =
  RouterModule.forRoot(routes);
