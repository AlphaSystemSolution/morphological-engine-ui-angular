import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ApplicationControllerService } from './application-controller.service';
import { SharedModule } from './shared/shared.module';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { MorphologicalChartComponent } from './components/morphological-chart/morphological-chart.component';
import { StagingComponent } from './components/staging/staging.component';

@NgModule({
  declarations: [
    AppComponent,
    MorphologicalChartComponent,
    StagingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule,
    appRoutes
  ],
  providers: [ApplicationControllerService],
  bootstrap: [AppComponent],
  exports: [MorphologicalChartComponent, StagingComponent]
})
export class AppModule { }
