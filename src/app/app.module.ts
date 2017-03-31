import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  ButtonModule,
  DataTableModule,
  ToolbarModule
} from 'primeng/primeng';
import { ApplicationControllerService } from './application-controller.service';
import { SharedModule } from './shared/shared.module';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { MorphologicalChartComponent } from './components/morphological-chart/morphological-chart.component';
import { MorphologicalInputFormComponent } from './components/morphological-input-form/morphological-input-form.component';
import { StagingComponent } from './components/staging/staging.component';
import { DetailConjugationComponent } from './components/detail-conjugation/detail-conjugation.component';
import { AbbreviatedConjugationComponent } from './components/abbreviated-conjugation/abbreviated-conjugation.component';
import { HomeComponent } from './components/home/home.component';
import { ExportConjugationComponent } from './components/export-conjugation/export-conjugation.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    MorphologicalChartComponent,
    MorphologicalInputFormComponent,
    StagingComponent,
    DetailConjugationComponent,
    AbbreviatedConjugationComponent,
    HomeComponent,
    ExportConjugationComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ButtonModule,
    DataTableModule,
    ToolbarModule,
    SharedModule,
    appRoutes
  ],
  providers: [ApplicationControllerService],
  bootstrap: [AppComponent],
  exports: [
    MorphologicalChartComponent,
    MorphologicalInputFormComponent,
    StagingComponent,
    DetailConjugationComponent,
    AbbreviatedConjugationComponent,
    HomeComponent,
    ExportConjugationComponent,
    ToolbarComponent
  ]
})
export class AppModule { }
