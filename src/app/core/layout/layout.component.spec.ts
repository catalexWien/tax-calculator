import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '@shared/modules/material.module';

import { AppCoreLayoutComponent } from './layout.component';
import { AppFeaturesCalculatorComponent } from '@features/calculator/calculator.component';

describe('AppCoreLayoutComponent', () => {
  let component: AppCoreLayoutComponent;
  let fixture: ComponentFixture<AppCoreLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppCoreLayoutComponent,
        AppFeaturesCalculatorComponent
      ],
      imports: [ FormsModule, AppMaterialModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCoreLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AppCoreLayoutComponent', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Tax calculator'`, () => {
    const fixture = TestBed.createComponent(AppCoreLayoutComponent);
    const appLayout = fixture.componentInstance;
    expect(appLayout.title).toEqual('Tax calculator');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppCoreLayoutComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.left-side h1')?.textContent).toContain('Tax calculator');
  });
});
