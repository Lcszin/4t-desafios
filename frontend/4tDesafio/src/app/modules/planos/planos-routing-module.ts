import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanoListComponent } from '../../pages/planos/plano-list/plano-list.component';
import { PlanoFormComponent } from '../../pages/planos/plano-form/plano-form.component';

const routes: Routes = [
  { path: '', component: PlanoListComponent },
  { path: 'novo', component: PlanoFormComponent },
  { path: 'editar/:id', component: PlanoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanosRoutingModule { }