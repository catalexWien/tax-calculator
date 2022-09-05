import { Injectable } from '@angular/core';

import { Inputs } from '@features/shared/models/calculator.model';

@Injectable()
export class AppFeaturesSharedCalculatorService {
  constructor() { }

  calculateValues(isChange: string, formInputs: Inputs): Inputs {
    const calculatedFormInputs = {...formInputs};
    const vatFactor = calculatedFormInputs.vatRate / 100;

    switch(isChange) {
      case 'vatRate': {
        calculatedFormInputs.vat = calculatedFormInputs.priceWithoutVat * vatFactor;
        calculatedFormInputs.priceWithVat = calculatedFormInputs.priceWithoutVat + calculatedFormInputs.vat;
        break; 
      }
      case 'priceWithoutVat': {
        calculatedFormInputs.vat = calculatedFormInputs.priceWithoutVat * vatFactor;
        calculatedFormInputs.priceWithVat = calculatedFormInputs.priceWithoutVat + calculatedFormInputs.vat;
        break; 
      }
      case 'vat': {
        calculatedFormInputs.priceWithoutVat = Number((calculatedFormInputs.vat / vatFactor).toFixed(2));
        calculatedFormInputs.priceWithVat = calculatedFormInputs.priceWithoutVat + calculatedFormInputs.vat;
        break; 
      }
      case 'priceWithVat': {
        calculatedFormInputs.priceWithoutVat = calculatedFormInputs.priceWithVat / (1 + vatFactor);
        calculatedFormInputs.vat = calculatedFormInputs.priceWithoutVat * vatFactor;
        break; 
      }
      default: {
        break; 
      }
    }
    calculatedFormInputs.priceWithoutVat = Number(calculatedFormInputs.priceWithoutVat.toFixed(2));
    calculatedFormInputs.vat = Number(calculatedFormInputs.vat.toFixed(2));
    calculatedFormInputs.priceWithVat = Number(calculatedFormInputs.priceWithVat.toFixed(2));

    return calculatedFormInputs;
  }
}