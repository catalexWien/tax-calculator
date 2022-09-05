import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AppFeaturesSharedCalculatorService } from './calculator.service';

const INIT_FORM_VARS = {
  vatRate: 13,
  priceWithoutVat: 123,
  vat: 123,
  priceWithVat: 123
}

describe('AppFeaturesSharedCalculatorService', () => {
  const vatFactor = INIT_FORM_VARS.vatRate / 100;
  let service: AppFeaturesSharedCalculatorService;
  var isChange, priceWithoutVat, vat, priceWithVat;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AppFeaturesSharedCalculatorService ]
    });
    service = TestBed.inject(AppFeaturesSharedCalculatorService);
  });

  it('should create AppFeaturesSharedCalculatorService', () => {
    expect(service).toBeTruthy();
  });
  
  it('should call calculateValues() method', fakeAsync(() => {
    spyOn(service, 'calculateValues').and.callThrough();

    service.calculateValues('vat', INIT_FORM_VARS);
    tick();

    expect(service.calculateValues).toHaveBeenCalledWith('vat', INIT_FORM_VARS);
  }));

  /* switch case 'vatRate' */

  it('should calculate "VAT" and "Price with VAT" on "VAT rate" change', () => {
    const serviceCalculator = service.calculateValues('vatRate', INIT_FORM_VARS);
    serviceCalculator.vat = INIT_FORM_VARS.priceWithoutVat * vatFactor;
    serviceCalculator.priceWithVat = INIT_FORM_VARS.priceWithoutVat + serviceCalculator.vat;

    expect(serviceCalculator.vat).toEqual(15.99);
    expect(serviceCalculator.priceWithVat).toEqual(138.99);
  });

  /* switch case 'priceWithoutVat' */

  it('should calculate "VAT" and "Price with VAT" on "Price without VAT" change', () => {
    const serviceCalculator = service.calculateValues('priceWithoutVat', INIT_FORM_VARS);
    serviceCalculator.vat = INIT_FORM_VARS.priceWithoutVat * vatFactor;
    serviceCalculator.priceWithVat = INIT_FORM_VARS.priceWithoutVat + serviceCalculator.vat;

    expect(serviceCalculator.vat).toEqual(15.99);
    expect(serviceCalculator.priceWithVat).toEqual(138.99);
  });

  /* switch case 'priceWithoutVat' */

  it('should calculate "VAT" and "Price without VAT" on "Price with VAT" change', () => {
    const serviceCalculator = service.calculateValues('priceWithVat', INIT_FORM_VARS);
    serviceCalculator.priceWithoutVat = serviceCalculator.priceWithVat / (1 + vatFactor);
    serviceCalculator.vat = serviceCalculator.priceWithoutVat * vatFactor;

    expect(Number(serviceCalculator.vat.toFixed(2))).toEqual(14.15);
    expect(serviceCalculator.priceWithVat).toEqual(123);
  });

  /* switch case default */

  it('should test default case of switch', () => {
    const serviceCalculator = service.calculateValues('test', INIT_FORM_VARS);

    expect(serviceCalculator).toEqual(INIT_FORM_VARS);
  });
});
