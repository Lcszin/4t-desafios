import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiariosRoutingModule } from './beneficiarios-routing-module';
import { BeneficiariosComponent } from './beneficiarios.component';
import { BeneficiarioListComponent } from '../../beneficiarios/beneficiario-list/beneficiario-list.component';
import { BeneficiarioFormComponent } from '../../beneficiarios/beneficiario-form/beneficiario-form.component';


@NgModule({
  declarations: [
    BeneficiariosComponent,
    BeneficiarioListComponent,
    BeneficiarioFormComponent
  ],
  imports: [
    CommonModule,
    BeneficiariosRoutingModule
  ]
})
export class BeneficiariosModule { }
