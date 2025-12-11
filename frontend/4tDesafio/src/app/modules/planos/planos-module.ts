import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanosRoutingModule } from './planos-routing-module';
import { PlanosComponent } from './planos.component';
import { PlanoListComponent } from '../../planos/plano-list/plano-list.component';
import { PlanoFormComponent } from '../../planos/plano-form/plano-form.component';


@NgModule({
  declarations: [
    PlanosComponent,
    PlanoListComponent,
    PlanoFormComponent
  ],
  imports: [
    CommonModule,
    PlanosRoutingModule
  ]
})
export class PlanosModule { }
