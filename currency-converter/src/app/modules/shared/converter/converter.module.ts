import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterButtonsComponent } from './components/converter-buttons/converter-buttons.component';
import { ConverterCashInputComponent } from './components/converter-cash-input/converter-cash-input.component';
import { ConverterComponent } from './converter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumericSeparatorPipe } from './pipes/numeric-separator.pipe';
import { RouterModule } from '@angular/router';
import { CurrencyExchangeService } from './services/currency-exchange.service';
import { TooltipDirective } from "../shared/tooltip/tooltip.directive";


@NgModule({
  declarations: [
    ConverterComponent,
    ConverterButtonsComponent,
    ConverterCashInputComponent,
    NumericSeparatorPipe,
    TooltipDirective,
  ],
  providers: [
    CurrencyExchangeService,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: ConverterComponent}]),
  ],
  exports: []
})
export class ConverterModule {
}
