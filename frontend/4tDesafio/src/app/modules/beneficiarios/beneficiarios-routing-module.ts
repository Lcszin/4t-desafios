import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficiarioListComponent } from '../../pages/beneficiarios/beneficiario-list/beneficiario-list.component';
import { BeneficiarioFormComponent } from '../../pages/beneficiarios/beneficiario-form/beneficiario-form.component';

const routes: Routes = [
  { path: '', component: BeneficiarioListComponent },
  { path: 'novo', component: BeneficiarioFormComponent },
  { path: 'editar/:id', component: BeneficiarioFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiariosRoutingModule { }