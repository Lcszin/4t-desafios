import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PlanosRoutingModule } from './planos-routing-module';
import { PlanosComponent } from './planos.component';
import { PlanoListComponent } from '../../pages/planos/plano-list/plano-list.component';
import { PlanoFormComponent } from '../../pages/planos/plano-form/plano-form.component';


@NgModule({
  declarations: [
    PlanosComponent,
    PlanoListComponent,
    PlanoFormComponent
  ],
  imports: [
    CommonModule,
    PlanosRoutingModule,
    ReactiveFormsModule
  ]
})
export class PlanosModule { }
