import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BeneficiariosRoutingModule } from './beneficiarios-routing-module';
import { BeneficiariosComponent } from './beneficiarios.component';
import { BeneficiarioListComponent } from '../../pages/beneficiarios/beneficiario-list/beneficiario-list.component';
import { BeneficiarioFormComponent } from '../../pages/beneficiarios/beneficiario-form/beneficiario-form.component';


@NgModule({
  declarations: [
    BeneficiariosComponent,
    BeneficiarioListComponent,
    BeneficiarioFormComponent
  ],
  imports: [
    CommonModule,
    BeneficiariosRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BeneficiariosModule { }
