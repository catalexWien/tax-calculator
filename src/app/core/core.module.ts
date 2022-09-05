import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppMaterialModule } from '@shared/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppCoreLayoutComponent } from '@core/layout/layout.component';
import { AppFeaturesCalculatorComponent } from '@features/calculator/calculator.component';

@NgModule({
  bootstrap: [AppCoreLayoutComponent],
  declarations: [
    AppCoreLayoutComponent,
    AppFeaturesCalculatorComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [AppCoreLayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppCoreModule { }
