import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  ButtonModule,
  ConfirmDialogModule,
  ConfirmationService,
  DataTableModule,
  DialogModule,
  InputSwitchModule,
  SplitButtonModule,
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
import { VerbConjugationComponent } from './components/detail-conjugation/verb-conjugation/verb-conjugation.component';

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
    ToolbarComponent,
    VerbConjugationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ButtonModule,
    ConfirmDialogModule,
    DataTableModule,
    DialogModule,
    InputSwitchModule,
    SplitButtonModule,
    ToolbarModule,
    SharedModule,
    appRoutes
  ],
  providers: [ApplicationControllerService, ConfirmationService],
  bootstrap: [AppComponent],
  exports: [
    MorphologicalChartComponent,
    MorphologicalInputFormComponent,
    StagingComponent,
    DetailConjugationComponent,
    AbbreviatedConjugationComponent,
    HomeComponent,
    ExportConjugationComponent,
    ToolbarComponent,
    VerbConjugationComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
