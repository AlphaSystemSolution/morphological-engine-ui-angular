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
import { DetailConjugationComponent } from './components/detail-conjugation/detail-conjugation.component';
import { DetailRowRendererComponent } from './components/detail-conjugation/detail-row-renderer/detail-row-renderer.component';
import { DetailedConjugationGroupComponent } from './components/detail-conjugation/detailed-conjugation-group/detailed-conjugation-group.component';

@NgModule({
  declarations: [
    AppComponent,
    MorphologicalChartComponent,
    StagingComponent,
    DetailConjugationComponent,
    DetailRowRendererComponent,
    DetailedConjugationGroupComponent
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
  exports: [MorphologicalChartComponent, StagingComponent, DetailConjugationComponent, DetailRowRendererComponent, DetailedConjugationGroupComponent]
})
export class AppModule { }
