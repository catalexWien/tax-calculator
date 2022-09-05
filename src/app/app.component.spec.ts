import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '@shared/modules/material.module';

import { AppCoreLayoutComponent } from '@core/layout/layout.component';
import { AppFeaturesCalculatorComponent } from '@features/calculator/calculator.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AppCoreLayoutComponent,
        AppFeaturesCalculatorComponent
      ],
      imports: [
        FormsModule,
        AppMaterialModule
      ]
    }).compileComponents();
  });

  it('should create the App Component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
