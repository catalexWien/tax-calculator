import { Component } from '@angular/core';

import { AppFeaturesSharedCalculatorService } from '@features/shared/services/calculator.service';
import { Inputs } from '@features/shared/models/calculator.model';

const INIT_FORM_VARS = {
  vatRate: 0,
  priceWithoutVat: 0,
  vat: 0,
  priceWithVat: 0
}

@Component({
  selector: 'app-features-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  providers: [ AppFeaturesSharedCalculatorService ]
})
export class AppFeaturesCalculatorComponent {
  formInputs: Inputs = INIT_FORM_VARS;
  valuesOfRates = [ 10,  13,  20 ];
  noVatRateError = true;
  noNumberError = false;
  zeroNumberError = true;

  constructor(
    private calculatorService: AppFeaturesSharedCalculatorService
  ) {}

  onResetForm(): void {
    this.noVatRateError = true;
    this.noNumberError = false;
    this.zeroNumberError = true;
    this.formInputs = INIT_FORM_VARS;
  }

  onInputChange(isChange: string): void {
    this.noVatRateError = (this.formInputs.vatRate === 0) ? true : false;
    this.noNumberError = (
      isNaN(this.formInputs.priceWithoutVat) || 
      isNaN(this.formInputs.vat) || 
      isNaN(this.formInputs.priceWithVat)
    ) ? true : false;
    this.zeroNumberError = (
      (this.formInputs.priceWithoutVat !== 0) || 
      (this.formInputs.vat !== 0) || 
      (this.formInputs.priceWithVat !== 0)
    ) ? false : true;

    if (!this.noNumberError) {
      this.formInputs.vatRate = Number(this.formInputs.vatRate);
      this.formInputs.priceWithoutVat = Number(this.formInputs.priceWithoutVat);
      this.formInputs.vat = Number(this.formInputs.vat);
      this.formInputs.priceWithVat = Number(this.formInputs.priceWithVat);

      this.formInputs = this.calculatorService.calculateValues(isChange, this.formInputs);
    }
  }
}
