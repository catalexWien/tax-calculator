import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatCardHarness } from '@angular/material/card/testing';
import { AppMaterialModule } from '@shared/modules/material.module';

import { AppFeaturesCalculatorComponent } from './calculator.component';
import { AppFeaturesSharedCalculatorService } from '@features/shared/services/calculator.service';

const INIT_FORM_VARS = {
  vatRate: 13,
  priceWithoutVat: 0,
  vat: 123,
  priceWithVat: 0
}

const INIT_ERRORS_VALUES = {
  noVatRateError: true,
  noNumberError: false,
  zeroNumberError: true
}

describe('AppFeaturesCalculatorComponent', () => {
  let component: AppFeaturesCalculatorComponent;
  let fixture: ComponentFixture<AppFeaturesCalculatorComponent>;
  let calculatorServiceSpy: jasmine.SpyObj<AppFeaturesSharedCalculatorService>;
  let loader: HarnessLoader;
  let errorsValues = INIT_ERRORS_VALUES;

  beforeEach(async () => {
    calculatorServiceSpy = jasmine.createSpyObj('AppFeaturesSharedCalculatorService', ['calculateValues']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AppMaterialModule
      ],
      declarations: [ AppFeaturesCalculatorComponent ],
      providers: [
        { provide: AppFeaturesSharedCalculatorService, useValue: calculatorServiceSpy}
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AppFeaturesCalculatorComponent);
      component = fixture.componentInstance;
      loader = TestbedHarnessEnvironment.loader(fixture);
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFeaturesCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AppFeaturesCalculatorComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should show verify if the price without VAT input was touched but left empty', () => {
    let priceWithoutVatValidationError: DebugElement;

    fixture.detectChanges();
    priceWithoutVatValidationError = fixture.debugElement.nativeElement.querySelector('#priceWithoutVat');

    expect(priceWithoutVatValidationError).not.toBeTruthy();
  });

  it('should call onInputChange() method on input "priceWithoutVat" change', fakeAsync(()=>{
    let spyOnInputChange = spyOn(component,'onInputChange').and.callThrough();
    let inputElement = fixture.debugElement.nativeElement.querySelector('input');
    inputElement.value ="123";
    component.onInputChange('priceWithoutVat');
    fixture.detectChanges();
    tick();

    expect(spyOnInputChange).toHaveBeenCalledOnceWith('priceWithoutVat');
  }));

  it('should call onInputChange() method on input "vat" change', fakeAsync(()=>{
    let spyOnInputChange = spyOn(component,'onInputChange').and.callThrough();
    let inputElement = fixture.debugElement.nativeElement.querySelector('input');
    inputElement.value ="123";
    component.onInputChange('vat');
    fixture.detectChanges();
    tick();

    expect(spyOnInputChange).toHaveBeenCalledOnceWith('vat');
  }));

  it('should call onInputChange() method on input "priceWithVat" change', fakeAsync(()=>{
    let spyOnInputChange = spyOn(component,'onInputChange').and.callThrough();
    let inputElement = fixture.debugElement.nativeElement.querySelector('input');
    inputElement.value ="123";
    component.onInputChange('priceWithVat');
    fixture.detectChanges();
    tick();

    expect(spyOnInputChange).toHaveBeenCalledOnceWith('priceWithVat');
  }));

  it('should call calculateValues() method from AppFeaturesSharedCalculatorService', fakeAsync(()=>{
    spyOn(component,'onInputChange').and.callThrough();
    let inputElement = fixture.debugElement.nativeElement.querySelector('input');
    inputElement.value ="123";
    component.noNumberError = false;
    component.onInputChange('vat');
    calculatorServiceSpy.calculateValues('vat', INIT_FORM_VARS)
    fixture.detectChanges();
    tick();

    expect(calculatorServiceSpy.calculateValues).toHaveBeenCalledWith('vat', INIT_FORM_VARS);
  }));
  
  it('should set noVatRateError to true', () => {
    component.formInputs.vatRate = 0;
    component.onInputChange('vat');

    expect(component.noVatRateError).not.toBeFalsy();
  });
  
  it('should set noVatRateError to false', () => {
    component.formInputs.vatRate = 2;
    component.onInputChange('vat');

    expect(component.noVatRateError).toBeFalsy();
  });
  
  it('should set noNumberError to false', () => {
    component.formInputs.vat = Number('test');
    component.onInputChange('vat');

    expect(component.noNumberError).not.toBeFalsy();
  });
  
  it('should set zeroNumberError to true', () => {
    component.formInputs.vat = 0;
    component.onInputChange('vat');

    expect(component.zeroNumberError).not.toBeFalsy();
  });
  
  it('should set zeroNumberError to false', fakeAsync(() => {
    component.formInputs.vat = 10;
    component.onInputChange('vat');

    expect(component.zeroNumberError).toBeFalsy();
  }));

  /* the "Reset" button */

  it('should load the "Reset" button harnesse', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(1);
  });

  it('should load the "Reset" button with exact text', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness.with({text: 'Reset'}));
    expect(buttons.length).toBe(1);
    expect(await buttons[0].getText()).toBe('Reset');
  });

  it('should disable the "Reset" button', fakeAsync(() => {
    component.noVatRateError = true;
    spyOn(component,'onInputChange').and.callThrough();
    let buttonElement = fixture.debugElement.nativeElement.querySelector('button');
    fixture.detectChanges();
    tick();
    expect(buttonElement.disabled).toBeTruthy();
  }));
 
  it('should enable the "Reset" button', () => {
    component.noVatRateError = false;
    let buttonElement = fixture.debugElement.nativeElement.querySelector('button');
    fixture.detectChanges();
    expect(buttonElement.disabled).toBeFalsy();
  });
  
  it('should call onResetForm() when user click on button', fakeAsync(() => {
    spyOn(component, 'onResetForm').and.callThrough();
    let buttonElement = fixture.debugElement.nativeElement.querySelector('button');

    buttonElement.click();
    component.onResetForm();
    tick();
    expect(component.onResetForm).toHaveBeenCalled();
  }));

  /* Mat-card */

  it('should find card with text', async () => {
    const cards = await loader.getAllHarnesses(MatCardHarness.with({text: /Austria/}));
    expect(cards.length).toBe(1);
    expect(await cards[0].getSubtitleText()).toBe('Austria');
  });

  it('should act as a harness loader for user content', async () => {
    const card = await loader.getHarness(MatCardHarness.with({subtitle: 'Austria'}));
    const footerSubcomponents = (await card.getAllHarnesses(MatButtonHarness)) ?? [];
    expect(footerSubcomponents.length).toBe(1);
  });
});
